import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || "";

// Hugging Face Image Generation
async function generateImageHF(prompt) {
  if (!HF_API_KEY || HF_API_KEY === "your_hf_token_here") {
    return null;
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, low quality, distorted, ugly, bad architecture, unrealistic, cartoon",
            num_inference_steps: 25,
            guidance_scale: 7,
          },
        }),
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      return `data:image/jpeg;base64,${base64}`;
    }
  } catch (error) {
    console.error("HF generation error:", error);
  }
  
  return null;
}

export async function POST(request) {
  try {
    const { projectType, requirements, sustainable } = await request.json();

    // Check if API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY === "your_gemini_api_key_here") {
      return getMockDesign(projectType);
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate a sustainable architectural design concept for:

Project Type: ${projectType || "Building"}
Requirements: ${requirements || "Eco-friendly construction"}
Sustainability Focus: ${sustainable ? "High" : "Medium"}

Provide a detailed design in this JSON format:
{
  "id": "design-${Date.now()}",
  "title": "Design title",
  "description": "Brief description of sustainable features",
  "imagePrompt": "Detailed prompt for AI image generation - architectural visualization",
  "specs": [
    {"label": "Energy Rating", "value": "A+ or similar"},
    {"label": "Solar Gain", "value": "percentage reduction"},
    {"label": "Material Cost", "value": "EGP per m²"},
    {"label": "CO₂ Impact", "value": "percentage reduction"}
  ],
  "materials": [
    {"name": "material name", "quantity": number, "unit": "m² or m³"}
  ],
  "sustainabilityScore": 0-100,
  "estimatedCost": number in EGP
}

Focus on Egyptian/MENA climate and available sustainable materials.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      let design;
      try {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/) || responseText.match(/```\s*([\s\S]*?)```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;
        design = JSON.parse(jsonText.trim());
      } catch (parseError) {
        console.error("Failed to parse design:", parseError);
        return getMockDesign(projectType);
      }

      // Generate image URL using HF or fallback
      const imagePrompt = design.imagePrompt || `Modern sustainable ${projectType} architecture, eco-friendly building design with solar panels, green roof, large windows, natural materials, professional architectural rendering, photorealistic, 8K quality, architectural visualization, masterpiece`;
      
      let imageUrl = await generateImageHF(imagePrompt);
      
      if (!imageUrl) {
        // Fallback to Pollinations with better settings
        const encodedPrompt = encodeURIComponent(imagePrompt);
        imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&private=true&model=flux-pro`;
      }
      
      design.imageUrl = imageUrl;

      return NextResponse.json(design);
    } catch (aiError) {
      console.error("Gemini API error:", aiError);
      return getMockDesign(projectType);
    }

  } catch (error) {
    console.error("Generate design error:", error);
    return NextResponse.json({ error: "Failed to generate design" }, { status: 500 });
  }
}

function getMockDesign(projectType) {
  const mockPrompt = `Professional architectural rendering of modern sustainable ${projectType || 'building'} with solar panels, green roof, large windows, eco-friendly materials, photorealistic visualization, 8K quality, architectural digest style, masterpiece, extremely detailed`;
  
  const design = {
    id: `design-${Date.now()}`,
    title: `Eco-Optimized ${projectType || "Building"} Design`,
    description: "AI-generated sustainable design optimized for minimal environmental impact",
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(mockPrompt)}?width=1024&height=768&nologo=true&private=true&model=flux-pro`,
    specs: [
      { label: "Energy Rating", value: "A+" },
      { label: "Solar Gain", value: "-35%" },
      { label: "Material Cost", value: "EGP 890/m²" },
      { label: "CO₂ Impact", value: "-42%" },
    ],
    materials: [
      { name: "SolarGlass Facade Panel", quantity: 450, unit: "m²" },
      { name: "BioInsulate Pro R-30", quantity: 800, unit: "m²" },
      { name: "EcoTimber CLT Panel", quantity: 120, unit: "m³" },
    ],
    sustainabilityScore: 92,
    estimatedCost: 2450000,
  };
  return NextResponse.json(design);
}
