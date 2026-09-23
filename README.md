# Khon Kaen Dino Explorer — Week 11

## Android ผ่าน Expo Go (ชุดทดลอง)

ชุดนี้เพิ่มสคริปต์หลังติดตั้งแพ็กเกจแบบเดียวกับโปรเจกต์ตัวอย่าง เพื่อให้โมดูล push notification ที่ไม่มีใน Expo Go บน Android ไม่ทำให้แอปหยุดตั้งแต่เปิดหน้าแรก **ยังต้องทดสอบการตั้งและรับ local notification บนอุปกรณ์จริง** แผนที่บน Android ใช้ Leaflet/OpenStreetMap ใน WebView ตามแนวทางของโปรเจกต์ตัวอย่าง ส่วน iOS คงแผนที่เดิมไว้ แผนที่เว็บต้องเชื่อมต่ออินเทอร์เน็ตเพื่อโหลด Leaflet และแผ่นภาพแผนที่

```bash
npm ci
npx expo start --clear
```

เปิด Expo Go บน Android ที่รองรับ SDK 57 แล้วสแกน QR จาก Terminal โทรศัพท์กับคอมพิวเตอร์ต้องเข้าถึงกันผ่านเครือข่ายเดียวกัน ถ้าสแกนแล้วขึ้น SDK mismatch ให้ตรวจรุ่น Expo Go ที่ติดตั้ง ส่วน `npm run android` ใช้สร้างแอปผ่านสาย USB หรือ Emulator จึงไม่ใช่คำสั่งทดสอบ Expo Go

สคริปต์ `scripts/patch-notifications.js` แก้ไฟล์ภายใน `node_modules` หลัง `npm ci` เท่านั้น ไม่มีผลกับ Expo Go ในโทรศัพท์และไม่เพิ่ม native module ที่ไม่มีอยู่จริง หากอัปเดต `expo-notifications` ต้องตรวจความเข้ากันได้ของสคริปต์อีกครั้ง

ข้อความเตือน `expo-notifications functionality is not fully supported in Expo Go` เป็นข้อจำกัดของ Expo Go ที่ยังแสดงได้ แม้แผนที่จะทำงานแล้ว ข้อความเตือนนี้ไม่ได้บอกว่าแผนที่เสีย

ใน Android Expo Go โค้ดจะซ่อนเฉพาะ warning ที่ทราบแล้วของ MediaLibrary และ remote push จากหน้าจอ LogBox ข้อความ error อื่นยังแสดงตามปกติ การซ่อน warning ไม่เปลี่ยนความสามารถของ Expo Go และข้อความอาจยังอยู่ใน terminal

### กล้องและการแจ้งเตือนในชุดนี้

- ถ่ายหรือเลือกรูป เลือกโทนธรรมชาติ/อบอุ่น/เย็น/วินเทจ แล้วกด **บันทึกภาพลงเครื่อง** ภาพที่บันทึกเป็นภาพตามกรอบพรีวิวพร้อมโทนสีที่เลือก ฟิลเตอร์ใช้หลังถ่าย ไม่ใช่ฟิลเตอร์สดบนหน้ากล้อง
- Android Expo Go ไม่เรียกสร้าง notification channel ซึ่งทำให้เครื่องทดสอบบางรุ่นเกิด native error แอปจะลองกำหนดเวลาการเตือนโดยใช้ช่องทางปริยายแทน ถ้าตัวจัดการ notification ใน Expo Go ของเครื่องนั้นยังไม่มี native module ที่จำเป็น แอปจะแสดงข้อความอธิบายแทน raw crash และต้องทดสอบผ่าน development build เพื่อให้การแจ้งเตือนของระบบทำงานครบ
- การบันทึกรูปใช้ MediaLibrary API ที่ Expo Go เครื่องทดสอบรองรับ Expo Go อาจเตือนเรื่องสิทธิ์คลังภาพที่มีข้อจำกัด แต่หน้า Camera ยังโหลดได้ และทดสอบการบันทึกภาพได้

## Week 11: กิจกรรมและการแจ้งเตือน

หน้าแรกมีปุ่ม **กิจกรรมและการแจ้งเตือน** สำหรับดูหรือสร้างกิจกรรม ตั้งเตือนก่อนเริ่ม 30 นาที ยกเลิก และทดสอบการแจ้งเตือนใน 15 วินาที ดู [คู่มือ Lab 11](docs/lab-11-notifications.md) สำหรับขั้นตอนการทดสอบบนอุปกรณ์จริง

```bash
npm run check
npm test
```

แอปมีสถานที่ 10 แห่ง แผนที่ Android ใช้ Leaflet/OpenStreetMap ใน WebView จึงต้องเชื่อมต่ออินเทอร์เน็ต; iPhone ใช้แผนที่ native กล้องถ่ายหรือเลือกรูป เลือกโทนสีหลังถ่าย และกดบันทึกภาพลงเครื่อง

Expo Go บน Android มีข้อจำกัดด้านคลังภาพและ remote push notifications; local notifications บางเครื่องอาจต้องใช้ development build หาก native module ไม่ครบ สคริปต์ `scripts/patch-notifications.js` ทำงานหลัง `npm ci` เพื่อเลี่ยงการเรียก push module ที่ไม่มีใน Expo Go การซ่อน warning ที่รู้จักใน LogBox ไม่เปลี่ยนข้อจำกัดของ Expo Go
