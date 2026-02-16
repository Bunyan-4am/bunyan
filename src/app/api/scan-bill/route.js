import { NextResponse } from "next/server";

// Friend's AI invoice analysis API
const INVOICE_API_URL = "https://hornless-maura-uncontrovertedly.ngrok-free.dev/analyze-invoice";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    console.log(`🧾 Calling analyze-invoice API for file: ${file.name}`);

    // Forward file to the friend's API
    const apiFormData = new FormData();
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: file.type || "image/jpeg" });
    apiFormData.append("file", blob, file.name || "invoice.jpg");

    const response = await fetch(INVOICE_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: apiFormData,
    });

    console.log(`📡 Invoice API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Invoice API error:", errorText);
      return NextResponse.json({ error: "Invoice analysis failed", details: errorText }, { status: 500 });
    }

    const result = await response.json();
    console.log("✅ Invoice API response:", JSON.stringify(result));

    // Return the full response from the API
    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error("❌ Scan bill error:", error);
    return NextResponse.json({ error: "Failed to analyze invoice", details: error.message }, { status: 500 });
  }
}
