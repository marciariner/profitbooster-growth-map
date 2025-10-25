// api/growth-map.ts — Vercel Edge Function (no framework/build required)
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const {
      firstName, email, businessType,
      challenge, leadSources, working, waste, goal90
    } = body || {};

    // Basic scoring logic
    let score = 60;
    const ch = (challenge || '').toLowerCase();
    if (!leadSources) score -= 10;
    if (ch.includes('profit') || ch.includes('margin')) score -= 10;

    // Position label
    let positionLabel = 'Ready to Grow';
    if (score >= 80) positionLabel = 'Primed for Scale';
    else if (score >= 40 && score < 60) positionLabel = 'Leaky but Fixable';
    else if (score < 40) positionLabel = 'Stalled & Unclear';

    // Moves selector
    function movesFor(cText: string) {
      const c = (cText || '').toLowerCase();
      if (c.includes('lead')) {
        return [
          { name: 'Referral Engine Revival', what: 'Activate past/current clients for referrals', why: 'Warm intros convert faster than cold ads' },
          { name: 'Partnership Pipeline', what: 'Co-market with complementary firms', why: 'Borrow credibility and reach ready buyers' },
          { name: 'Focused Channel Bet', what: 'Commit to one proven channel for 90 days', why: 'Consistency compounds results' }
        ];
      }
      if (c.includes('convert') || c.includes('sales')) {
        return [
          { name: 'Offer Clarity & Packaging', what: 'Tighten promise and pricing tiers', why: 'Clarity lifts close rate & deal size' },
          { name: 'Proof Front-Load', what: 'Place quick wins early in the path', why: 'Reduces risk and speeds decisions' },
          { name: 'Friction Trim', what: 'Shorten steps to first commitment', why: 'Less effort = more yeses' }
        ];
      }
      if (c.includes('profit') || c.includes('margin')) {
        return [
          { name: 'Pricing Reset', what: 'Align pricing to ROI and bundle logically', why: 'Margin wins beat volume' },
          { name: 'Scope Control', what: 'Define non-negotiables & change-order rules', why: 'Protects profit per engagement' },
          { name: 'Cost-to-Serve Cleanup', what: 'Cut low-ROI services/steps', why: 'Keep only profitable work' }
        ];
      }
      if (c.includes('capacity') || c.includes('team') || c.includes('delivery')) {
        return [
          { name: 'Fulfillment Focus', what: 'Streamline delivery for one core offer', why: 'Cleaner throughput unlocks capacity' },
          { name: 'Delegation Uplift', what: 'Shift repeatables off the founder', why: 'Frees time for growth activities' },
          { name: 'Client Fit Filter', what: 'Tighten pre-qual and entry criteria', why: 'Smoother projects, better margins' }
        ];
      }
      if (c.includes('pricing') || c.includes('offer')) {
        return [
          { name: 'Value Ladder Tune', what: 'Calibrate entry, core, premium tiers', why: 'Capture more value per client' },
          { name: 'Outcomes Over Features', what: 'Lead with the result buyers want', why: 'People buy outcomes, not activity' },
          { name: 'Retention Add-On', what: 'Introduce continuity/maintenance', why: 'Turns one-offs into recurring revenue' }
        ];
      }
      // Default / positioning
      return [
        { name: 'Promise Sharpening', what: 'Define the single outcome clients want most', why: 'Clear promise attracts qualified buyers' },
        { name: 'ICP Narrowing', what: 'Focus on the most profitable audience', why: 'Relevance beats reach' },
        { name: 'Proof Library', what: 'Collect short specific wins & reuse them', why: 'Trust accelerates buying' }
      ];
    }

    const moves = movesFor(ch);
    const nextAction =
      ch.includes('lead') ? 'Identify two partner brands and draft a co-promo' :
      (ch.includes('convert') || ch.includes('sales')) ? 'Publish a crisp offer promise with one proof point' :
      (ch.includes('profit') || ch.includes('margin')) ? 'Audit top 3 services for price/packaging uplift' :
      'Write your one-sentence promise and the buyer it serves';

    return new Response(
      JSON.stringify({ positionLabel, score, moves, nextAction }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }
}


