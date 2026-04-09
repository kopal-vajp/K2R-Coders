import time
from fastapi import APIRouter
from backend.schemas.customer import FatigueContext
from backend.schemas.response import FatigueResponse, StandardResponse
from backend.services.decision_engine import predict_fatigue, get_fatigue_level

router = APIRouter(prefix="/predict-fatigue", tags=["Fatigue"])

@router.post("/", response_model=StandardResponse[FatigueResponse])
async def get_fatigue_prediction(context: FatigueContext):
    start = time.time()
    
    score = predict_fatigue(context)
    level = get_fatigue_level(score)
    
    data = FatigueResponse(
        fatigue_score=score,
        risk_level=level
    )
    
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=data, latency_ms=latency)
