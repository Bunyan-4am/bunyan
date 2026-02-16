# 🏗️ Bunyan - AI-Powered Construction Intelligence Platform

<div dir="rtl">

## نظرة عامة | Overview

**Bunyan** هو منصة ذكاء اصطناعي متكاملة لإدارة مشاريع البناء المستدامة في مصر. تساعد المنصة شركات المقاولات على تقليل النفايات، خفض التكاليف، وتحسين الأثر البيئي من خلال تحليلات AI متقدمة.

**Bunyan** is an AI-powered construction intelligence platform for sustainable project management in Egypt. The platform helps construction companies reduce waste, cut costs, and improve environmental impact through advanced AI analytics.

</div>

---

## 🚀 Quick Start | البدء السريع

### ⚡ AI Integration Ready!
All AI features are now **fully integrated** with Google Gemini (free tier):
- ✅ Intelligent Chatbot
- ✅ Bill Scanning (OCR with Vision AI)
- ✅ Cost Estimation
- ✅ Design Generation with Images

### Setup in 3 Steps:

1. **Get Free API Key** (2 minutes)
   ```bash
   # Visit: https://aistudio.google.com/app/apikey
   # Sign in → Create API Key → Copy it
   ```

2. **Configure Environment** (1 minute)
   ```bash
   # Edit .env.local file and add your key:
   GOOGLE_GEMINI_API_KEY=AIzaSy...your-actual-key
   ```

3. **Run the App** (1 minute)
   ```bash
   npm install
   npm run dev
   # Visit: http://localhost:3000
   ```

📖 **Full Setup Guide:** See [AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md)

**Note:** App works with mock data if no API key is configured (perfect for testing UI)!

---

## ✨ Core Features | المميزات الأساسية

### 🤖 AI Control Center | مركز التحكم بالذكاء الاصطناعي
- **Bill Scanning** | مسح الفواتير بتقنية OCR والذكاء الاصطناعي
- **Cost Estimation** | تقدير التكاليف تلقائياً
- **Design Generation** | توليد تصاميم مستدامة بالذكاء الاصطناعي
- **Material Comparison** | مقارنة المواد والموردين
- **Sustainability Recommendations** | توصيات بيئية ذكية

### 📊 Project Management | إدارة المشاريع
- **Multi-project Dashboard** | لوحة تحكم شاملة لجميع المشاريع
- **Real-time Analytics** | تحليلات فورية
- **Waste Tracking** | تتبع النفايات ونسب الهدر
- **Budget Monitoring** | مراقبة الميزانيات
- **Sustainability Scoring** | تقييم الاستدامة البيئية

### 🛒 Eco-Certified Marketplace | سوق المواد المعتمدة بيئياً
- **Verified Suppliers** | موردين معتمدين
- **Eco Score System** | نظام تقييم بيئي
- **Material Certifications** | شهادات المواد (EGBC Certified)
- **Carbon Footprint Tracking** | تتبع البصمة الكربونية
- **Shopping Cart & Checkout** | عربة تسوق ونظام دفع

### 📈 Advanced Analytics | التحليلات المتقدمة
- **Waste Trends** | اتجاهات النفايات
- **Cost Analysis** | تحليل التكاليف
- **Sustainability Metrics** | مقاييس الاستدامة
- **ROI Tracking** | متابعة العائد على الاستثمار
- **Interactive Charts** | رسوم بيانية تفاعلية (Recharts)

### 🎯 Premium Landing Page | صفحة هبوط احترافية
- **Animated Hero Section** | قسم البطل مع أنيميشن جذاب
- **Count-up Statistics** | إحصائيات متحركة
- **Testimonial Slider** | سلايدر آراء العملاء (Swiper)
- **Interactive Features Grid** | عرض المميزات التفاعلي
- **How it Works** | شرح آلية العمل بأنيميشن
- **Scroll Animations** | أنيميشن عند السكرول (AOS)

---

## 🛠️ Tech Stack | التقنيات المستخدمة

### Frontend
- **Next.js 16.1.6** (App Router) - إطار العمل الأساسي
- **React 19.2.3** - مكتبة واجهة المستخدم
- **Tailwind CSS v4** - تصميم responsive حديث
- **JavaScript** (ES6+) - لا TypeScript

