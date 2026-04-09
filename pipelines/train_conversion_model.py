import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import roc_auc_score, confusion_matrix, classification_report
import xgboost as xgb

def train_conversion_model():
    print("Starting Conversion Model Training (XGBoost)...")
    
    # 1. Load Data
    processed_dir = os.path.join("datasets", "processed")
    data_path = os.path.join(processed_dir, "conversion_ready.csv")
    
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found. Run data ingestion first.")
        return
    
    df = pd.read_csv(data_path)
    
    # 2. Preprocessing
    # Target
    y = df['purchase_completed'].astype(int)
    
    # Features
    X = df.drop(columns=['purchase_completed'])
    
    # Encode categorical columns
    le_category = LabelEncoder()
    # Handle rare unseen categories by making sure we encode on the full current dataset
    X['product_category'] = le_category.fit_transform(X['product_category'].astype(str))
    
    le_time = LabelEncoder()
    X['time_of_day'] = le_time.fit_transform(X['time_of_day'].astype(str))
    
    X['repeat_user'] = X['repeat_user'].astype(int)
    
    # 3. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print(f"Training set size: {len(X_train)} | Test set size: {len(X_test)}")
    
    # 4. Train Model
    model = xgb.XGBClassifier(
        n_estimators=100, 
        learning_rate=0.1, 
        max_depth=5, 
        use_label_encoder=False, 
        eval_metric='logloss',
        random_state=42
    )
    
    model.fit(X_train, y_train)
    
    # 5. Evaluate Model
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    roc_auc = roc_auc_score(y_test, y_prob)
    cm = confusion_matrix(y_test, y_pred)
    
    print("\n--- Evaluation Metrics ---")
    print(f"ROC AUC Score: {roc_auc:.4f}")
    print("Confusion Matrix:")
    print(cm)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    
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
    
    model_path = os.path.join(models_dir, "conversion.pkl")
    
    # We bundle the model and the label encoders together so the backend can use them
    bundle = {
        'model': model,
        'le_category': le_category,
        'le_time': le_time,
        'features': list(X.columns)
    }
    
    joblib.dump(bundle, model_path)
    print(f"\nModel and encoders successfully saved to {model_path}")

if __name__ == "__main__":
    train_conversion_model()
