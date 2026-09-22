# Khon Kaen Dino Explorer

## Lab 11: กิจกรรมและการแจ้งเตือน

หน้าแรกมีปุ่ม **กิจกรรมและการแจ้งเตือน** สำหรับดู/สร้างกิจกรรม ตั้งเตือนก่อนเริ่ม 30 นาที ยกเลิกเตือน และทดสอบ notification ใน 15 วินาที แตะ notification เพื่อเปิด `/events/[id]` ผ่าน Expo Router

หลังอัปเดตแพ็กเกจ ให้หยุด Metro เดิมแล้วรัน `npx expo start --clear` อีกครั้ง

ดู [คู่มือ Lab 11, lifecycle diagram, ตารางทดสอบ และขั้นตอนถ่ายวิดีโอ](docs/lab-11-notifications.md) การทดสอบอัตโนมัติรันด้วย `npm test` และ `npm run check`; การส่ง notification และ cold start ยังต้องยืนยันบนอุปกรณ์จริง

แอป Expo + React Native + TypeScript ธีมเมืองไดโนเสาร์ สำหรับแสดง Point of Interest จำนวน 10 แห่งในจังหวัดขอนแก่น เมื่อกดเลือกสถานที่จากรายการ แผนที่จะเลื่อนไปยังพิกัดของสถานที่นั้นและแสดงชื่อกำกับบนแผนที่

## ฟีเจอร์ตามโจทย์

- รายชื่อสถานที่สำคัญในขอนแก่นครบ 10 แห่ง
- กดเลือกสถานที่จากรายการได้
- แผนที่เลื่อนไปยังตำแหน่งของสถานที่ที่เลือก
- แสดง Marker สีแดงบนตำแหน่งที่เลือก
- แสดงชื่อสถานที่ทั้งในป้ายบนแผนที่และ Marker callout
- กด “ขยายแผนที่” เพื่อดู เลื่อน และซูมแผนที่แบบเต็มหน้าจอ
- กดปุ่ม `◎` ในแผนที่เต็มจอเพื่อเลื่อนกลับมายังหมุดที่เลือก
- รายการที่เลือกมีสีและเครื่องหมายกำกับอย่างชัดเจน
- แสดงประเภท ที่อยู่ คำอธิบาย และพิกัดของสถานที่
- รองรับ Android ด้วย Google Maps และ iOS ด้วย Apple Maps
- แอปไม่ขอ Location permission เพราะโจทย์นี้ใช้พิกัดสถานที่ที่กำหนดไว้ล่วงหน้า
- UI โทนน้ำเงิน–ทอง พร้อมไอคอนไดโนเสาร์สีเหลือง

## สถานที่ทั้ง 10 แห่ง

1. มหาวิทยาลัยขอนแก่น
2. บึงแก่นนคร
3. พระมหาธาตุแก่นนคร
4. ศาลหลักเมืองขอนแก่น
5. เซ็นทรัล ขอนแก่น
6. สถานีรถไฟขอนแก่น
7. ตลาดต้นตาล
8. พิพิธภัณฑสถานแห่งชาติ ขอนแก่น
9. ศูนย์ประชุมและแสดงสินค้านานาชาติขอนแก่น (KICE)
10. ท่าอากาศยานขอนแก่น

## Android / Expo Go (SDK 57)

ใช้ Expo Go ที่รองรับ SDK 57 แล้วติดตั้งตาม lockfile:

```bash
npm ci
npx expo start --go --clear
```

หากมีโค้ดเดิมอยู่แล้ว ให้หยุด Metro และรัน `git pull --ff-only` ก่อนคำสั่งด้านบน
หาก Git แจ้งว่ามีไฟล์ที่แก้ค้าง ให้บันทึกงานนั้นก่อน ไม่ต้องลบทิ้ง

ระบบเตือนกิจกรรมใช้ **Local notifications**: ตั้ง/ยกเลิกเตือน ทดสอบใน 15 วินาที
และแตะเพื่อเปิดรายละเอียดกิจกรรม โดยไม่ขอ Push token
Android Expo Go ไม่รองรับ Remote push notifications ตั้งแต่ SDK 53
ถ้าจะเพิ่ม Push จากเซิร์ฟเวอร์ในอนาคต ต้องใช้ Development build

