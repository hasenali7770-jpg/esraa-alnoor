# Esraa Al-Noor — Website + Admin (V3.1 Bunny)

هذه النسخة تضيف:
- **لوحة تحكم Sanity Studio** لإضافة/تعديل الكورسات والنصوص والصور والفيديوهات (بدون برمجة)
- **نظام تفعيل بالكود** يفتح كورس واحد عبر كود من لوحة التحكم
- دعم عربي + إنكليزي + Dark Mode
- **بث الفيديوهات عبر Bunny Stream** (رفع مباشر بكل الصيغ)

---

## 1) تشغيل الموقع (Next.js)
```bash
npm install
npm run dev
```
ثم افتح: http://localhost:3000

---

## 2) إعداد Sanity Studio (لوحة التحكم)
### أ) إنشاء مشروع Sanity
1. افتح sanity.io وسجّل دخول
2. Create project
3. خذ: **Project ID** واسم **Dataset** (production)

### ب) تشغيل الاستوديو محلياً
```bash
cd studio
npm install
# انسخ studio/.env.example إلى studio/.env وضع القيم
npm run dev
```
سيفتح لك الاستوديو محلياً.

### ج) نشر الاستوديو (رابط نهائي)
```bash
npm run deploy
```
بعدها يصير عندك رابط مثل:
https://<your-studio-name>.sanity.studio

---

## 3) ربط الموقع مع Sanity
- انسخ `.env.example` إلى `.env.local` وضع:
  - NEXT_PUBLIC_SANITY_PROJECT_ID
  - NEXT_PUBLIC_SANITY_DATASET
  - SANITY_API_TOKEN (للتفعيل بالكود)

### إنشاء SANITY_API_TOKEN
من: sanity.io/manage → API → Tokens → Add token
الصلاحية: **Editor**

---

## 4) رفع الفيديوهات (رفع مباشر)
راجع: `docs/VIDEO_UPLOAD_GUIDE.md`
الطريقة المعتمدة: **Bunny Stream** → انسخ Playback URL → ضعها داخل Lesson.videoUrl

---

## 5) تشغيل التفعيل بالكود
- من Sanity Studio:
  - Activation codes → Create new
  - ضع code + اختر course + فعّل Active
- بالموقع: صفحة Activate → أدخل الكود → ينفتح الكورس على نفس الجهاز (LocalStorage)
