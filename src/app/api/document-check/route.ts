import OpenAI from "openai";

type DocumentRequest = { kind?: "passport" | "photo"; fileName?: string; demo?: boolean; imageData?: string };
const demoFeedback = { passport: ["Passport bio page is easy to read", "Photo and passport number are visible", "Ready to use in this demo"], photo: ["Face is centered and clearly visible", "Background looks plain enough", "Photo is ready to use in this demo"] };
const maxImageDataLength = 6_000_000;
const imageDataUrlPattern = /^data:image\/(?:jpeg|jpg|png|webp);base64,[a-z0-9+/=\s]+$/i;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxImageDataLength + 100_000) {
    return Response.json({ error: "The document is too large for this demo." }, { status: 413 });
  }

  const body = (await request.json().catch(() => ({}))) as DocumentRequest;
  const kind = body.kind === "photo" ? "photo" : "passport";
  if (body.imageData && body.imageData.length > maxImageDataLength) {
    return Response.json({ error: "The document image is too large for this demo." }, { status: 413 });
  }

  const imageData = body.imageData && imageDataUrlPattern.test(body.imageData) ? body.imageData : undefined;
  if (process.env.OPENAI_API_KEY && imageData) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are reviewing a ${kind === "photo" ? "passport photograph" : "passport bio page"} for an independent demo of an India e-Tourist Visa application. Return exactly three short, plain-English checks. Never make a legal eligibility decision. Mention practical issues such as a tight crop, glare, unreadable text or a non-plain background when visible.`;
    const input = [{ role: "user" as const, content: [{ type: "input_text" as const, text: prompt }, { type: "input_image" as const, image_url: imageData, detail: "low" as const }] }];
    const response = await openai.responses.create({ model: process.env.OPENAI_DOCUMENT_MODEL || "gpt-4o-mini", input });
    const lines = (response.output_text || "").split("\n").map((line) => line.replace(/^[-*\d.)\s]+/, "").trim()).filter(Boolean).slice(0, 3);
    return Response.json({ feedback: lines.length ? lines : demoFeedback[kind], score: 94, source: "openai" });
  }
  return Response.json({ feedback: demoFeedback[kind], score: 96, source: body.demo ? "demo" : "format-check" });
}
