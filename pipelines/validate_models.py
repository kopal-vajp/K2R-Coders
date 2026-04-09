import os
import joblib

def validate():
    models_dir = os.path.join("backend", "models")
    
    # 1. Validate Conversion Model
    conv_path = os.path.join(models_dir, "conversion.pkl")
    if os.path.exists(conv_path):
        print(f"Loading {conv_path}...")
        bundle = joblib.load(conv_path)
        model = bundle['model']
        le_cat = bundle['le_category']
        print("Conversion model loaded successfully.")
    else:
        print("Conversion model missing.")
        
    # 2. Validate Fatigue Model
    fat_path = os.path.join(models_dir, "fatigue.pkl")
    if os.path.exists(fat_path):
        print(f"Loading {fat_path}...")
        bundle = joblib.load(fat_path)
        model = bundle['model']
        le_fatigue = bundle['le_fatigue']
        print("Fatigue model loaded successfully.")
    else:
        print("Fatigue model missing.")
        
    # 3. Validate Segmentation Model
    seg_path = os.path.join(models_dir, "segmentation.pkl")
    if os.path.exists(seg_path):
        print(f"Loading {seg_path}...")
        bundle = joblib.load(seg_path)
        model = bundle['model']
        scaler = bundle['scaler']
        print("Segmentation model loaded successfully.")
    else:
        print("Segmentation model missing.")
        
if __name__ == "__main__":
    validate()
