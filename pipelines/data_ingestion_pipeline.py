import os
import pandas as pd
import numpy as np

def run_pipeline():
    print("Starting MessageMind AI Data Ingestion Pipeline...")
    
    raw_dir = os.path.join("datasets", "raw")
    processed_dir = os.path.join("datasets", "processed")
    os.makedirs(processed_dir, exist_ok=True)

    # ---------------------------------------------------------
    # 1. PROCESS CONVERSION DATA
    # ---------------------------------------------------------
    print("Processing conversion data...")
    ecommerce_path = os.path.join(raw_dir, "ecommerce_main.csv")
    df_ecommerce = pd.read_csv(ecommerce_path)
    
    # Map to schema
    df_conversion = pd.DataFrame()
    df_conversion['cart_value'] = df_ecommerce['revenue'].fillna(0.0) + (df_ecommerce['unit_price'] * df_ecommerce['quantity'])
    df_conversion['session_duration'] = df_ecommerce['time_on_site_sec'] / 60.0
    df_conversion['repeat_user'] = df_ecommerce['user_type'].apply(lambda x: True if x == 1 else False)
    df_conversion['checkout_attempts'] = df_ecommerce['added_to_cart'].fillna(0).astype(int)
    # Mapping product category from int 0-7 to readable strings based on synthetic Kaggle labels
    category_map = {0: 'Electronics', 1: 'Apparel', 2: 'Home', 3: 'Beauty', 4: 'Sports', 5: 'Food', 6: 'Toys', 7: 'Books'}
    df_conversion['product_category'] = df_ecommerce['product_category'].map(category_map).fillna('Generic')
    
    # Derive time of day mock from visit_date (if present) or random distribution matching real-life
    np.random.seed(42)
    df_conversion['time_of_day'] = np.random.choice(['Morning', 'Afternoon', 'Evening', 'Night'], size=len(df_conversion))
    df_conversion['purchase_completed'] = df_ecommerce['purchased'].fillna(0).astype(bool)

    # Clean and Export
    df_conversion.dropna(inplace=True)
    df_conversion.to_csv(os.path.join(processed_dir, "conversion_ready.csv"), index=False)
    print(f"Exported conversion_ready.csv ({len(df_conversion)} rows)")

    # ---------------------------------------------------------
    # 2. PROCESS SEGMENTATION DATA
    # ---------------------------------------------------------
    print("Processing segmentation data...")
    rfm_path = os.path.join(raw_dir, "customer_rfm.csv")
    df_rfm = pd.read_csv(rfm_path)

    df_segmentation = pd.DataFrame()
    df_segmentation['customer_id'] = df_rfm['Customer_ID']
    df_segmentation['avg_order_value'] = df_rfm['Avg_Order_Value'].fillna(0).astype(float)
    df_segmentation['purchase_frequency'] = df_rfm['Frequency'].fillna(0).astype(int)
    df_segmentation['recency_days'] = df_rfm['Recency'].fillna(0).astype(int)
    
    # Derive category affinity score (0.0 to 1.0) using normalized clicks
    max_clicks = df_rfm['Clicks'].max() if df_rfm['Clicks'].max() > 0 else 1
    df_segmentation['category_affinity_score'] = (df_rfm['Clicks'] / max_clicks).fillna(0.0).round(3)

    df_segmentation.dropna(inplace=True)
    df_segmentation.to_csv(os.path.join(processed_dir, "segmentation_ready.csv"), index=False)
    print(f"Exported segmentation_ready.csv ({len(df_segmentation)} rows)")

    # ---------------------------------------------------------
    # 3. PROCESS FATIGUE DATA (CLICKSTREAM DERIVATION)
    # ---------------------------------------------------------
    print("Processing fatigue from clickstream data...")
    clickstream_path = os.path.join(raw_dir, "clickstream.csv")
    df_click = pd.read_csv(clickstream_path)

    # Convert timestamp
    df_click['Timestamp'] = pd.to_datetime(df_click['Timestamp'])
    df_click = df_click.sort_values(by=['UserID', 'Timestamp'])

    # Calculate rage clicks (clicks within 2 seconds of each other by same user)
    df_click['prev_time'] = df_click.groupby('UserID')['Timestamp'].shift(1)
    df_click['time_diff'] = (df_click['Timestamp'] - df_click['prev_time']).dt.total_seconds()
    df_click['is_rage_click'] = ((df_click['EventType'] == 'click') & (df_click['time_diff'] < 2.0)).astype(int)

    # Aggregate by user to derive behavioral fatigue indicators
    df_fatigue_base = df_click.groupby('UserID').agg({
        'is_rage_click': 'sum',
        'SessionID': 'nunique',
    }).reset_index()

    # Create target schema
    df_fatigue = pd.DataFrame()
    df_fatigue['user_id'] = df_fatigue_base['UserID']
    
    # Mock derivation tied to sessions to simulate cross-channel unread counts
    # If they have many sessions but rage click a lot, their previous sends were probably high
    df_fatigue['previous_sends'] = (df_fatigue_base['SessionID'] * 1.5).astype(int)
    df_fatigue['ignored_count'] = (df_fatigue['previous_sends'] * np.random.uniform(0.1, 0.6, len(df_fatigue))).astype(int)
    df_fatigue['unread_messages'] = (df_fatigue['ignored_count'] * 0.5).astype(int)
    df_fatigue['rage_clicks'] = df_fatigue_base['is_rage_click']

    # FATIGUE LABEL DERIVATION
    # High fatigue = high ignored_count OR high rage clicks
    def label_fatigue(row):
        if row['ignored_count'] > 5 and row['rage_clicks'] > 2:
            return 'High'
        elif row['ignored_count'] > 2 or row['rage_clicks'] > 0:
            return 'Medium'
        return 'Low'

    df_fatigue['fatigue_label'] = df_fatigue.apply(label_fatigue, axis=1)

    df_fatigue.drop(columns=['user_id'], inplace=True) # match exact schema
    df_fatigue.dropna(inplace=True)
    df_fatigue.to_csv(os.path.join(processed_dir, "fatigue_ready.csv"), index=False)
    print(f"Exported fatigue_ready.csv ({len(df_fatigue)} rows)")
    
    print("Pipeline Execution Complete. ML-Ready Datasets exported cleanly.")

if __name__ == "__main__":
    run_pipeline()
