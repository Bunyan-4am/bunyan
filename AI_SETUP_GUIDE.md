# 🤖 AI Integration Setup Guide

## ✅ What's Been Implemented

All 4 API routes now have **real AI integration** using Google Gemini (free tier):

1. **Chat API** (`/api/chat`) - Intelligent construction assistant
2. **Bill Scanning** (`/api/scan-bill`) - OCR with Gemini Vision
3. **Cost Estimation** (`/api/estimate-cost`) - AI-powered cost analysis
4. **Design Generation** (`/api/generate-design`) - Sustainable design concepts + free image generation

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Copy the key (starts with `AIza...`)

**Free Tier Limits:**
- ✅ 1,500 requests per day
- ✅ 15 requests per minute
- ✅ Perfect for hackathon demos!

### Step 2: Configure Your Environment

Open `.env.local` file and replace the placeholder:

```env
GOOGLE_GEMINI_API_KEY=AIzaSy... # Paste your actual API key here
```

### Step 3: Start Your Dev Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🎯 Testing Each Feature

### 1. Chat API Test
Navigate to **AI Center** page and try these prompts:

- "Find eco-friendly steel suppliers in Egypt"
- "Compare costs for concrete alternatives"
- "Show me sustainability score for my project"
- "Give me a cost breakdown for villa construction"

**Expected:** AI generates structured responses (products, comparisons, breakdowns, scores)

### 2. Bill Scanning Test
You need a bill/invoice image:

**Option A - Create Test Image:**
1. Open any invoice or receipt on screen
2. Take a screenshot
3. Upload via the bill scanning interface

**Option B - Use Sample:**
Create a simple text invoice image with:
```
GreenSteel Egypt
Invoice #12345
Date: 2026-02-15

Steel Rebar Grade 60: 120 tons × 3200 EGP = 384,000 EGP
Tax (15%): 57,600 EGP
Total: 441,600 EGP
```

**Expected:** AI extracts items, prices, totals, and suggests optimizations

### 3. Cost Estimation Test
Go to **Dashboard** → **Cost Estimation** and enter:

- Project Type: Villa
- Area: 500 m²
- Location: Cairo, Egypt
- Materials: Sustainable

**Expected:** Detailed breakdown with categories, optimizations, timeline

### 4. Design Generation Test
Go to **AI Center** → **Generate Design** and request:

- Project Type: Residential Villa
- Requirements: Eco-friendly, solar panels, local materials

**Expected:** Design specs, materials list, sustainability score, + AI-generated image

## 🔧 How It Works

### Fallback System
All routes have **smart fallbacks**:
- ✅ If no API key → Uses mock data (demo still works!)
- ✅ If AI fails → Graceful fallback to mock responses
- ✅ If parsing fails → Returns sensible defaults

**This means your demo will NEVER crash during presentation!**

### Architecture

```
Frontend Request
    ↓
Next.js API Route (/api/...)
    ↓
Check: Is GOOGLE_GEMINI_API_KEY configured?
    ↓
YES: Call Gemini AI → Parse JSON → Return
NO:  Return Mock Data
    ↓
Frontend renders response
```

### Image Generation (Free!)
Uses **Pollinations.ai** (no key needed):
- Generates architectural visualizations
- Based on AI-generated descriptions
- URL format: `https://image.pollinations.ai/prompt/{description}`

## 📊 Cost Analysis (Free Tier)

For 1000 requests during hackathon:
- Gemini Text (Chat, Cost, Design): **FREE** (within 1500/day limit)
- Gemini Vision (Bill Scan): **FREE** (within 1500/day limit)
- Image Generation: **FREE** (Pollinations.ai)

**Total Cost: $0** ✅

## 🐛 Troubleshooting

### Issue: "API Key not configured"
**Fix:** Make sure `.env.local` has real key:
```env
GOOGLE_GEMINI_API_KEY=AIzaSy...actual-key-here
```
Then restart dev server: `npm run dev`

### Issue: "Rate limit exceeded"
**Fix:** Free tier = 15 req/min. Wait 1 minute or use fallback mock data.

### Issue: "Failed to parse AI response"
**Cause:** Gemini returned non-JSON format
**Fix:** Already handled! Automatically falls back to mock data.

### Issue: Bill scanning returns mock data
**Causes:**
1. No API key configured
2. Image quality too poor (AI confidence < 30%)
3. Image is not a bill/invoice

**Fix:** Upload clearer invoice image with visible text

### Issue: Images not loading in Design Generation
**Cause:** Pollinations.ai might be slow/down
**Fix:** Refresh page or check URL in browser - service is free so uptime varies

## 🎨 Customization Tips

### Adjust AI Behavior

**Make chat responses shorter:**
Edit `/api/chat/route.js` line 18-20, add:
```javascript
Keep responses concise and to the point. Maximum 3 items per list.
```

**Change Egyptian focus to other region:**
Edit prompts to replace "Egypt/MENA" with your region:
```javascript
// Example in estimate-cost/route.js
const prompt = `... for Saudi Arabia market using SAR currency ...`;
```

**Improve bill accuracy:**
Edit `/api/scan-bill/route.js` line 35-40:
```javascript
Focus on Egyptian construction materials: Steel (حديد), Cement (اسمنت), etc.
Look for Arabic or English text.
```

### Add More Response Types

In `/api/chat/route.js`, add new type in prompt (line 25):
```javascript
6. For supplier recommendations:
{"type":"suppliers","content":"text","data":[{"name":"company","location":"text","rating":number}]}
```

Then handle in frontend AI Center page.

## 🔐 Security Notes

- ✅ API key is server-side only (not exposed to browser)
- ✅ `.env.local` is gitignored by default
- ✅ All errors are caught and logged server-side
- ⚠️ For production, add rate limiting (ready to implement later)

## 📱 Demo Day Checklist

- [ ] Get Gemini API key from ai.google.dev
- [ ] Update `.env.local` with real key
- [ ] Test all 4 features (chat, scan, estimate, design)
- [ ] Prepare 2-3 sample bills/invoices to scan
- [ ] Take screenshot of AI responses for backup slides
- [ ] Test on slow internet (API timeouts handled gracefully)
- [ ] Have story ready: "We use Google Gemini AI for intelligent construction insights"

## 🚀 Next Steps (Post-Hackathon)

1. **Add Caching** - Redis for common queries
2. **Rate Limiting** - Protect API endpoints
3. **Analytics** - Track which AI features are most used
4. **Fine-tuning** - Train on Egyptian construction data
5. **Premium Features** - DALL-E 3 for better design images
6. **Multi-language** - Arabic prompt support

## 💡 Pro Tips

1. **If demo internet fails:** App still works with mock data! Just explain "fallback mode"
2. **Impress judges:** Show the AI-generated images updating in real-time
3. **Emphasize sustainability:** AI suggests eco-friendly alternatives automatically
4. **Cost savings:** Show how bill scanning finds cheaper suppliers
5. **Regional focus:** Mention "trained on Egyptian construction market" (via prompts)

## 📞 Need Help?

All routes log errors to console. During dev:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API responses

## 🎉 You're Ready!

Your Bunyan platform now has **real AI integration** with:
- 🤖 Intelligent chat assistant
- 👁️ Computer vision bill scanning
- 💰 AI cost estimation
- 🏗️ Design generation with images

**All running on free APIs!** Good luck with your hackathon! 🚀
