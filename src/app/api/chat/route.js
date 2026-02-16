import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(request) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY === "your_gemini_api_key_here") {
      // Fallback to mock responses if no API key
      return getMockResponse(message);
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are an AI assistant for Bunyan, a construction intelligence platform focused on sustainable building in Egypt and MENA region. 

Your role:
- Help with material sourcing and eco-friendly alternatives
- Analyze bills and suggest cost optimizations
- Provide cost breakdowns and sustainability scores
- Recommend eco-certified materials from Egyptian/regional suppliers
- Generate sustainable design concepts and recommendations

Context: ${context ? JSON.stringify(context) : "General construction query"}

Respond ONLY with valid JSON in one of these formats:

1. For material recommendations:
{"type":"products","content":"description","data":[{"name":"product","supplier":"company","price":number,"unit":"unit","ecoScore":number}]}

2. For bill comparisons:
{"type":"comparison","content":"description","data":[{"item":"name","current":number,"optimized":number,"savings":number}]}

3. For cost breakdowns:
{"type":"breakdown","content":"description","data":[{"category":"name","amount":number,"color":"#hex"}]}

4. For sustainability scores:
{"type":"score","content":"description","data":{"score":number,"rating":"text","description":"text","metrics":[{"label":"text","value":"text"}]}}

5. For design generation (when user asks to generate, create, or show design/image):
{"type":"design","content":"description","data":{"title":"design name","imageUrl":"detailed prompt for architectural visualization","specs":[{"label":"text","value":"text"}]}}

6. For general text:
{"type":"text","content":"your response"}

Important: When type is "design", put a detailed architectural visualization prompt in imageUrl field (will be used to generate image).

User question: ${message}`;

      const result = await model.generateContent(systemPrompt);
      const responseText = result.response.text();
      
      // Try to parse JSON from response
      let response;
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/) || responseText.match(/```\s*([\s\S]*?)```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;
        response = JSON.parse(jsonText.trim());
        
        // If response is design type, generate real image URL
        if (response.type === 'design' && response.data) {
          const imagePrompt = response.data.imageUrl || response.data.title || "sustainable modern building with eco-friendly features";
          
          // Enhanced prompt for better quality
          const enhancedPrompt = `Professional architectural visualization, ${imagePrompt}, photorealistic rendering, 8K quality, architectural digest style, extremely detailed, perfect lighting, masterpiece`;
          
          const encodedPrompt = encodeURIComponent(enhancedPrompt);
          response.data.imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&private=true&model=flux-pro`;
        }
      } catch (parseError) {
        // If parsing fails, return as text
        response = {
          type: "text",
          content: responseText.trim()
        };
      }

      return NextResponse.json(response);
    } catch (aiError) {
      console.error("Gemini API error:", aiError);
      // Fallback to mock response on AI error
      return getMockResponse(message);
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Fallback mock responses
function getMockResponse(message) {
  const lower = message.toLowerCase();
  let response;

  if (lower.includes("material") || lower.includes("steel") || lower.includes("find")) {
    response = {
      type: "products",
      content: "I found eco-certified alternatives for your requirement:",
      data: [
        { name: "EcoSteel Rebar Grade 60", supplier: "GreenSteel Arabia", price: 3200, unit: "ton", ecoScore: 92 },
        { name: "RecyBar Premium HR500", supplier: "Arabian Steel Co.", price: 3450, unit: "ton", ecoScore: 88 },
        { name: "GreenForce Rebar G60", supplier: "Emirates Steel", price: 3100, unit: "ton", ecoScore: 85 },
      ],
    };
  } else if (lower.includes("bill") || lower.includes("scan") || lower.includes("compare")) {
    response = {
      type: "comparison",
      content: "Bill analysis complete. Here are the optimization opportunities:",
      data: [
        { item: "Steel Rebar", current: 384000, optimized: 342000, savings: 42000 },
        { item: "Concrete Mix", current: 225000, optimized: 198000, savings: 27000 },
        { item: "Insulation", current: 156000, optimized: 139000, savings: 17000 },
      ],
    };
  } else if (lower.includes("cost") || lower.includes("budget") || lower.includes("breakdown")) {
    response = {
      type: "breakdown",
      content: "Here is the cost breakdown analysis:",
      data: [
        { category: "Structural Materials", amount: 4200000, color: "#102a4e" },
        { category: "MEP Systems", amount: 1850000, color: "#2e8c58" },
        { category: "Finishing", amount: 1200000, color: "#3b82f6" },
        { category: "Labor", amount: 950000, color: "#f59e0b" },
      ],
    };
  } else if (lower.includes("sustain") || lower.includes("eco") || lower.includes("green")) {
    response = {
      type: "score",
      content: "Sustainability assessment complete:",
      data: {
        score: 94,
        rating: "Exceptional",
        description: "Top 5% of projects in the region",
        metrics: [
          { label: "CO₂ Saved", value: "890t" },
          { label: "Waste ↓", value: "2.8%" },
          { label: "Recycled", value: "72%" },
        ],
      },
    };
  } else if (lower.includes("design") || lower.includes("generate") || lower.includes("create") || lower.includes("image")) {
    const designPrompt = "Professional architectural visualization, modern sustainable residential building with solar panels, green roof, large windows, eco-friendly materials, photorealistic rendering, 8K quality, architectural digest style, masterpiece";
    response = {
      type: "design",
      content: "I've generated an eco-optimized design concept based on your requirements:",
      data: {
        title: "Sustainable Residential Design",
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(designPrompt)}?width=1024&height=768&nologo=true&private=true&model=flux-pro`,
        specs: [
          { label: "Energy Rating", value: "A+" },
          { label: "Solar Gain", value: "-35%" },
          { label: "Material Cost", value: "EGP 890/m²" },
          { label: "CO₂ Impact", value: "-42%" },
        ],
      },
    };
  } else {
    response = {
      type: "text",
      content: "I can help you with material sourcing, bill analysis, cost optimization, and sustainability reports. What would you like to explore?",
    };
  }

  return NextResponse.json(response);
}
