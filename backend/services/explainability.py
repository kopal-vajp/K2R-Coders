from backend.schemas.customer import DecisionContext
from backend.schemas.response import ExplainabilityFactor, Explainability

def generate_explainability(context: DecisionContext, conv_prob: float, fatigue_score: float, segment: str, selected_channel: str) -> Explainability:
    factors = []
    
    # Factor 1: Conversion signal
    if conv_prob > 80:
        factors.append(ExplainabilityFactor(label="High Intent", detail=f"User exhibits {conv_prob}% conversion probability based on session.", type="positive"))
    elif conv_prob < 40:
        factors.append(ExplainabilityFactor(label="Low Intent", detail=f"User exhibits only {conv_prob}% conversion probability.", type="negative"))
    else:
        factors.append(ExplainabilityFactor(label="Moderate Intent", detail="User is browsing with no clear immediate intent.", type="neutral"))

    # Factor 2: Fatigue signal
    if fatigue_score > 75:
        factors.append(ExplainabilityFactor(label="High Fatigue Risk", detail=f"Recent send volume pushed fatigue to {fatigue_score}%.", type="negative"))
    else:
        factors.append(ExplainabilityFactor(label="Clear to Send", detail=f"Fatigue is acceptable at {fatigue_score}%.", type="positive"))

    # Factor 3: Loyalty/Segment
    if "VIP" in segment or "Premium" in segment:
        factors.append(ExplainabilityFactor(label="VIP Status", detail="Historical AOV indicates a premium returning buyer.", type="positive"))

    # Factor 4: Channel alignment
    if selected_channel.lower() == context.preferred_channel.lower():
        factors.append(ExplainabilityFactor(label="Channel Match", detail=f"Aligns with user preference for {selected_channel}.", type="positive"))
    else:
        factors.append(ExplainabilityFactor(label="Channel Override", detail=f"Overridden to {selected_channel} due to engagement rates.", type="neutral"))

    # Cap at 5 factors
    factors = factors[:5]

    summary = "Determined based on intent baseline, cross-referenced with volume fatigue."
    return Explainability(factors=factors, summary_reason=summary)
