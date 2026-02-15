import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // In production, this would call OpenAI / custom AI model
    // For now, return structured responses based on intent

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
    } else {
      response = {
        type: "text",
        content: "I can help you with material sourcing, bill analysis, cost optimization, and sustainability reports. What would you like to explore?",
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
