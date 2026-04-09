import time
from fastapi import APIRouter
from backend.schemas.customer import SegmentContext
from backend.schemas.response import SegmentResponse, StandardResponse
from backend.services.decision_engine import evaluate_segment

router = APIRouter(prefix="/segment-user", tags=["Segmentation"])

@router.post("/", response_model=StandardResponse[SegmentResponse])
async def get_segmentation(context: SegmentContext):
    start = time.time()
    
    segment = evaluate_segment(context)
    data = SegmentResponse(customer_segment=segment)
    
    latency = round((time.time() - start) * 1000, 2)
    return StandardResponse(success=True, data=data, latency_ms=latency)
