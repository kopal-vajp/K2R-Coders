from pydantic import BaseModel
from typing import Generic, TypeVar, Any

T = TypeVar("T")

class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    latency_ms: float = 0.0

class MessagePayloadResponse(BaseModel):
    channel: str
    message: str
    cta: str
    reply_probability: float
    confidence: float

class ConversionResponse(BaseModel):
    conversion_probability: float
    confidence_score: float

class FatigueResponse(BaseModel):
    fatigue_score: float
    risk_level: str  # e.g., "Low", "Medium", "High", "Critical"

class SegmentResponse(BaseModel):
    customer_segment: str

class ExplainabilityFactor(BaseModel):
    label: str
    detail: str
    type: str  # "positive", "negative", "neutral"

class Explainability(BaseModel):
    factors: list[ExplainabilityFactor]
    summary_reason: str

class DecisionResponse(BaseModel):
    best_channel: str
    best_timing: str
    tone: str
    expected_uplift: float
    confidence: float
    override_suppression: bool
    segment: str
    conversion_probability: float
    fatigue_risk: float
    explainability: Explainability
