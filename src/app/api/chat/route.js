import { NextResponse } from "next/server";

// Friend's AI chatbot API
const CHAT_API_URL = "https://intersidereal-nonoccidental-antony.ngrok-free.dev/chat";

export async function POST(request) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    try {
      console.log(`💬 Sending to chat API: ${message.substring(0, 80)}`);

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ message }),
      });

      console.log(`📡 Chat API status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Chat API error:", errorText);
        // Fall back to local mock
        return getMockResponse(message);
      }

      const data = await response.json();
      console.log("✅ Chat API response received");

      // The API returns: { response: "text..." }
      const aiText = data.response || data.message || "";

      // Detect if the response contains structured data we can enhance
      const structured = detectStructuredResponse(message, aiText);

      return NextResponse.json(structured);

    } catch (apiError) {
      console.error("❌ Chat API fetch error:", apiError.message);
      // Fallback to mock on network error
      return getMockResponse(message);
    }

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Parse AI response and detect if we can show it in a structured format
function detectStructuredResponse(userMessage, aiText) {
  const lower = userMessage.toLowerCase();

  // Check for price/product info in the response - show as products card
  const priceMatches = aiText.match(/(\d[\d,\.]+)\s*(جنيه|EGP|ج\.م)/g);
  if (priceMatches && priceMatches.length > 0 && (lower.includes("سعر") || lower.includes("price") || lower.includes("كام"))) {
    // Extract product info from the response text
    return {
      type: "text",
      content: aiText,
    };
  }

  // For comparison/bill-related queries
  if (lower.includes("bill") || lower.includes("compare") || lower.includes("فاتورة") || lower.includes("مقارنة")) {
    return {
      type: "text",
      content: aiText,
    };
  }

  // Default: return as rich text
  return {
    type: "text",
    content: aiText,
  };
}

// Fallback mock responses when API is unreachable
function getMockResponse(message) {
  const lower = message.toLowerCase();
  let response;

  if (lower.includes("material") || lower.includes("steel") || lower.includes("find") || lower.includes("مواد")) {
    response = {
      type: "products",
      content: "I found eco-certified alternatives for your requirement:",
      data: [
        { name: "EcoSteel Rebar Grade 60", supplier: "GreenSteel Arabia", price: 3200, unit: "ton", ecoScore: 92 },
        { name: "RecyBar Premium HR500", supplier: "Arabian Steel Co.", price: 3450, unit: "ton", ecoScore: 88 },
        { name: "GreenForce Rebar G60", supplier: "Emirates Steel", price: 3100, unit: "ton", ecoScore: 85 },
      ],
    };
  } else if (lower.includes("bill") || lower.includes("scan") || lower.includes("compare") || lower.includes("فاتورة")) {
    response = {
      type: "comparison",
      content: "Bill analysis complete. Here are the optimization opportunities:",
      data: [
        { item: "Steel Rebar", current: 384000, optimized: 342000, savings: 42000 },
        { item: "Concrete Mix", current: 225000, optimized: 198000, savings: 27000 },
        { item: "Insulation", current: 156000, optimized: 139000, savings: 17000 },
      ],
    };
  } else if (lower.includes("cost") || lower.includes("budget") || lower.includes("breakdown") || lower.includes("تكلفة")) {
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
  } else if (lower.includes("sustain") || lower.includes("eco") || lower.includes("green") || lower.includes("بيئ")) {
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
  } else {
    response = {
      type: "text",
      content: "I can help with material sourcing, bill analysis, cost optimization, and sustainability reports. What would you like to explore?\n\n_⚠️ Demo mode - chat API unavailable._",
    };
  }

  return NextResponse.json(response);
}
