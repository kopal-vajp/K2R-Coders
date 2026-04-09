# System Architecture Visuals

This document contains high-fidelity architecture diagrams showcasing the full-stack depth of MessageMind AI. These assets are designed for use in pitch decks and technical deep-dives.

---

## 1. End-to-End System Architecture
This diagram illustrates the flow from the Next.js frontend through the FastAPI Intelligence Core to the specialized ML models.

```mermaid
graph TD
    subgraph "Frontend Layer (Next.js 16.2)"
        UI["Direct Dashboard UI<br/>(Glassmorphism / React 19)"]
        WKS["AI Decision Engine<br/>(Interactive Preview)"]
        SIM["Omnichannel Simulator<br/>(Visual Tester)"]
    end

    subgraph "Intelligence Layer (FastAPI)"
        API["FastAPI App Core"]
        MDW["Latency Tracking Middleware<br/>(Sub-10ms Inference)"]
        RTR["Decision Router"]
    end

    subgraph "Machine Learning Intelligence"
        XGB["XGBoost Engine<br/>(Conversion Prediction)"]
        RF["RandomForest Engine<br/>(User Fatigue Analyst)"]
        KM["KMeans Segmentation<br/>(Behavioral Clustering)"]
    end

    subgraph "Infrastructure & Data"
        DB[("(JSON / CSV Storage)")]
        KGL["Kaggle Raw Datasets"]
    end

    %% Flow Connections
    UI --> API
    WKS --> API
    SIM --> API
    
    API --> MDW
    MDW --> RTR
    
    RTR --> XGB
    RTR --> RF
    RTR --> KM
    
    XGB -.-> DB
    RF -.-> DB
    KM -.-> DB
    DB -.-> KGL

    %% Styling
    style UI fill:#2D1B69,stroke:#00F5FF,stroke-width:2px,color:#fff
    style WKS fill:#2D1B69,stroke:#00F5FF,stroke-width:2px,color:#fff
    style SIM fill:#2D1B69,stroke:#00F5FF,stroke-width:2px,color:#fff
    style API fill:#1A103D,stroke:#00F5FF,stroke-width:3px,color:#fff
    style XGB fill:#4B0082,stroke:#00F5FF,stroke-width:1px,color:#fff
    style RF fill:#4B0082,stroke:#00F5FF,stroke-width:1px,color:#fff
    style KM fill:#4B0082,stroke:#00F5FF,stroke-width:1px,color:#fff
```

> [!TIP]
> **Pitch Positioning**: Emphasize the "Sub-10ms Inference" middleware. This proves that MessageMind AI is built for real-time edge decisioning, not just static reporting.

---

## 2. Omnichannel Routing Intelligence
How MessageMind AI decides which channel to use for a specific user persona.

```mermaid
sequenceDiagram
    participant U as User Event
    participant AI as AI Decision Engine
    participant ML as ML Model Bundle
    participant C as Channel Router

    U->>AI: Trigger Input (e.g. Abandoned Cart)
    AI->>ML: Fetch Conversion/Fatigue Scores
    ML-->>AI: { Conv: 88%, Fatigue: 12% }
    AI->>AI: Evaluate Optimal Channel
    alt Conv > 80% & Fatigue < 20%
        AI->>C: Push Notification (High Visibility)
    else Conv > 50%
        AI->>C: SMS (Medium Urgency)
    else
        AI->>C: Email (Low Intrusiveness)
    end
    C-->>U: Personalized Interaction Delivered
```

---

## 3. Privacy & Governance Lifecycle
Visual evidence of our "Privacy-By-Design" architecture.

```mermaid
flowchart LR
    RAW[[Raw Customer Data]] --> C{Consent Check}
    C -- No --> DROP[Record Dropped]
    C -- Yes --> AN[Anonymization Layer]
    AN --> STR[PII Stripping]
    STR --> ML((ML Intelligence))
    ML --> OUT{Optimized Decision}
    
    style RAW fill:#2A2A2A,color:#fff
    style ML fill:#2D1B69,stroke:#00F5FF,color:#fff
    style OUT fill:#1A103D,stroke:#00F5FF,color:#fff
    style STR fill:#4B0082,color:#fff
```

---

## Visual Branding Identity
When presenting these diagrams, align with the following MessageMind styles:
- **Primary Background**: `#0F0A1E` (Deep Space Purple)
- **Highligh Color**: `#00F5FF` (Neon Cyan)
- **Glassmorphism**: 15% opacity white overlays with 10px blur.
- **Typography**: Inter or Outfit (Clean, modern sans-serif).
