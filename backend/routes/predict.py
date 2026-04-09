import time
from fastapi import APIRouter
from backend.schemas.customer import ConversionContext
from backend.schemas.response import ConversionResponse, StandardResponse
from backend.services.decision_engine import predict_conversion
from backend.services.model_loader import model_loader

router = APIRouter(prefix="/predict-conversion", tags=["Prediction"])

@router.post("/", response_model=StandardResponse[ConversionResponse])
async def get_conversion_prediction(context: ConversionContext):
    start = time.time()
    
    # Check ML model via updated loader
    model = model_loader.get_model("conversion_v1")
    
    prob = predict_conversion(context)
    confidence = 92.5 if context.checkout_attempts > 0 else 75.0
    
    data = ConversionResponse(
        conversion_probability=prob,
        confidence_score=confidence
    )
    
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=data, latency_ms=latency)
