import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, precision_score, recall_score

def train_fatigue_model():
    print("Starting Fatigue Model Training (RandomForest)...")
    
    # 1. Load Data
    processed_dir = os.path.join("datasets", "processed")
    data_path = os.path.join(processed_dir, "fatigue_ready.csv")
    
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found. Run data ingestion first.")
        return
    
    df = pd.read_csv(data_path)
    
    # 2. Preprocessing
    # Features
    X = df[['previous_sends', 'ignored_count', 'unread_messages', 'rage_clicks']]
    
    # Target
    y = df['fatigue_label'].astype(str)
    
    le_fatigue = LabelEncoder()
    y_encoded = le_fatigue.fit_transform(y)
    
    print("Class Balance:")
    print(df['fatigue_label'].value_counts())
    
    # 3. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)
    
    print(f"\nTraining set size: {len(X_train)} | Test set size: {len(X_test)}")
    
    # 4. Train Model
    model = RandomForestClassifier(n_estimators=100, max_depth=7, random_state=42, class_weight='balanced')
    model.fit(X_train, y_train)
    
    # 5. Evaluate Model
    y_pred = model.predict(X_test)
    
    cm = confusion_matrix(y_test, y_pred)
    
    print("\n--- Evaluation Metrics ---")
    print("Confusion Matrix:")
    print(cm)
    print("Classification Report:")
    print(classification_report(y_test, y_pred, target_names=le_fatigue.classes_))
    
    # Feature Importance
    print("\n--- Feature Importance ---")
    feat_imps = pd.DataFrame({
        'Feature': X.columns,
        'Importance': model.feature_importances_
    }).sort_values(by='Importance', ascending=False)
    print(feat_imps)
    
    # 6. Save Model & Encoders
    models_dir = os.path.join("backend", "models")
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, "fatigue.pkl")
    
    bundle = {
        'model': model,
        'le_fatigue': le_fatigue,
        'features': list(X.columns)
    }
    
    joblib.dump(bundle, model_path)
    print(f"\nModel and encoders successfully saved to {model_path}")

if __name__ == "__main__":
    train_fatigue_model()
