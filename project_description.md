# Projects

## 1. Multi-Agent Real Estate AI Platform

**Tech Stack:**  
`Python · LangChain · LangGraph · LLMs · RAG · FastAPI · MCP · FAISS · OpenAI Embeddings · Pydantic · WebSockets · AWS · Docker · CRM Integration`

### Description

Built an end-to-end **multi-agent AI platform for real-estate sales automation**, covering lead qualification, property discovery, recommendation, market intelligence, CRM automation, meeting scheduling, and real-time sales assistance.

- Designed multiple specialized AI agents for different stages of the sales workflow.
- Built a conversational lead qualification agent that progressively captures investment intent, budget, preferred location, property type, and layout.
- Implemented property recommendation workflows using user preferences and market intelligence.
- Integrated **RAG and semantic similarity-based objection handling** using an `Acknowledge → Reformulate → Answer` response workflow.
- Developed an AI assistant that enables CRM operations through natural-language interaction, reducing dependency on manual workflows.
- Automated workflows including lead management, property operations, task management, campaign activities, and meeting scheduling.
- Built a **real-time AI Sales Coach** that analyzes live conversation transcripts and provides context-aware responses, qualification questions, property recommendations, and market insights.
- Integrated **MCP-based structured tools** and Pydantic validation to separate LLM reasoning from actual tool execution.
- Designed reliable multi-step workflows capable of handling dynamic states, incomplete inputs, tool execution, and conversational context.
- Implemented asynchronous backend services and real-time communication using FastAPI and WebSockets.
- Containerized AI services using Docker and designed the system for cloud deployment.

---

## 2. Claude-Code-Style Personal Terminal AI Agent

**Tech Stack:**  
`Python · MCP · FastMCP · LangGraph · LLMs · Tool Calling · subprocess · psutil · AST · Git · Streamable HTTP · System Automation`

### Description

Built a **Claude-Code-style AI developer and system automation agent** that enables an LLM to interact directly with a local development environment through natural language.

- Developed an **MCP server** exposing system-level capabilities to an AI agent.
- Implemented file and directory operations including reading, writing, editing, copying, moving, deleting, searching, and metadata inspection.
- Added recursive workspace traversal and codebase search capabilities for locating files, source code, and project components.
- Implemented execution of **shell commands, Python code, and scripts** from the AI agent.
- Added system-level tools for CPU, memory, disk, process, network-port, environment-variable, and system-information monitoring.
- Designed the agent to inspect a workspace, understand project structure, modify files, execute code, and iterate based on execution results.
- Used MCP to create a standardized interface between the LLM and local system capabilities.
- Designed the architecture for advanced capabilities including **Git automation, background process management, filesystem watching, AST-based code intelligence, persistent memory, real-time streaming, human-in-the-loop approvals, project scaffolding, and automated boilerplate generation**.
- Designed the system as an **AI-native interface between natural language and the operating system/development environment**.
- Focused on building reusable tools that can be consumed by different LLM-based agents rather than tightly coupling capabilities to a single model.

---

## 3. Multilingual Educational RAG Platform

**Tech Stack:**  
`Python · LangChain · LangGraph · RAG · FAISS · FastAPI · Azure · OpenAI · Embeddings · Vector Search · NLP · Translation · Text-to-Speech · Pydantic`

### Description

Developed a multilingual **RAG-based educational AI assistant** that enables children, parents, and educators to discover relevant learning resources through natural-language interaction.

- Built a document-grounded retrieval pipeline using embeddings and **FAISS vector search**.
- Implemented **LangGraph-based intent routing** for educational queries, resource discovery, translation, and pronunciation assistance.
- Added multilingual translation capabilities to improve accessibility across different languages.
- Integrated **text-to-speech** capabilities for pronunciation and accessibility.
- Developed an automated **student analytics and reporting system** that processes conversations between students, parents, and coaches.
- Generated both short and detailed student performance summaries using LLM-based processing.
- Designed efficient chunking and processing workflows for scaling student analytics.
- Built structured API interfaces using FastAPI and Pydantic schema validation.
- Improved response time by approximately **40%** and increased engagement by approximately **35%**.
- Reduced manual student reporting effort by approximately **95%** through automated analytics generation.

---

## 4. LLM Wiki — Structured Knowledge Retrieval for RAG

**Tech Stack:**  
`Python · Markdown · YAML · BM25 · TF-IDF · Information Retrieval · RAG · LLMs · NLP · Hybrid Search`

### Description

Designed an **LLM Wiki-based knowledge retrieval architecture** that organizes domain knowledge into self-contained, topic-centric Markdown pages instead of relying exclusively on conventional embedding-based chunk retrieval.

