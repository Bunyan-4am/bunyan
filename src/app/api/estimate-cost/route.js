import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(request) {
  try {
    const { projectType, area, location, materials, sustainability } = await request.json();

    // Check if API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY === "your_gemini_api_key_here") {
      return getMockEstimate();
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a construction cost estimation expert for Egypt and MENA region.

Project Details:
- Type: ${projectType || "Building"}
- Area: ${area || "500"} m²
- Location: ${location || "Egypt"}
- Materials: ${materials || "Standard"}
- Sustainability Level: ${sustainability || "Medium"}

Provide a detailed cost estimate in Egyptian Pounds (EGP) in this JSON format:
{
  "totalEstimate": number,
  "currency": "EGP",
  "breakdown": [
    {"category": "Structural Materials", "amount": number, "percentage": number},
    {"category": "MEP Systems", "amount": number, "percentage": number},
    {"category": "Finishing & Fitout", "amount": number, "percentage": number},
    {"category": "Labor", "amount": number, "percentage": number},
    {"category": "Equipment", "amount": number, "percentage": number},
    {"category": "Permits & Fees", "amount": number, "percentage": number},
    {"category": "Contingency", "amount": number, "percentage": number}
  ],
  "optimizations": [
    {"suggestion": "text", "savings": number (can be negative for investment), "ecoImpact": "text"}
  ],
  "timeline": "months estimate",
  "confidenceLevel": 0.0-1.0
}

Use realistic Egyptian construction costs for 2026. Focus on sustainable building recommendations.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      let estimate;
      try {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/) || responseText.match(/```\s*([\s\S]*?)```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;
        estimate = JSON.parse(jsonText.trim());
      } catch (parseError) {
        console.error("Failed to parse cost estimate:", parseError);
        return getMockEstimate();
      }

      return NextResponse.json(estimate);
    } catch (aiError) {
      console.error("Gemini API error:", aiError);
      return getMockEstimate();
    }
  } catch (error) {
    console.error("Estimate cost error:", error);
    return NextResponse.json({ error: "Failed to estimate cost" }, { status: 500 });
  }
}

function getMockEstimate() {
  const estimate = {
    totalEstimate: 8500000,
    currency: "EGP",
    breakdown: [
      { category: "Structural Materials", amount: 3200000, percentage: 37.6 },
      { category: "MEP Systems", amount: 1700000, percentage: 20.0 },
      { category: "Finishing & Fitout", amount: 1200000, percentage: 14.1 },
      { category: "Labor", amount: 1400000, percentage: 16.5 },
      { category: "Equipment", amount: 600000, percentage: 7.1 },
      { category: "Permits & Fees", amount: 250000, percentage: 2.9 },
      { category: "Contingency", amount: 150000, percentage: 1.8 },
    ],
    optimizations: [
      { suggestion: "Switch to recycled steel rebar", savings: 180000, ecoImpact: "+8 eco score" },
      { suggestion: "Use local concrete supplier", savings: 95000, ecoImpact: "-12% logistics CO₂" },
      { suggestion: "Solar panel integration", savings: -120000, ecoImpact: "+15 eco score, ROI in 3 years" },
    ],
    timeline: "14-18 months",
    confidenceLevel: 0.87,
  };
  return NextResponse.json(estimate);
}
