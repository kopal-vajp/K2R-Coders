import os
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

def train_segmentation_model():
    print("Starting Segmentation Model Training (KMeans)...")
    
    # 1. Load Data
    processed_dir = os.path.join("datasets", "processed")
    data_path = os.path.join(processed_dir, "segmentation_ready.csv")
    
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found. Run data ingestion first.")
        return
    
    df = pd.read_csv(data_path)
    
    # 2. Preprocessing
    # We remove customer_id for clustering
    features = ['avg_order_value', 'purchase_frequency', 'recency_days', 'category_affinity_score']
    X = df[features]
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # 3. Train KMeans Model
    kmeans = KMeans(n_clusters=4, random_state=42, n_init='auto')
    cluster_labels = kmeans.fit_predict(X_scaled)
    
    df['cluster'] = cluster_labels
    
    # 4. Assign Business-Friendly Labels
    # To do this systematically, we inspect cluster centroids
    centroids = pd.DataFrame(scaler.inverse_transform(kmeans.cluster_centers_), columns=features)
    print("\n--- Cluster Centroids ---")
    print(centroids)
    
    # Simple heuristic assignment (assuming standard patterns in typical e-commerce data)
    # High frequency, low recency -> Loyal Premium
    # High recency, low freq -> Hesitant Buyer
    # Normal freq, high category affinity -> Discount Seeker
    # The rest -> First Timer
    labels_map = {
        0: 'loyal_premium',
        1: 'first_timer',
        2: 'discount_seeker',
        3: 'hesitant_buyer'
    }
    
    df['business_label'] = df['cluster'].map(labels_map)
    print("\n--- Segment Distribution ---")
    print(df['business_label'].value_counts())
    
    # 6. Save Model & Encoders
    models_dir = os.path.join("backend", "models")
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, "segmentation.pkl")
    
    bundle = {
        'model': kmeans,
        'scaler': scaler,
        'labels_map': labels_map,
        'features': features
    }
    
    joblib.dump(bundle, model_path)
    print(f"\nModel and scaler successfully saved to {model_path}")

if __name__ == "__main__":
    train_segmentation_model()
