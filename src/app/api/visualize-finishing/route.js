import { NextResponse } from "next/server";

// Your friend's AI image transformation API
const DESIGN_API_URL = "https://hornless-maura-uncontrovertedly.ngrok-free.dev/generate-design";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const style = formData.get("style") || "modern";

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    console.log(`🚀 Calling design API with style: ${style}`);

    // Forward the file + style to the friend's design API
    const apiFormData = new FormData();
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: file.type || "image/jpeg" });
    apiFormData.append("file", blob, file.name || "image.jpg");
    apiFormData.append("style", style);

    const response = await fetch(DESIGN_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: apiFormData,
    });

    console.log(`📡 Design API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Design API error:", errorText);
      return NextResponse.json({ error: "Image generation failed", details: errorText }, { status: 500 });
    }

    const result = await response.json();
    console.log("✅ Design API response:", JSON.stringify(result));

    // Return the image URL from the API
    return NextResponse.json({
      success: true,
      generated_image_url: result.generated_image_url,
      style: result.style || style,
      project: result.project || "bunyan",
    });

  } catch (error) {
    console.error("❌ Visualize finishing error:", error);
    return NextResponse.json({ error: "Failed to generate visualization", details: error.message }, { status: 500 });
  }
}
