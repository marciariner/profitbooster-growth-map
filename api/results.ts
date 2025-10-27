export const config = { runtime: "edge" };

function esc(s: string) {
  return (s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const qs = url.searchParams;

  const payload = {
    firstName:    qs.get("firstName")    || "",
    email:        qs.get("email")        || "",
    businessType: qs.get("businessType") || "",
    challenge:    qs.get("challenge")    || "",
    leadSources:  qs.get("leadSources")  || "",
    working:      qs.get("working")      || "",
    waste:        qs.get("waste")        || "",
    goal90:       qs.get("goal90")       || ""
  };

  if (!payload.businessType || !payload.challenge || !payload.goal90) {
    return html(`
      <div class="wrap"><div class="card">
        <h1>Profit Booster® Growth Map</h1>
        <div class="err">Missing info. Please go back and complete Business Type, Biggest Challenge, and 90-Day Goal.</div>
        <a href="https://profitbooster.biz/growthmap" class="cta">Return to form</a>
      </div></div>`);
  }

  const res = await fetch(new URL("/api/growth-map", url.origin).toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    return html(`
      <div class="wrap"><div class="card">
        <h1>Profit Booster® Growth Map</h1>
        <div class="err">We couldn’t generate your Growth Map right now. Please try again.</div>
      </div></div>`, 500);
  }

  const out = await res.json();
  const list = Array.isArray(out.moves)
    ? out.moves.map((m: any) => `<li><strong>${esc(m.name)}</strong> — <em>What:</em> ${esc(m.what)}. <em>Why:</em> ${esc(m.why)}.</li>`).join("")
    : "<li>Result unavailable. Please try again.</li>";

  return html(`
    <div class="wrap"><div class="card">
      <h1>Profit Booster® Growth Map</h1>
      <p class="muted">Here’s where growth is hiding—and what to do first.</p>
      <p><strong>Your profit position today:</strong> ${esc(out.positionLabel || "")}${out.score ? ` (${out.score}/100)` : ""}</p>
      <ol>${list}</ol>
      <p><strong>Your next best action:</strong> ${esc(out.nextAction || "We’ll email your next step shortly.")}</p>
      <a href="https://profitbooster.biz/booking" class="cta">Book Your Growth Jumpstart</a>
    </div></div>`);
}

function html(body: string, status = 200) {
  const page = `
<!doctype html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Your Profit Booster® Growth Map</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:0;padding:2rem;background:#f8fafc}
  .wrap{max-width:760px;margin:0 auto}
  .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;box-shadow:0 2px 10px rgba(0,0,0,.04)}
  h1{font-size:1.6rem;margin:.2rem 0 1rem}
  .muted{color:#64748b;margin:.2rem 0 1.2rem}
  ol{margin-left:1.25rem}
  .cta{display:inline-block;margin-top:1rem;background:#1860d1;color:#fff;padding:.8rem 1.2rem;border-radius:10px;text-decoration:none}
  .cta:hover{background:#0f4cb0}
  .err{color:#b91c1c;background:#fee2e2;border:1px solid #fecaca;padding:.8rem;border-radius:10px}
</style>
</head><body>${body}</body></html>`;
  return new Response(page, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}