- Designed a knowledge organization system where each Markdown page represents a **complete, self-contained topic or concept**.
- Added structured **YAML frontmatter** containing metadata such as keywords, topics, relationships, and related resources.
- Designed an offline indexing pipeline that transforms source documents into structured wiki pages and searchable indexes.
- Implemented **BM25 / TF-IDF keyword retrieval** for identifying relevant knowledge pages.
- Explored hybrid retrieval approaches combining keyword-based retrieval with semantic search when required.
- Designed query processing where user questions are matched against the knowledge index and relevant complete wiki pages are retrieved as LLM context.
- Reduced dependency on conventional chunk-based retrieval and minimized context fragmentation.
- Added cross-references between knowledge pages to support follow-up retrieval and navigation across related concepts.
- Focused on **human readability, explainability, maintainability, and context completeness**.
- Designed the architecture for curated technical and domain-specific knowledge bases.
- Compared the architecture with **knowledge-graph-based retrieval and Vector DB-based RAG** approaches.

### Retrieval Architecture

```text
Source Documents
      ↓
Structured Wiki Pages
      ↓
YAML Metadata
      ↓
BM25 / TF-IDF Index
      ↓
User Query
      ↓
Relevant Wiki Pages
      ↓
LLM
      ↓
Grounded Answer
````

### Key Characteristics

* Self-contained knowledge pages
* Human-readable and editable
* YAML-based metadata
* BM25 / TF-IDF retrieval
* Hybrid search support
* Cross-referenced knowledge
* No mandatory embedding pipeline
* Reduced chunk fragmentation
* Explainable retrieval

---

## 5. OKF — Open Knowledge Framework for Graph-Based RAG

**Tech Stack:**
`Python · Knowledge Graphs · Entity-Relationship Modeling · Graph Traversal · RAG · Information Retrieval · LLMs · Structured Knowledge · YAML`

### Description

Designed and explored an **Open Knowledge Framework (OKF)** for representing domain knowledge as an entity-relation knowledge graph rather than relying solely on embedding-based retrieval.

* Designed a structured knowledge representation model around **entities, concepts, and explicit relationships**.
* Represented knowledge using structured, human-readable data with metadata and relationship definitions.
* Designed typed relationships between knowledge entities to support precise retrieval and multi-hop reasoning.
* Implemented a retrieval approach combining **keyword matching with graph traversal**.
* Designed graph-based retrieval to gather connected context across related entities.
* Explored graph-enriched context generation for LLM applications where relationships between concepts are critical.
* Focused on **context quality, explainability, relationship-aware retrieval, and knowledge maintainability**.
* Designed the architecture without requiring embeddings for the core graph retrieval workflow.
* Explored applications where multi-hop reasoning is more important than simple semantic similarity.
* Compared OKF-based retrieval against **LLM Wiki and Vector DB-based RAG architectures**.

### Retrieval Architecture

```text
Source Knowledge
      ↓
Entity Extraction
      ↓
Relationship Definition
      ↓
Knowledge Graph
      ↓
User Query
      ↓
Entity / Keyword Matching
      ↓
Graph Traversal
      ↓
Connected Context
      ↓
LLM
      ↓
