import time
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.services.model_loader import model_loader
from backend.schemas.customer import ConversionContext, FatigueContext, SegmentContext, DecisionContext
from backend.services.decision_engine import generate_omnichannel_decision, predict_conversion, predict_fatigue, evaluate_segment

def test_inference():
    print("Testing live inference with backend models...\n")
    
    # Since model_loader initializes on import, models should already be loaded.
    
    conv_ctx = ConversionContext(
        cart_value=150.0,
        repeat_user=True,
        checkout_attempts=1,
        session_duration=12
    )
    
    fat_ctx = FatigueContext(
        previous_sends=3,
        ignored_count=0,
        unread_messages=1,
        rage_clicks=0
    )
    
    seg_ctx = SegmentContext(
        avg_order_value=45.0,
        purchase_frequency=1,
        category_affinity="Apparel"
    )
    
    decision_ctx = DecisionContext(
        conversion_context=conv_ctx,
        fatigue_context=fat_ctx,
        segment_context=seg_ctx,
        preferred_channel="WhatsApp"
    )
    
    # Test Individual
    start = time.time()
    c_prob = predict_conversion(conv_ctx)
    print(f"Conversion Prediction: {c_prob}% (Time: {round((time.time()-start)*1000, 2)}ms)")
    
    start = time.time()
    f_score = predict_fatigue(fat_ctx)
    print(f"Fatigue Prediction: {f_score} (Time: {round((time.time()-start)*1000, 2)}ms)")
    
    start = time.time()
    s_label = evaluate_segment(seg_ctx)
    print(f"Segment Prediction: {s_label} (Time: {round((time.time()-start)*1000, 2)}ms)")
    
    # Test Master Decision
    print("\nExecuting Omnichannel Master Decision Engine...")
    start = time.time()
    decision = generate_omnichannel_decision(decision_ctx)
    latency = round((time.time()-start)*1000, 2)
    
    print(f"Master Engine Execution Time: {latency}ms\n")
    
    import json
    print(json.dumps(decision, indent=2))
    
    assert latency < 100, f"Latency too high: {latency}ms"
    print("\nValidation Successful: Sub-100ms ML inference achieved.")

if __name__ == "__main__":
    test_inference()
