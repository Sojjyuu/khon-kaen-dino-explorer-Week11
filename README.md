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
