const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function runtimeImports(file) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return [...output.matchAll(/require\(["']([^"']+)["']\)/g)].map(match => match[1]);
}

test('local notification Android dependency graph never loads remote push registration', () => {
  const packageRoot = path.dirname(require.resolve('expo-notifications/package.json'));
  const visited = new Set();
  function resolveAndroid(base) {
    const stem = base.replace(/\.js$/, '');
    const file = [stem + '.android.js', stem + '.native.js', stem + '.js', path.join(stem, 'index.js')]
      .find(candidate => fs.existsSync(candidate));
    assert.ok(file, 'Missing notification module: ' + base);
    return file;
  }
  function visit(file) {
    if (visited.has(file)) return;
    visited.add(file);
    assert.doesNotMatch(path.basename(file), /^(index|TokenEmitter|DevicePushTokenAutoRegistration\.fx|getDevicePushTokenAsync|getExpoPushTokenAsync)\.js$/);
    for (const name of runtimeImports(file)) {
      assert.notEqual(name, 'expo-notifications', 'Package root loads push registration');
      if (name.startsWith('.')) visit(resolveAndroid(path.resolve(path.dirname(file), name)));
      else if (name.startsWith('expo-notifications/')) {
        visit(resolveAndroid(path.join(packageRoot, name.slice('expo-notifications/'.length))));
      }
    }
  }
  for (const name of runtimeImports('src/services/localNotifications.ts')) {
    assert.ok(name.startsWith('expo-notifications/build/'));
    visit(resolveAndroid(path.join(packageRoot, name.slice('expo-notifications/'.length))));
  }
  assert.ok(visited.size > 0);
});

test('app runtime imports never bypass the local notification adapter', () => {
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (/\.tsx?$/.test(file)) {
        assert.ok(!runtimeImports(file).includes('expo-notifications'), file + ' imports the push-enabled package root');
      }
    }
  }
  visit('app');
  visit('src');
  assert.ok(!runtimeImports('index.ts').includes('expo-notifications'));
});
