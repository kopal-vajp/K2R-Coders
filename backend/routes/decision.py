import time
from fastapi import APIRouter
from backend.schemas.customer import DecisionContext
from backend.schemas.response import DecisionResponse, StandardResponse
from backend.services.decision_engine import generate_omnichannel_decision

router = APIRouter(prefix="/generate-decision", tags=["Decision Core"])

@router.post("/", response_model=StandardResponse[DecisionResponse])
async def get_omnichannel_decision(context: DecisionContext):
    start = time.time()
    
    result = generate_omnichannel_decision(context)
    data = DecisionResponse(**result)
    
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=data, latency_ms=latency)
