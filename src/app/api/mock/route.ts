export const dynamic = "force-static";

const applicationId = "ETV-2026-10482";

export async function GET() {
  return Response.json({
    applicationId,
    status: "under_review",
    fee: 2399,
    policyVersion: "demo-2026-08",
    simulated: true,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { status?: unknown; fee?: unknown };
  const status = typeof body.status === "string" ? body.status : "submitted";
  const fee = typeof body.fee === "number" && Number.isFinite(body.fee) && body.fee >= 0 ? body.fee : 0;
  return Response.json({ applicationId, received: true, status, fee, simulated: true });
}
