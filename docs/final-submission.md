# Final Submission — Week 11

Repository: https://github.com/Sojjyuu/khon-kaen-dino-explorer-Week11

## Scope ที่รวมไว้ในโปรเจกต์เดียว

- Profile
- POI ขอนแก่น 10 แห่ง + Map / Marker
- Search และ Category Filter
- My Trip + AsyncStorage
- Camera / Image Picker
- Post-capture filters
- บันทึกภาพที่แต่งแล้วลง Photos บน iOS/Android
- Event / Reminder
- Local notifications
- Notification → Event detail
- สร้างและลบกิจกรรมส่วนตัว

## Fresh-clone check

ใช้ขั้นตอนนี้ก่อนส่งงาน:

```bash
git clone https://github.com/Sojjyuu/khon-kaen-dino-explorer-Week11.git
cd khon-kaen-dino-explorer-Week11
npm install
npm test
npm run typecheck
npx expo start -c
```

## Smoke-test checklist

- [x] Home / POI list
- [x] Search / Filter
- [x] Map / selected POI
- [x] My Trip
- [x] Camera / Image Picker / Filter
- [x] Save Photos บนอุปกรณ์ที่รองรับ
- [x] Profile
- [x] Event / Reminder
- [x] สร้างกิจกรรมส่วนตัว
- [x] ลบกิจกรรมส่วนตัว
- [x] Notification flow

## ก่อนส่ง

- ใช้ลิงก์ repo ด้านบน
- ส่ง branch `main`
- ไม่ต้องส่ง `node_modules`, `.expo`, `.env` หรือ secret/API key
- ตรวจข้อมูลผู้พัฒนาใน `app/profile.tsx` ให้ตรงกับผู้ส่งงาน
- GitHub Actions ชื่อ **Week 11 Final Quality Check** ใช้ตรวจ test + TypeScript ทุกครั้งที่ push
