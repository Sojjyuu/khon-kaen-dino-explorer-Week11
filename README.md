# Khon Kaen Dino Explorer — Week 11

Final Assignment integration บน Expo + React Native + TypeScript โดยรวมงานเดิมให้อยู่ในแอปเดียวและเชื่อม flow เข้าหากัน

## ฟีเจอร์หลัก

- POI ขอนแก่น 10 แห่ง
- Map / Marker / selected POI
- Search และ Category Filter
- My Trip พร้อม AsyncStorage
- Profile
- Camera / Image Picker
- Post-capture filters
- บันทึกภาพที่แต่งแล้วลง Photos บน iOS/Android
- Event / Reminder
- Local notifications
- Notification → Event detail
- สร้างและลบกิจกรรมส่วนตัว

## Assignment integration

- **Profile assignment** → `/profile`
- **Search / filter concept** → หน้า Home
- **Team-builder / favorite concept** → `/trip`
- **Camera assignment** → `/camera`
- **Location / Map** → POI map บนหน้า Home
- **Week 11 Notifications** → `/events` และ `/events/[id]`

## ติดตั้งและรัน

```bash
npm install
npm test
npm run typecheck
npx expo start -c
```

เปิดด้วย Expo Go หรือ emulator/simulator ที่รองรับฟีเจอร์ native ที่ต้องการทดสอบ

## หมายเหตุเรื่อง Expo Notifications บน Android

ข้อจำกัดที่พบในการทดสอบบน Android มาจาก **Expo Go** ไม่ใช่จาก Android โดยตรง

ตั้งแต่ **Expo SDK 53 เป็นต้นไป** Expo Go บน Android ไม่รองรับ **Push Notification / Remote Notification** ที่ส่งมาจากเซิร์ฟเวอร์แล้ว เพราะการทำ push notification ต้องผูกกับ native credentials ของแอปเอง เช่น Firebase Cloud Messaging (FCM) และ configuration ที่ถูกฝังไว้ตั้งแต่ตอน build แอป ดังนั้นการทดสอบ push notification บน Android ต้องใช้ **Development Build / EAS Build** แทน Expo Go

อย่างไรก็ตาม **Local Notification / Scheduled Notification** ที่สร้างจากภายในแอปด้วย `expo-notifications` ยังรองรับใน Expo Go อยู่

สำหรับโปรเจกต์นี้ Reminder ใช้แนวคิด **Local / Scheduled Notification** เป็นหลัก ส่วนถ้าต้องการทดสอบ Push Notification บน Android แบบครบจริง ควรสร้าง Development Build เช่น:

```bash
npx eas-cli@latest build --platform android --profile development
```

หรือใช้ Preview Build ตามขั้นตอนของสัปดาห์ถัดไป

อ้างอิง: Expo Notifications documentation — https://docs.expo.dev/versions/latest/sdk/notifications/

## ตรวจงานอัตโนมัติ

GitHub Actions workflow: **Week 11 Final Quality Check**

ตรวจ:

- `npm test`
- `npm run typecheck`

## เอกสาร

- [Lab 11 Notifications](docs/lab-11-notifications.md)
- [Final Submission Checklist](docs/final-submission.md)

## หมายเหตุแพลตฟอร์ม

- Map native ใช้ `react-native-maps`
- Local notifications ต้องทดสอบบนอุปกรณ์ที่รองรับ
- Save Photos ใช้ `expo-media-library` บน iOS/Android
- ข้อมูลผู้พัฒนาและช่องทางติดต่ออยู่ใน `app/profile.tsx`

## Repository สำหรับส่ง

https://github.com/Sojjyuu/khon-kaen-dino-explorer-Week11

ใช้ branch `main` และไม่อัปโหลด `node_modules`, `.expo`, `.env` หรือ secret/API key