### UI Libraries | مكتبات الواجهة
- **Framer Motion** - أنيميشن متقدم
- **AOS (Animate On Scroll)** - أنيميشن السكرول
- **Swiper** - سلايدر الشهادات
- **Lucide React** - أيقونات عصرية
- **Radix UI** - مكونات accessible

### State & Data | إدارة الحالة والبيانات
- **Zustand** - إدارة الحالة العامة (5 stores)
- **Supabase** - قاعدة بيانات وAuthentication
- **Recharts** - رسوم بيانية تفاعلية

### Additional Tools
- **PostCSS** - معالجة CSS
- **ESLint** - جودة الكود

---

## 📁 Project Structure | هيكل المشروع

```
bunyan-v2/
├── public/
│   └── Logo.png                    # شعار المشروع
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.js               # Layout رئيسي
│   │   ├── page.js                 # صفحة الهبوط (Landing)
│   │   ├── globals.css             # Styles عامة + Tailwind config
│   │   │
│   │   ├── auth/                   # صفحات المصادقة
│   │   │   ├── login/page.js
│   │   │   └── register/page.js
│   │   │
│   │   ├── app/                    # Dashboard Routes
│   │   │   ├── layout.js           # Layout الداخلي (Sidebar + Navbar)
│   │   │   ├── dashboard/page.js   # لوحة التحكم الرئيسية
│   │   │   ├── ai-center/page.js   # مركز الذكاء الاصطناعي
│   │   │   ├── projects/page.js    # إدارة المشاريع
│   │   │   ├── marketplace/page.js # السوق
│   │   │   ├── analytics/page.js   # التحليلات
│   │   │   └── settings/page.js    # الإعدادات
│   │   │
│   │   └── api/                    # API Routes
│   │       ├── chat/route.js
│   │       ├── scan-bill/route.js
│   │       ├── estimate-cost/route.js
│   │       └── generate-design/route.js
│   │
│   ├── components/
│   │   ├── landing/                # مكونات صفحة الهبوط
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── TrustedBy.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── ImpactStats.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── CallToAction.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CountUp.jsx
│   │   │   └── index.js
│   │   │
│   │   └── ui/                     # مكونات UI قابلة لإعادة الاستخدام
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── badge.jsx
│   │       ├── input.jsx
│   │       ├── modal.jsx
│   │       ├── loading.jsx
│   │       ├── empty-state.jsx
│   │       └── animations.jsx
│   │
│   ├── lib/
│   │   ├── utils.js                # دوال مساعدة
│   │   ├── supabase.js             # Supabase client
│   │   ├── supabase-schema.sql     # Database schema
│   │   └── mock-data.js            # بيانات تجريبية
│   │
│   └── store/
│       └── useStore.js             # Zustand stores (5 stores)
│
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## 🎨 Design System | نظام التصميم

### Color Palette | لوحة الألوان
```css
--color-primary: #102a4e      /* أزرق داكن - Primary brand */
--color-accent: #2e8c58       /* أخضر - Sustainability accent */
--color-accent-light: #3aa86a /* أخضر فاتح */
--color-background: #f5f7fa   /* رمادي فاتح */
--color-secondary: #475569    /* رمادي للنصوص */
--color-muted: #64748b        /* رمادي باهت */
```

### Custom Animations | أنيميشن مخصص
- `float` - حركة طفو للعناصر
- `shimmer` - تأثير لمعان
- `pulse-glow` - نبض متوهج
- `orbit` / `orbit-reverse` - دوران دائري
- `gradient-shift` - تحول لوني
- `fade-in-up` - ظهور من الأسفل
- `scale-in` - تكبير
- `line-draw` - رسم خط
- `badge-float` - طفو الشارات

---

## 🚀 Getting Started | البدء

### Prerequisites | المتطلبات
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation | التثبيت

```bash
# Clone المشروع
git clone <repository-url>
cd bunyan-v2

# تثبيت الحزم
npm install

# تشغيل السيرفر المحلي
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### Build for Production | بناء الإنتاج

```bash
# بناء المشروع
npm run build

# تشغيل نسخة الإنتاج
npm start
```

---

## 🗄️ Database Schema | قاعدة البيانات

The project uses **Supabase** with the following tables:

### Tables | الجداول
- `users` - معلومات المستخدمين
- `projects` - المشاريع
- `materials` - المواد البنائية
- `bills` - الفواتير المسحوبة
- `activity_logs` - سجل النشاطات
- `cart_items` - عربة التسوق

