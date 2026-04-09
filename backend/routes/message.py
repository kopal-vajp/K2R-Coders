import time
from fastapi import APIRouter
from backend.schemas.customer import MessagePayloadContext
from backend.schemas.response import MessagePayloadResponse, StandardResponse

router = APIRouter(prefix="/generate-message-payload", tags=["Messaging"])

@router.post("/", response_model=StandardResponse[MessagePayloadResponse])
async def generate_message_payload(context: MessagePayloadContext):
    start = time.time()
    
    # Deterministic mock logic
    channel = context.preferred_channel.lower()
    
    if "vip" in context.customer_segment.lower():
        msg = f"Your VIP access gives you priority on {context.concern_type} concerns 🚀"
        cta = "Access Priority Service"
        prob = 0.85
    elif "discount" in context.customer_segment.lower():
        msg = f"We noticed you were checking out. Here's a 10% code for your {context.concern_type}!"
        cta = "Claim 10% Off"
        prob = 0.45
    else:
        msg = "We're here to help with your order. Reach out anytime!"
        cta = "Contact Support"
        prob = 0.35

    confidence = min(99.0, context.conversion_score + 10.0)

    payload = MessagePayloadResponse(
        channel=channel,
        message=msg,
        cta=cta,
        reply_probability=prob,
        confidence=confidence
    )
    
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=payload, latency_ms=latency)
