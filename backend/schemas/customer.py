from pydantic import BaseModel, Field
from typing import Optional

class ConversionContext(BaseModel):
    cart_value: float = Field(..., description="Current value of the shopping cart")
    repeat_user: bool = Field(..., description="Whether the user has purchased before")
    checkout_attempts: int = Field(0, description="Number of times checkout was attempted this session")
    session_duration: int = Field(0, description="Session duration in minutes")

class FatigueContext(BaseModel):
    previous_sends: int = Field(..., description="Messages sent in the last 7 days")
    ignored_count: int = Field(0, description="Number of consecutive ignored messages")
    unread_messages: int = Field(0, description="Current unread message count")
    rage_clicks: int = Field(0, description="Number of detected rage clicks in current session")

class SegmentContext(BaseModel):
    avg_order_value: float = Field(..., description="Historical average order value")
    purchase_frequency: int = Field(..., description="Number of purchases in the last year")
    category_affinity: str = Field(..., description="Most purchased product category")

class DecisionContext(BaseModel):
    conversion_context: ConversionContext
    fatigue_context: FatigueContext
    segment_context: SegmentContext
    preferred_channel: str = Field("WhatsApp", description="User's preferred contact channel")
    whatsapp_opt_in: bool = True
    sms_opt_in: bool = True
    promo_consent: bool = True

class MessagePayloadContext(BaseModel):
    customer_segment: str = Field(..., description="E.g., Platinum VIP, Discount Seeker")
    preferred_channel: str = Field(..., description="E.g., whatsapp, sms, instagram")
    tone: str = Field(..., description="E.g., Urgent/Incentivized")
    concern_type: str = Field(..., description="E.g., Shipping, Coupon")
    conversion_score: float = Field(..., description="Current probability score")
