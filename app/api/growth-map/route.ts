export const runtime = 'edge'; // Fast startup on Vercel Edge Network

export async function POST(req: Request) {
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

    // Determine overall position
    let positionLabel = 'Ready to Grow';
    if (score >= 80) positionLabel = 'Primed for Scale';
    else if (score >= 40 && score < 60) positionLabel = 'Leaky but Fixable';
    else if (score < 40) positionLabel = 'Stalled & Unclear';

    // Pick 3 recommended growth moves based on challenge keywords
    function movesFor(challenge: string) {
      const c = (challenge || '').toLowerCase();
      if (c.includes('lead')) {
        return [
          { name: 'Referral Engine Revival', what: 'Activate past and current clients for referrals', why: 'Warm introductions convert faster than cold ads' },
          { name: 'Partnership Pipeline', what: 'Co-market with complementary businesses', why: 'Shared audiences bring high-quality leads' },
          { name: 'Focused Channel Bet', what: 'Commit to one proven marketing channel for 90 days', why: 'Consistency compounds results' }
        ];
      }
      if (c.includes('convert') || c.includes('sales')) {
        return [
          { name: 'Offer Clarity & Packaging', what: 'Tighten your promise and pricing structure', why: 'Clear outcomes close faster' },
          { name: 'Proof Front-Load', what: 'Share wins earlier in your funnel', why: 'Reduces risk and builds trust' },
          { name: 'Friction Trim', what: 'Simplify your buying steps', why: 'Less effort = higher conversion' }
        ];
      }
      if (c.includes('profit') || c.includes('margin')) {
        return [
          { name: 'Pricing Reset', what: 'Re-align pricing to ROI', why: 'Margin wins beat volume' },
          { name: 'Scope Control', what: 'Define and enforce project boundaries', why: 'Protects profit per client' },
          { name: 'Cost-to-Serve Cleanup', what: 'Eliminate low-return activities', why: 'Focus time on profitable work' }
        ];
      }
      if (c.includes('capacity') || c.includes('team')) {
        return [
          { name: 'Fulfillment Focus', what: 'Streamline delivery of your core offer', why: 'Increases efficiency and output' },
          { name: 'Delegation Uplift', what: 'Assign repeatable tasks to team members', why: 'Frees you for higher-value work' },
          { name: 'Client Fit Filter', what: 'Qualify clients more tightly', why: 'Prevents scope creep and stress' }
        ];
      }
      // Default / general growth path
      return [
        { name: 'Promise Sharpening', what: 'Define the single biggest outcome clients want', why: 'Clarity attracts ideal buyers' },
        { name: 'ICP Narrowing', what: 'Focus on your most profitable audience', why: 'Relevance beats reach' },
        { name: 'Proof Library', what: 'Collect small client wins and reuse them in marketing', why: 'Trust accelerates buying' }
      ];
    }

    const moves = movesFor(ch);
    const nextAction =
      ch.includes('lead') ? 'Identify two partner brands for a co-promo campaign' :
      ch.includes('convert') || ch.includes('sales') ? 'Publish a crisp offer promise with one proof point' :
      ch.includes('profit') || ch.includes('margin') ? 'Audit top 3 services for pricing or packaging updates' :
      'Write your one-sentence business promise and who it serves';

    return new Response(
      JSON.stringify({ positionLabel, score, moves, nextAction }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }
}
export const runtime = 'edge'; // Fast startup on Vercel Edge Network

export async function POST(req: Request) {
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

    // Determine overall position
    let positionLabel = 'Ready to Grow';
    if (score >= 80) positionLabel = 'Primed for Scale';
    else if (score >= 40 && score < 60) positionLabel = 'Leaky but Fixable';
    else if (score < 40) positionLabel = 'Stalled & Unclear';

    // Pick 3 recommended growth moves based on challenge keywords
    function movesFor(challenge: string) {
      const c = (challenge || '').toLowerCase();
      if (c.includes('lead')) {
        return [
          { name: 'Referral Engine Revival', what: 'Activate past and current clients for referrals', why: 'Warm introductions convert faster than cold ads' },
          { name: 'Partnership Pipeline', what: 'Co-market with complementary businesses', why: 'Shared audiences bring high-quality leads' },
          { name: 'Focused Channel Bet', what: 'Commit to one proven marketing channel for 90 days', why: 'Consistency compounds results' }
        ];
      }
      if (c.includes('convert') || c.includes('sales')) {
        return [
          { name: 'Offer Clarity & Packaging', what: 'Tighten your promise and pricing structure', why: 'Clear outcomes close faster' },
          { name: 'Proof Front-Load', what: 'Share wins earlier in your funnel', why: 'Reduces risk and builds trust' },
          { name: 'Friction Trim', what: 'Simplify your buying steps', why: 'Less effort = higher conversion' }
        ];
      }
      if (c.includes('profit') || c.includes('margin')) {
        return [
          { name: 'Pricing Reset', what: 'Re-align pricing to ROI', why: 'Margin wins beat volume' },
          { name: 'Scope Control', what: 'Define and enforce project boundaries', why: 'Protects profit per client' },
          { name: 'Cost-to-Serve Cleanup', what: 'Eliminate low-return activities', why: 'Focus time on profitable work' }
        ];
      }
      if (c.includes('capacity') || c.includes('team')) {
        return [
          { name: 'Fulfillment Focus', what: 'Streamline delivery of your core offer', why: 'Increases efficiency and output' },
          { name: 'Delegation Uplift', what: 'Assign repeatable tasks to team members', why: 'Frees you for higher-value work' },
          { name: 'Client Fit Filter', what: 'Qualify clients more tightly', why: 'Prevents scope creep and stress' }
        ];
      }
      // Default / general growth path
      return [
        { name: 'Promise Sharpening', what: 'Define the single biggest outcome clients want', why: 'Clarity attracts ideal buyers' },
        { name: 'ICP Narrowing', what: 'Focus on your most profitable audience', why: 'Relevance beats reach' },
        { name: 'Proof Library', what: 'Collect small client wins and reuse them in marketing', why: 'Trust accelerates buying' }
      ];
    }

    const moves = movesFor(ch);
    const nextAction =
      ch.includes('lead') ? 'Identify two partner brands for a co-promo campaign' :
      ch.includes('convert') || ch.includes('sales') ? 'Publish a crisp offer promise with one proof point' :
      ch.includes('profit') || ch.includes('margin') ? 'Audit top 3 services for pricing or packaging updates' :
      'Write your one-sentence business promise and who it serves';

    return new Response(
      JSON.stringify({ positionLabel, score, moves, nextAction }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }
}

