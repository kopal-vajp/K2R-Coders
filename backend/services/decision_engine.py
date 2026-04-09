from backend.schemas.customer import ConversionContext, FatigueContext, SegmentContext, DecisionContext
from backend.services.explainability import generate_explainability
from backend.services.model_loader import model_loader
import pandas as pd
import numpy as np

def predict_conversion(ctx: ConversionContext) -> float:
    bundle = model_loader.get_conversion_model()
    if bundle:
        try:
            model = bundle['model']
            le_category = bundle['le_category']
            le_time = bundle['le_time']
            features = bundle['features']
            
            data = {
                'cart_value': [float(ctx.cart_value)],
                'session_duration': [float(ctx.session_duration)],
                'repeat_user': [int(ctx.repeat_user)],
                'checkout_attempts': [int(ctx.checkout_attempts)],
                'product_category': [le_category.transform(['Generic'])[0]],
                'time_of_day': [le_time.transform(['Afternoon'])[0]]
            }
            df = pd.DataFrame(data)[features]
            prob = float(model.predict_proba(df)[0][1]) * 100.0
            return max(0.0, min(99.9, prob))
        except Exception:
            pass

    # Base probability (mock fallback)
    prob = 30.0
    if ctx.cart_value > 500:
        prob += 30.0
    elif ctx.cart_value > 100:
        prob += 15.0
        
    if ctx.repeat_user:
        prob += 15.0
        
    if ctx.checkout_attempts > 0:
        prob += 10.0
        
    # Penalty for too long of a session without checkout
    if ctx.session_duration > 60 and ctx.checkout_attempts == 0:
        prob -= 15.0
        
    return max(0.0, min(99.9, prob))

def predict_fatigue(ctx: FatigueContext) -> float:
    bundle = model_loader.get_fatigue_model()
    if bundle:
        try:
            model = bundle['model']
            le_fatigue = bundle['le_fatigue']
            features = bundle['features']
            
            data = {
                'previous_sends': [int(ctx.previous_sends)],
                'ignored_count': [int(ctx.ignored_count)],
                'unread_messages': [int(ctx.unread_messages)],
                'rage_clicks': [int(ctx.rage_clicks)]
            }
            df = pd.DataFrame(data)[features]
            
            # Predict probability distribution and pick max as an approximation
            # Actually, let's predict label, then convert to a mock score so existing routes stay identical
            label_idx = model.predict(df)[0]
            label = le_fatigue.inverse_transform([label_idx])[0]
            if label == 'High':
                return 85.0
            elif label == 'Medium':
                return 45.0
            else:
                return 15.0
        except Exception:
            pass

    # Mock fallback
    score = 0.0
    score += ctx.previous_sends * 10
    score += ctx.ignored_count * 15
    score += ctx.unread_messages * 5
    score += ctx.rage_clicks * 2.5
    
    return max(0.0, min(100.0, score))

def get_fatigue_level(score: float) -> str:
    if score < 30: return "Low"
    if score < 60: return "Medium"
    if score < 85: return "High"
    return "Critical"

def evaluate_segment(ctx: SegmentContext) -> str:
    bundle = model_loader.get_segmentation_model()
    if bundle:
        try:
            model = bundle['model']
            scaler = bundle['scaler']
            labels_map = bundle['labels_map']
            features = bundle['features']
            
            # category_affinity_score mapped from category_affinity string length as a fallback mock
            # if we wanted a real map we'd have it, but for our mock we just use 0.5
            affinity_score = 0.5
            data = {
                'avg_order_value': [float(ctx.avg_order_value)],
                'purchase_frequency': [int(ctx.purchase_frequency)],
                'recency_days': [14], # Default recency
                'category_affinity_score': [affinity_score]
            }
            df = pd.DataFrame(data)[features]
            df_scaled = scaler.transform(df)
            cluster_id = model.predict(df_scaled)[0]
            label = labels_map[cluster_id]
            
            # Map back to existing presentation labels roughly
            if label == 'loyal_premium': return "Platinum VIP"
            if label == 'discount_seeker': return "Discount Seeker"
            if label == 'first_timer': return "New Prospect"
            return "Hesitant Buyer"
        except Exception:
            pass

    # Mock fallback
    if ctx.avg_order_value > 300 and ctx.purchase_frequency > 3:
        return "Platinum VIP"
    if ctx.avg_order_value > 100 and ctx.purchase_frequency > 1:
        return "Gold Loyal"
    if ctx.purchase_frequency == 0:
        return "New Prospect"
    return "Discount Seeker"

def generate_omnichannel_decision(ctx: DecisionContext) -> dict:
    conv_prob = predict_conversion(ctx.conversion_context)
    fatigue_score = predict_fatigue(ctx.fatigue_context)
    segment = evaluate_segment(ctx.segment_context)
    
    # 1. Identify best channel
    best_channel = ctx.preferred_channel
    override_suppression = False
    
    # Logic: if fatigue is high but cart is huge, we override and send an SMS/WhatsApp
    if fatigue_score > 80:
        if conv_prob > 85:
            override_suppression = True
            best_channel = "SMS" # Keep it brief
        else:
            best_channel = "Hold (Do Not Send)"
            
    # Logic: if no whatsapp consent, fallback to SMS
    if best_channel == "WhatsApp" and not ctx.whatsapp_opt_in:
        best_channel = "SMS" if ctx.sms_opt_in else "Email"
        
    # 2. Timing
    timing = "Immediate (Real-time)"
    if fatigue_score > 60 and not override_suppression:
        timing = "Delay 2 Hours"
    if best_channel == "Hold (Do Not Send)":
        timing = "N/A"
        
    # 3. Tone
    tone = "Educational/Soft"
    if "VIP" in segment:
        tone = "Premium Reassurance"
    elif "Discount" in segment:
        tone = "Urgent/Incentivized"
        
    # 4. Uplift projection
    uplift = round((conv_prob * 0.15) - (fatigue_score * 0.05), 1)
    if best_channel == "Hold (Do Not Send)":
        uplift = 0.0
        
    confidence = round(98.0 - (fatigue_score * 0.2), 1)

    # 5. Explainability
    explainability = generate_explainability(ctx, conv_prob, fatigue_score, segment, best_channel)

    return {
        "best_channel": best_channel,
        "best_timing": timing,
        "tone": tone,
        "expected_uplift": uplift,
        "confidence": confidence,
        "override_suppression": override_suppression,
        "segment": segment,
        "conversion_probability": conv_prob,
        "fatigue_risk": fatigue_score,
        "explainability": explainability
    }
