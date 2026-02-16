import { NextResponse } from "next/server";

// Returns finishing data: analysis, materials, costs, timeline
export async function POST(request) {
  try {
    const { style = "modern" } = await request.json();

    const materials = {
      modern: [
        { name: "Porcelain Floor Tiles 60x60cm", quantity: "20", unit: "m²", supplier: "RAK Ceramics Egypt", ecoScore: 85 },
        { name: "Premium Wall Paint (Jotun)", quantity: "15", unit: "L", supplier: "Jotun Egypt", ecoScore: 88 },
        { name: "LED Recessed Lights", quantity: "6", unit: "pcs", supplier: "Philips Egypt", ecoScore: 92 },
        { name: "Gypsum Board Ceiling", quantity: "20", unit: "m²", supplier: "Knauf Egypt", ecoScore: 80 },
      ],
      luxury: [
        { name: "Italian Marble Tiles", quantity: "20", unit: "m²", supplier: "Cleopatra Marble", ecoScore: 75 },
        { name: "Decorative Ceiling Moldings", quantity: "30", unit: "m", supplier: "Orac Egypt", ecoScore: 70 },
        { name: "Crystal Chandelier", quantity: "1", unit: "pcs", supplier: "Swarovski Egypt", ecoScore: 65 },
        { name: "Premium Wallpaper", quantity: "8", unit: "rolls", supplier: "Zambaiti Egypt", ecoScore: 72 },
      ],
      classic: [
        { name: "Parquet Wood Flooring", quantity: "20", unit: "m²", supplier: "Tarkett Egypt", ecoScore: 82 },
        { name: "Classic Ceiling Cornices", quantity: "20", unit: "m", supplier: "Orac Egypt", ecoScore: 78 },
        { name: "Traditional Chandelier", quantity: "1", unit: "pcs", supplier: "Egyptian Lighting", ecoScore: 70 },
        { name: "Premium Satin Paint", quantity: "15", unit: "L", supplier: "Jotun Egypt", ecoScore: 85 },
      ],
    };

    const suggestions = {
      modern: [
        { title: "Flooring", description: "Large format porcelain tiles (EGP 300-600/m²)", cost: "EGP 6,000 - 12,000" },
        { title: "Wall Finishing", description: "Smooth paint finish in warm neutral tones", cost: "EGP 4,000 - 6,000" },
        { title: "Lighting", description: "Modern LED ceiling lights + wall sconces", cost: "EGP 5,000 - 12,000" },
        { title: "Total Estimate", description: "Complete modern finishing package", cost: "EGP 30,000 - 60,000" },
      ],
      luxury: [
        { title: "Flooring", description: "Italian marble or high-end porcelain (EGP 800-1200/m²)", cost: "EGP 16,000 - 24,000" },
        { title: "Wall Finishing", description: "Premium paint with decorative moldings and accent wall", cost: "EGP 8,000 - 15,000" },
        { title: "Lighting", description: "Crystal chandelier + recessed LED spots", cost: "EGP 15,000 - 30,000" },
        { title: "Total Estimate", description: "Complete luxury finishing package", cost: "EGP 80,000 - 150,000" },
      ],
      classic: [
        { title: "Flooring", description: "Parquet or patterned tiles (EGP 400-700/m²)", cost: "EGP 8,000 - 14,000" },
        { title: "Wall Finishing", description: "Classic Egyptian style with warm colors and decorative ceiling", cost: "EGP 6,000 - 10,000" },
        { title: "Lighting", description: "Traditional lighting fixtures + wall sconces", cost: "EGP 8,000 - 18,000" },
        { title: "Total Estimate", description: "Complete classic finishing package", cost: "EGP 45,000 - 85,000" },
      ],
    };

    return NextResponse.json({
      success: true,
      style,
      analysis: {
        roomType: "living room",
        dimensions: "~20m²",
        stage: "unfinished",
      },
      suggestions: suggestions[style] || suggestions.modern,
      materials: materials[style] || materials.modern,
      timeline: style === "luxury" ? "4-6 weeks" : "2-4 weeks",
    });

  } catch (error) {
    console.error("Finishing data error:", error);
    return NextResponse.json({ error: "Failed to get finishing data" }, { status: 500 });
  }
}