Grounded Answer
```

### Key Characteristics

* Entity-based knowledge representation
* Explicit typed relationships
* Knowledge graph structure
* Graph traversal
* Multi-hop retrieval
* Relationship-aware context
* High explainability
* No mandatory embedding requirement
* Structured and human-readable knowledge

---

## 6. Customer Lifetime Value Prediction Pipeline

**Tech Stack:**
`Python · LightGBM · GCP · BigQuery · Cloud Functions · Cloud Storage · Pandas · NumPy · Joblib · Machine Learning · Event-Driven Architecture`

### Description

Built an automated **event-driven machine learning pipeline** for predicting customer lifetime value across multiple forecasting horizons.

* Designed a cloud-native pipeline for processing acquisition and behavioral data.
* Generated LTV predictions across **30-day, 90-day, 180-day, and 13-month horizons**.
* Developed a hybrid **LightGBM classification + regression architecture**.
* Used classification to estimate payment probability and regression to estimate expected revenue.
* Combined classification and regression outputs to generate long-term revenue forecasts.
* Addressed long-horizon prediction challenges including **forecast drift and recurring revenue patterns**.
* Implemented automated data processing, model loading, prediction generation, and cloud execution.
* Integrated GCP services including **BigQuery, Cloud Functions, and Cloud Storage**.
* Used Joblib for model serialization and loading.
* Designed the pipeline for automated and repeatable forecasting workflows.
* Maintained forecast calibration within approximately **90–110% across multiple prediction horizons**.

---

## 7. ERCOT Energy Market Forecasting

**Tech Stack:**
`Python · CatBoost · Scikit-learn · Pandas · NumPy · PyArrow · Joblib · Time-Series Forecasting · Feature Engineering · ML Pipelines`

### Description

Developed end-to-end **machine-learning forecasting pipelines for wholesale electricity markets**, focusing on ancillary services and energy storage resource bidding behavior.

* Built automated pipelines to process raw **5-minute telemetry data** into hourly forecasting datasets.
* Implemented data cleaning, resource qualification, aggregation, and temporal feature engineering.
* Developed forecasting systems for **hourly Price/MW offer curves** across multiple ancillary services.
* Built forecasting models for **14-segment energy storage bid curves**.
* Implemented lag-based and temporal features for time-series prediction.
* Developed staged **CatBoost regression and classification models**.
* Implemented recursive out-of-sample forecasting and timeline-aware lookbacks.
* Added price/MW boundary classification for structured bid-curve prediction.
* Implemented **monotonicity constraints and boundary validation** to maintain physically and financially valid curves.
* Designed resource-level validation and production forecasting workflows using time-aware evaluation.
* Used **MAE-based evaluation** to measure forecasting performance across individual resources.
* Built reusable feature engineering and forecasting pipelines for production-oriented model execution.

---

## 8. Forecasting Model Benchmarking & Evaluation

**Tech Stack:**
`Python · FOUNT SDK · CatBoost · Pandas · Scikit-learn · Time-Series Forecasting · Model Evaluation · MAE · Feature Engineering`

### Description

Developed a systematic **forecasting model benchmarking framework** to evaluate automated forecasting approaches against a custom domain-specific machine-learning pipeline.

* Worked with **14-segment Price/MW bid curves**.
* Performed strict time-based out-of-sample evaluation over a **168-hour / 7-day forecasting horizon**.
* Compared automated forecasting outputs against a custom CatBoost forecasting baseline.
* Used **Mean Absolute Error (MAE)** as a primary accuracy metric.
* Evaluated **bid-curve monotonicity** to verify whether predicted curves followed required structural behavior.
* Analyzed model performance across individual bid-curve segments rather than relying only on aggregate metrics.
* Evaluated differences in accuracy, stability, and forecasting behavior between automated and custom-built approaches.
* Designed evaluation workflows that preserve temporal ordering and avoid data leakage.
* Provided practical insights into the trade-offs between **general-purpose automated forecasting and domain-specific ML pipelines**.

---

## 9. Customer Churn Prediction System

**Tech Stack:**
`Python · XGBoost · Databricks · PySpark · Pandas · Scikit-learn · SQL · Machine Learning · Classification · Time-Based Validation`

### Description

Developed a **customer churn prediction system** using policy, claims, payment, and behavioral data to identify customers at high risk of cancellation.

* Performed feature engineering across policy, claims, payment, and behavioral datasets.
* Implemented **time-based validation** to simulate real-world deployment scenarios.
* Used rolling validation windows to evaluate model stability over time.
* Addressed severe **class imbalance** in the churn prediction problem.
* Developed an XGBoost classification model for identifying high-risk customers.
* Focused evaluation on minority-class performance using recall and other classification metrics.
* Achieved approximately **60% recall on the churn class**.
* Designed the output to support early identification of high-risk customers.
* Built a workflow suitable for proactive retention and targeted intervention strategies.

---

## 10. Smart Glasses with Voice Assistance & GPS

**Type:**
`Final Year Project · IEEE Publication`

**Tech Stack:**
`Voice AI · GPS · Assistive Technology · Speech Processing · IoT · Wearable Computing · AI`

### Description

Developed an intelligent **assistive smart-glasses system for improving independent mobility and accessibility for visually impaired users**.

* Designed a wearable assistance system combining **voice interaction and GPS-based location awareness**.
* Enabled users to interact with the system through voice rather than relying on conventional visual interfaces.
* Designed the system to provide contextual assistance during navigation and movement.
* Integrated multiple components into a wearable assistive platform.
* Focused on **accessibility, navigation, hands-free interaction, and independent mobility**.
* Designed the project as a practical AI-enabled assistive technology solution.
* Combined AI-driven interaction with location-aware functionality to create a real-world accessibility application.
* The project was published at **IEEE ICECCC 2025** under the title:
  **“Smart Glasses with Voice Assistance and GPS for Independent Mobility of Blind People.”**

---

# Project Categories

## 🤖 Agentic AI & Generative AI

* Multi-Agent Real Estate AI Platform
* Claude-Code-Style Personal Terminal AI Agent
* Multilingual Educational RAG Platform

## 🧠 RAG & Knowledge Engineering

* LLM Wiki — Structured Knowledge Retrieval
* OKF — Open Knowledge Framework
* Multilingual Educational RAG Platform

## 📊 Machine Learning & Predictive Analytics

* Customer Lifetime Value Prediction Pipeline
* Customer Churn Prediction System

## ⚡ Time-Series & Forecasting

* ERCOT Energy Market Forecasting
* Forecasting Model Benchmarking & Evaluation

## 🔬 AI Research & Innovation

* Smart Glasses with Voice Assistance & GPS
* LLM Wiki Retrieval Architecture
* OKF Knowledge Graph Architecture