เมื่อทดสอบบน Android ให้กดอนุญาตแจ้งเตือน แล้วลองทดสอบ 15 วินาทีทั้งขณะเปิดแอป
และขณะกลับหน้าจอหลัก แตะแจ้งเตือนเพื่อตรวจว่ากลับเข้ากิจกรรมถูกต้อง
ทดสอบการยกเลิกและการเปิดแอปจากแจ้งเตือนหลังปิดแอปด้วย
เครื่องที่เคยปฏิเสธสิทธิ์ให้เปิดการแจ้งเตือนของ Expo Go ใน Settings

สำหรับผู้พัฒนา: `src/services/localNotifications.ts` โหลดเฉพาะ API ของ Local notifications
เพื่อไม่ให้ package root เรียก `DevicePushTokenAutoRegistration.fx` ตอนเริ่มแอป
ไฟล์นี้อ้างอิง internal build paths ของ SDK 57 จึงต้องตรวจใหม่เมื่ออัปเกรดแพ็กเกจ
ห้ามเปลี่ยนกลับไป import runtime จาก `expo-notifications` โดยตรง
การทดสอบบนอุปกรณ์จริงยังจำเป็น โดยเฉพาะการส่งเตือนและ cold start

## วิธีติดตั้งและรัน

```bash
npm install
npm run typecheck
npx expo start
```

จากนั้นเปิด Expo Go และสแกน QR Code หรือกด `a` เพื่อเปิดใน Android Emulator

## โครงสร้างสำคัญ

```text
src/
  components/PoiMap.tsx         แผนที่ Marker และป้ายชื่อสถานที่
  data/pointsOfInterest.ts      ข้อมูลสถานที่สำคัญ 10 แห่ง
  screens/PoiExplorerScreen.tsx หน้ารายการและรายละเอียดสถานที่
  theme/colors.ts               ชุดสีของแอป
  types/poi.ts                  TypeScript type ของ POI
```

## Android Production Build

Expo Go ใช้ทดสอบงานพื้นฐานได้ หากสร้าง Android binary สำหรับเผยแพร่ ให้เปิด Maps SDK for Android และสร้าง Google Maps API key โดยจำกัด key ด้วย:

- Android package: `com.sojjyu.khonkaenpoi`
- SHA-1 ของ signing certificate ที่ใช้สร้างแอป

เก็บ key เป็น EAS Environment Variable ชื่อ `GOOGLE_MAPS_ANDROID_API_KEY` แล้วสร้าง binary ใหม่ เพราะ API key ถูกฝังใน native application

```bash
npx eas-cli env:create --name GOOGLE_MAPS_ANDROID_API_KEY --environment production --visibility secret
npx eas-cli build --profile production --platform android
```

## ก่อนส่ง GitHub

```bash
git init
git add .
git commit -m "Create Khon Kaen POI map app"
git branch -M main
git remote add origin URL_REPOSITORY_ของนักศึกษา
git push -u origin main
```

ไม่ควรอัปโหลด `node_modules`, `.expo`, `.env` หรือ API key จริงขึ้น GitHub

## Final Assignment Integration (Assignments ก่อน Week 11)
โปรเจกต์นี้รวม Assignment เดิมให้ทำงานต่อเนื่องในแอปเดียว ไม่ได้นำหลายโปรเจกต์มาวางรวมกันเฉย ๆ

- **Profile** → หน้า `/profile` สำหรับข้อมูลผู้พัฒนา
- **Pokemon Team Builder concept** → หน้า `/trip` ใช้แนวคิดเลือก/ลบรายการและจัดกลุ่มสถานที่เป็น **My Trip** พร้อมบันทึกด้วย AsyncStorage
- **Camera** → หน้า `/camera` ใช้ Camera / Image Picker เพื่อถ่ายหรือเลือกรูปการเดินทาง
- **Location and Map** → หน้าแรกใช้ POI + Map + Marker และแผนที่เต็มหน้าจอ
- **Week 11 Notifications** → `/events` สำหรับสร้างกิจกรรม ตั้ง/ยกเลิก reminder และเปิด Event detail จาก notification

### เพิ่ม dependency สำหรับ Camera
หลัง Clone ให้ติดตั้ง dependencies ตามปกติ:

```bash
npm install
npx expo install expo-image-picker
```

จากนั้นรัน:

```bash
npx expo start
```

> ก่อนส่งงาน ให้แก้ชื่อและรหัสนักศึกษาใน `app/profile.tsx` เป็นข้อมูลจริง และทดสอบ Camera บนอุปกรณ์จริง/Simulator ที่รองรับ permission