Schema موجود في: `src/lib/supabase-schema.sql`

---

## 🔐 Environment Variables | متغيرات البيئة

أنشئ ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📦 Key Dependencies | الحزم الرئيسية

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "tailwindcss": "4.0.0",
  "zustand": "^5.0.2",
  "@supabase/supabase-js": "^2.49.2",
  "framer-motion": "^11.15.0",
  "aos": "^3.0.0-beta.6",
  "swiper": "^11.1.15",
  "recharts": "^2.15.0",
  "lucide-react": "^0.468.0"
}
```

---

## 🌟 Features Breakdown | تفصيل المميزات

### 1. Landing Page Components

#### **Navbar** 
- Scroll-aware (شفاف → glass عند السكرول)
- Smooth transitions
- Mobile responsive

#### **Hero Section**
- FloatingParticles animation
- Orbiting dots
- Dashboard preview mockup
- Floating stat badges
- Count-up statistics

#### **Testimonials**
- Swiper slider
- 5 Egyptian client testimonials
- Auto-play with pause on hover
- Custom pagination bullets

#### **How It Works**
- 3-step process
- Animated connecting line
- Floating number badges
- Icon-based design

#### **Impact Stats**
- CountUp animation with IntersectionObserver
- Real environmental metrics
- 4 key statistics

### 2. Dashboard Features

#### **Main Dashboard**
- SustainabilityGauge component
- 4 key metrics cards
- Recent activity feed
- Quick actions

#### **AI Center**
- Interactive chat interface
- 6 response types:
  - Bill scanning results
  - Cost estimates
  - Material comparisons
  - Vendor suggestions
  - Sustainability scores
  - Design previews
- File upload support

#### **Projects**
- CRUD operations
- Project cards with stats
- Status filters
- Create/Edit modals

#### **Marketplace**
- Eco-certified materials
- Eco score badges
- Shopping cart
- Material details modals

#### **Analytics**
- Waste trends (Line chart)
- Sustainability distribution (Pie chart)
- Project comparison (Bar chart)
- Cost savings over time (Area chart)

#### **Settings**
- 4 tabs: Profile, Company, Notifications, Security
- Form validation
- Toast notifications

---

## 🎯 Egyptian Localization | التوطين المصري

### Currency | العملة
- **EGP** (Egyptian Pound) في كل المشروع

### Companies | الشركات
- New Administrative Capital
- Orascom Construction
- Palm Hills Developments
- Talaat Moustafa Group
- Arabia Holding

### Names | الأسماء
- Mohamed El-Sayed
- Nour El-Din
- Amr Hassan
- Layla Mahmoud
- Youssef Ibrahim

### Locations | المواقع
- Cairo, Egypt
- New Administrative Capital, Egypt
- Alexandria, Egypt
- Giza, Egypt
- Nasr City, Cairo

---

## 📱 Responsive Design | تصميم متجاوب

- **Mobile First** approach
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Tailwind CSS responsive utilities
- Optimized for all screen sizes

---

## 🧪 Development Notes | ملاحظات التطوير

### Mock Data
يستخدم المشروع بيانات تجريبية (`mock-data.js`) عند عدم توفر Supabase.

### API Routes
جميع API routes في `src/app/api/` تستخدم حالياً بيانات mock. يمكن استبدالها بخدمات حقيقية:
- OpenAI API للذكاء الاصطناعي
- OCR service لمسح الفواتير
- Image generation API للتصاميم

### State Management
5 Zustand stores:
- `useAuthStore` - المصادقة
- `useProjectStore` - المشاريع
- `useChatStore` - المحادثات AI
- `useCartStore` - عربة التسوق
- `useUIStore` - حالة الواجهة

---

## 🚧 Future Enhancements | تحسينات مستقبلية

- [ ] Integration with real AI APIs
- [ ] Real-time collaboration features
- [ ] Mobile app (React Native)
- [ ] Advanced reporting & exports
- [ ] Multi-language support (Arabic/English)
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Team management features

---

## 📄 License

This project is proprietary software developed for hackathon purposes.

---

## 👥 Support

For support or questions, contact the development team.

---

<div align="center">

**Built with ❤️ for sustainable construction in Egypt 🇪🇬**

🌍 Bunyan - Building a Greener Future

</div>
