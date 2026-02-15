import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // In production, use OCR / AI to scan bill
    // Return mock scanned data

    await new Promise((r) => setTimeout(r, 1500)); // Simulate processing

    const scannedData = {
      vendor: "GreenSteel Arabia",
      date: "2026-02-10",
      total: 384000,
      items: [
        { description: "Steel Rebar Grade 60 - 120 tons", quantity: 120, unit: "ton", price: 3200, total: 384000 },
      ],
      tax: 57600,
      grandTotal: 441600,
      currency: "SAR",
      confidence: 0.95,
      suggestions: [
        { message: "Alternative supplier found with 8% lower cost", savings: 30720 },
        { message: "Eco-certified alternative available with higher recycled content", ecoImprovement: 12 },
      ],
    };

    return NextResponse.json(scannedData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to scan bill" }, { status: 500 });
  }
}
