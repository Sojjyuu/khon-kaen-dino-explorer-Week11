import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../src/theme/colors';

export default function CameraScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [message, setMessage] = useState('ถ่ายรูปสถานที่ หรือเลือกรูปจากคลังภาพ');

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setMessage('ไม่ได้รับสิทธิ์ใช้กล้อง กรุณาอนุญาต Camera permission แล้วลองอีกครั้ง');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setMessage('บันทึกรูปตัวอย่างเรียบร้อย');
    }
  };

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage('ไม่ได้รับสิทธิ์เข้าถึงรูปภาพ กรุณาอนุญาต Photo Library permission');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setMessage('เลือกรูปเรียบร้อย');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CAMERA ASSIGNMENT</Text>
          <Text style={styles.title}>ภาพบันทึกการเดินทาง</Text>
          <Text style={styles.subtitle}>ประยุกต์ Camera / Image Picker เป็นฟีเจอร์บันทึกภาพระหว่างสำรวจขอนแก่น</Text>
        </View>

        <View style={styles.preview}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>◎</Text>
              <Text style={styles.placeholderText}>ยังไม่มีรูป</Text>
            </View>
          )}
        </View>

        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={takePhoto} style={styles.primaryButton}>
            <Text style={styles.primaryText}>เปิดกล้อง</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={pickPhoto} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>เลือกรูปจากเครื่อง</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18 },
  header: { borderRadius: 28, backgroundColor: colors.navy, padding: 22 },
  eyebrow: { color: colors.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginTop: 5 },
  subtitle: { color: '#C8D3E4', fontSize: 12, lineHeight: 18, marginTop: 7 },
  preview: { height: 330, overflow: 'hidden', borderRadius: 28, backgroundColor: '#E8EDF3', marginTop: 16 },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderIcon: { color: colors.goldDark, fontSize: 54, fontWeight: '300' },
  placeholderText: { color: colors.textMuted, fontSize: 13, fontWeight: '800', marginTop: 8 },
  message: { color: colors.textMuted, fontSize: 11, lineHeight: 17, marginTop: 12, textAlign: 'center' },
  actions: { marginTop: 14 },
  primaryButton: { alignItems: 'center', borderRadius: 17, backgroundColor: colors.gold, paddingVertical: 14 },
  primaryText: { color: colors.navy, fontSize: 14, fontWeight: '900' },
  secondaryButton: { alignItems: 'center', borderRadius: 17, backgroundColor: colors.navy, paddingVertical: 14, marginTop: 10 },
  secondaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});
