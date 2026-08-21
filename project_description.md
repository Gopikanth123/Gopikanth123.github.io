# Projects

> Architecture diagrams below are included only where they add real understanding —
> multi-component systems get a full production diagram; single-model or research
> projects are described in prose instead. Dashed sections mark work that was
> **designed/architected** rather than fully shipped, per the source project notes.
> Bracketed figures like `[ __ ]` are placeholders — fill in with actual counts
> before publishing; they are intentionally left blank rather than invented.

---## 1. Multi-Agent Real Estate AI Platform

**Tech Stack:**
`Python · LangChain · LangGraph · FastAPI · MCP · FAISS · Redis · LangSmith · AWS · Docker · WebSockets`

### Description

Built a **multi-agent real estate AI platform** with specialized Broker Assistant, Sales Assistant, and On-Call Broker Assistant agents supporting CRM operations, lead qualification, property discovery, and sales workflows.

- **Specialized Multi-Agent Ecosystem:** Built specialized agents (Broker Assistant, Sales Assistant, and On-Call Broker Assistant) orchestrated via LangGraph to handle distinct phases of buyer qualification, inventory matching, objection handling, and live conversation support.
- **MCP Business Tool Integrations:** Architected LangGraph-based agentic workflows with MCP integrations for CRM management, property search, scheduling, market analytics, and automated business operations.
- **RAG & Semantic Caching:** Implemented RAG and semantic matching using FAISS with Redis caching for objection handling, property recommendations, market intelligence, and conversational context.
- **PII Masking & Secure Tool Execution:** Implemented strict PII masking and schema-validated tool execution across agent workflows, isolating reasoning from execution and protecting sensitive client financial/personal data.
- **Live On-Call Assistance:** Developed real-time WebSocket-based on-call assistance streaming live transcripts and delivering low-latency context-aware recommendations, deployed on AWS with Docker and instrumented with LangSmith for end-to-end tracing.

### Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT INTERFACE                            │
│         Web Portal · CRM Console · Live On-Call Audio/Text Stream       │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │  WebSocket / REST
┌──────────────────────────────────▼──────────────────────────────────────┐
│        API GATEWAY  ·  FastAPI  ·  Auth  ·  PII Masking & Sanitization   │
│         Redacts sensitive client data before passing to agent layers     │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────────────────────┐
│               MULTI-AGENT ORCHESTRATION  ·  LangGraph                   │
│   Stateful graph routes intent across specialized sub-agents            │
│                                                                         │
│   ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────┐ │
│   │ Broker Assistant │  │ Sales Assistant  │  │ On-Call Broker Assist │ │
│   │ (CRM & Booking)  │  │ (Qualification)  │  │ (Live WebSocket Coach)│ │
│   └────────┬─────────┘  └────────┬─────────┘  └───────────┬───────────┘ │
└────────────┼─────────────────────┼────────────────────────┼─────────────┘
             │                     │                        │
┌────────────▼─────────────────────▼────────────────────────▼─────────────┐
│                    TOOL LAYER  ·  MCP + Pydantic Schemas                │
│   Controlled, typed tool execution boundary with permission checks      │
└────────────┬──────────────────────────────────────────────┬─────────────┘
             │                                              │
┌────────────▼─────────────────────┐          ┌─────────────▼─────────────┐
│   RETRIEVAL & KNOWLEDGE (RAG)    │          │   CRM & BUSINESS OPS      │
│  FAISS + OpenAI Embeddings       │          │  CRM Lead Operations      │
│  Property Search & Intelligence  │          │  Task & Campaign Engine   │
│  Objection-Handling Repository   │          │  Meeting Scheduling API   │
└────────────┬─────────────────────┘          └───────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────────────┐
│                     RESPONSE CACHE  ·  Redis                            │
│   Caches semantic retrieval matches & repeat objection handling queries │
└────────────┬────────────────────────────────────────────────────────────┘
             │  cache miss
┌────────────▼────────────────────────────────────────────────────────────┐
│                    LLM REASONING LAYER (PII-Safe Context)                │
│         Grounded context generation with strict safety guardrails        │
└────────────┬────────────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE & DEPLOYMENT                         │
│         Docker containers  ·  AWS Infrastructure  ·  FastAPI Async       │
│         WebSocket streaming layer for live on-call assistance           │
└────────────┬────────────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────────────┐
│         OBSERVABILITY  ·  LangSmith (cross-cutting, all layers)          │
│   Traces agent decisions, tool execution, retrieval hits, and latency   │
└─────────────────────────────────────────────────────────────────────────┘
```

Every arrow above is a validated, typed boundary — the LLM never calls a business
system directly, the cache sits in front of the LLM so hot queries never pay for
a fresh generation, and the real-time coaching path is decoupled from the
transactional CRM path so a slow CRM write never blocks a live conversation.

---

## 2. Agentic Development Environment

**Tech Stack:**
`Python · LangGraph · LangChain · MCP · FastMCP · FastAPI · WebSockets · Docker · Git · LangSmith · Multi-Agent Orchestration · Sandboxed Execution`

### Description

Built a **multi-agent autonomous software engineering platform** using LangGraph with specialized agents for task planning, repository analysis, code generation, review, testing, debugging, security validation, and execution.

- **Multi-Agent Orchestration:** Architected a hierarchical multi-agent workflow using LangGraph featuring a central Supervisor orchestrating specialized agents (Planner, Repository Analyst, Coder, Code Reviewer, Test Engineer, Debugger, and Security Agent).
- **MCP Tool Ecosystem:** Developed an extensible MCP tool layer enabling agents to perform controlled filesystem operations, execute Python scripts and shell commands, inspect git status/diff/commits, run test suites, and manage Docker containers.
- **Closed-Loop Coding & Recovery:** Implemented an automated test-and-debug loop where test failures or linter errors are analyzed by a Debugger agent to generate targeted fixes iteratively before human review.
- **Human-in-the-Loop Governance:** Designed granular security policies and approval gates with tool-level permissions, requiring explicit developer authorization for high-risk operations (e.g., file deletions, sensitive commands, container actions).
- **Sandboxed Execution:** Isolated code and test execution within Docker container environments with resource limits (CPU, memory, execution timeouts) and non-root boundaries.
- **Real-Time Streaming & Observability:** Integrated FastAPI and WebSockets to stream real-time agent execution status, terminal outputs, and approval requests to client interfaces, with end-to-end LangSmith tracing for full workflow visibility.

### Architecture

```text
                                 USER
                                   │
                                   ▼
                            ┌──────────────┐
                            │   FastAPI    │
                            │  WebSocket   │
                            └──────┬───────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Supervisor Agent  │
                         │   LangGraph       │
                         └─────────┬─────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
           Planner Agent    Repository Agent    Security Agent
                │                  │                  │
                └──────────────────┼──────────────────┘
                                   ▼
                             Coder Agent
                                   │
                                   ▼
                           Code Review Agent
                                   │
                                   ▼
                          Test Engineer Agent
                                   │
                            ┌──────┴──────┐
                            │             │
                          PASS           FAIL
                            │             │
                            │             ▼
                            │       Debugger Agent
                            │             │
                            │             ▼
                            │        Coder Agent
                            │             │
                            │             ▼
                            │        Test Again
                            │
                            ▼
                      Security Validation
                            │
                            ▼
                     Human Approval Gate
                            │
                            ▼
                    Docker Sandbox / Git
                            │
                            ▼
                       Final Result

Underlying Tool Layer:
┌────────────────────────────────────────────────────────────────────────┐
│                   MCP GATEWAY  (FastMCP)                                │
│   ┌────────────────┬────────────────┬────────────────┬───────────────┐ │
│   │   Filesystem   │   Shell / Git  │  Code / Test   │    Docker     │ │
│   │   Operations   │   Execution    │  Verification  │    Sandbox    │ │
│   └────────────────┴────────────────┴────────────────┴───────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
│
▼
OBSERVABILITY: LangSmith · Step-level tracing, tool latency, and token usage
```

---

## 3. Multilingual Educational RAG Platform

**Tech Stack:**
`Python · LangChain · LangGraph · FAISS · FastAPI · AWS · Redis · LangSmith · OpenAI Embeddings · Pydantic`

### Description

Developed a multilingual **RAG-based educational AI assistant** that enables
children, parents, and educators to discover relevant learning resources through
natural-language interaction.

- Built a document-grounded retrieval pipeline using embeddings and **FAISS
  vector search**.
- Implemented **LangGraph-based intent routing** for educational queries,
  resource discovery, translation, and pronunciation assistance.
- Added multilingual translation capabilities to improve accessibility.
- Integrated **text-to-speech** capabilities for pronunciation and accessibility.
- Indexed a knowledge base of **`[ __ ]` PDFs, `[ __ ]` text documents, and
  `[ __ ]` structured database records** (curriculum material, lesson notes,
  reference content) into the vector store — fill in actual figures before
  publishing.
- Built an **embedding update pipeline** that re-embeds new or modified source
  content and refreshes the FAISS index on a scheduled/triggered basis, so
  retrieval stays grounded in current material instead of a stale snapshot.
- **Cached frequent RAG lookups, translation results, and TTS outputs in Redis**,
  cutting repeated LLM/embedding calls and reducing response latency on common
  queries.
- **Instrumented the LangGraph intent router and downstream RAG / translation /
  TTS calls with LangSmith tracing**, giving per-step latency, retrieval quality,
  and failure visibility across both the query path and the analytics pipeline.
- Developed an automated **student analytics and reporting system** that
  processes conversations between students, parents, and coaches.
- Generated both short and detailed student performance summaries using
  LLM-based processing.
- Built structured API interfaces using FastAPI and Pydantic schema validation.
- Improved response time by approximately **40%** and increased engagement by
  approximately **35%**.
- Reduced manual student reporting effort by approximately **95%** through
  automated analytics generation.

### Architecture

**Query-time serving path:**

```text
┌────────────────────────────────────────────────────────────┐
│         CLIENT (Student / Parent / Educator query)           │
└───────────────────────────┬────────────────────────────────┘
                             │
┌───────────────────────────▼────────────────────────────────┐
│              FastAPI + Pydantic Request Layer                │
└───────────────────────────┬────────────────────────────────┘
                             │
┌───────────────────────────▼────────────────────────────────┐
│              LangGraph Intent Router                         │
└──────┬───────────────┬───────────────┬──────────────────────┘
       │               │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼───────┐
│  RAG Lookup  │ │ Translation │ │Text-to-Speech │
│  FAISS +     │ │             │ │ (pronunciation│
│  Embeddings  │ │             │ │  / access.)   │
└──────┬──────┘ └──────┬──────┘ └──────┬────────┘
       └───────────────┴───────────────┘
                       │
             ┌─────────▼─────────┐
             │  RESPONSE CACHE      │
             │  Redis                 │
             │  Caches repeated RAG,  │
             │  translation & TTS      │
             │  outputs                 │
             └─────────┬─────────┘
                       │ cache miss
              ┌────────▼────────┐
              │   LLM Response    │
              └────────────────────┘

── Parallel analytics pipeline ──────────────────────────────
Conversations (student / parent / coach)
      │
Chunking & Processing
      │
LLM Summarization (short + detailed)
      │
Automated Performance Reports

┌───────────────────────────────────────────────────────────────┐
│      OBSERVABILITY  ·  LangSmith (cross-cutting, all layers)     │
│  Traces intent routing, retrieval quality, translation/TTS calls,│
│  cache hit/miss, and summarization — latency + failure visibility│
│  across both the query path and the analytics pipeline            │
└───────────────────────────────────────────────────────────────┘
```

**Ingestion & embedding-update path** (keeps the vector store current):

```text
┌───────────────────────────────────────────────────────────┐
│                      SOURCE CONTENT                           │
│   PDFs · Text Files · Structured DB Records (curriculum,       │
│   lesson notes, reference material)                             │
│   Indexed scale: [ __ ] PDFs · [ __ ] text docs · [ __ ] DB      │
│   records — update with actual figures                           │
└───────────────────────────┬─────────────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Parsing & Chunking    │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Embedding Generation   │
                  │  (OpenAI Embeddings)     │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │   FAISS Vector Store    │◀── incremental re-embed
                  └──────────┬──────────┘    on new/changed content
                             │                 (scheduled or event-
                  ┌──────────▼──────────┐      triggered job)
                  │  Available for RAG      │
                  │  Lookup at query time   │
                  └─────────────────────────┘
```

---

## 4. LLM Wiki — Structured Knowledge Retrieval for RAG

**Tech Stack:**
`Python · Markdown · YAML · BM25 · TF-IDF · Information Retrieval · RAG · LLMs · NLP · Hybrid Search`

### Description

Designed an **LLM Wiki-based knowledge retrieval architecture** that organizes
domain knowledge into self-contained, topic-centric Markdown pages instead of
relying exclusively on conventional embedding-based chunk retrieval.

- Designed a knowledge organization system where each Markdown page represents a
  **complete, self-contained topic or concept**.
- Added structured **YAML frontmatter** containing metadata such as keywords,
  topics, relationships, and related resources.
- Designed an offline indexing pipeline that transforms source documents into
  structured wiki pages and searchable indexes.
- Implemented **BM25 / TF-IDF keyword retrieval** for identifying relevant
  knowledge pages.
- Explored hybrid retrieval approaches combining keyword-based retrieval with
  semantic search when required.
- Designed query processing where user questions are matched against the
  knowledge index and relevant complete wiki pages are retrieved as LLM context.
- Reduced dependency on conventional chunk-based retrieval and minimized context
  fragmentation.
- Added cross-references between knowledge pages to support follow-up retrieval.
- Compared the architecture with **knowledge-graph-based retrieval and Vector
  DB-based RAG** approaches.

*This is an indexing/retrieval architecture exploration rather than a live,
repeatedly-queried production service, so caching and tracing infrastructure
weren't part of its scope — unlike the three agent/RAG systems above.*

### Architecture

```text
┌──────────────────┐        offline        ┌────────────────────┐
│ Source Documents  │ ──────indexing──────▶ │ Structured Wiki     │
└──────────────────┘                        │ Pages + YAML Meta    │
                                             └──────────┬──────────┘
                                                        │
                                             ┌──────────▼──────────┐
                                             │  BM25 / TF-IDF Index  │
                                             └──────────┬──────────┘
                                                        │
┌──────────────────┐                                   │
│    User Query      │──────────────────────────────────┤
└──────────────────┘                                   │
                                             ┌──────────▼──────────┐
                                             │ Relevant Wiki Pages   │
                                             │ (complete, not chunks)│
                                             └──────────┬──────────┘
                                                        │
                                             ┌──────────▼──────────┐
                                             │        LLM             │
                                             └──────────┬──────────┘
                                                        │
                                             ┌──────────▼──────────┐
                                             │  Grounded Answer       │
                                             └───────────────────────┘
```

**Key characteristics:** self-contained knowledge pages · human-readable and
editable · YAML-based metadata · BM25/TF-IDF retrieval · hybrid search support ·
cross-referenced knowledge · no mandatory embedding pipeline · explainable
retrieval.

---

## 5. OKF — Open Knowledge Framework for Graph-Based RAG

**Tech Stack:**
`Python · Knowledge Graphs · Entity-Relationship Modeling · Graph Traversal · RAG · Information Retrieval · LLMs · Structured Knowledge · YAML`

### Description

Designed and explored an **Open Knowledge Framework (OKF)** for representing
domain knowledge as an entity-relation knowledge graph rather than relying
solely on embedding-based retrieval.

- Designed a structured knowledge representation model around **entities,
  concepts, and explicit relationships**.
- Designed typed relationships between knowledge entities to support precise
  retrieval and multi-hop reasoning.
- Implemented a retrieval approach combining **keyword matching with graph
  traversal**.
- Designed graph-based retrieval to gather connected context across related
  entities.
- Explored graph-enriched context generation for LLM applications where
  relationships between concepts are critical.
- Designed the architecture without requiring embeddings for the core graph
  retrieval workflow.
- Compared OKF-based retrieval against **LLM Wiki and Vector DB-based RAG**
  architectures.

### Architecture

```text
┌──────────────────┐
│ Source Knowledge   │
└─────────┬─────────┘
          │
┌─────────▼─────────┐      ┌──────────────────────┐
│ Entity Extraction   │────▶│ Relationship Definition│
└─────────┬─────────┘      └───────────┬────────────┘
          │                            │
          └────────────┬───────────────┘
                        │
              ┌─────────▼─────────┐
              │   Knowledge Graph   │
              └─────────┬─────────┘
                        │
┌──────────────┐        │
│  User Query    │────────┤
└──────────────┘        │
              ┌─────────▼─────────┐
              │ Entity / Keyword    │
              │ Matching             │
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │  Graph Traversal     │
              │  (multi-hop)          │
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │  Connected Context   │
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │        LLM            │
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │  Grounded Answer      │
              └───────────────────────┘
```

**Key characteristics:** entity-based representation · explicit typed
relationships · graph traversal · multi-hop retrieval · relationship-aware
context · no mandatory embedding requirement.

---

## 6. Customer Lifetime Value Prediction Pipeline

**Tech Stack:**
`Python · LightGBM · GCP · BigQuery · Cloud Functions · Cloud Storage · Pandas · NumPy · Joblib · Machine Learning · Event-Driven Architecture`

### Description

Built an automated **event-driven machine learning pipeline** for predicting
customer lifetime value across multiple forecasting horizons.

- Designed a cloud-native pipeline for processing acquisition and behavioral data.
- Generated LTV predictions across **30-day, 90-day, 180-day, and 13-month
  horizons**.
- Developed a hybrid **LightGBM classification + regression architecture** —
  classification estimates payment probability, regression estimates expected
  revenue.
- Combined classification and regression outputs to generate long-term revenue
  forecasts.
- Addressed long-horizon prediction challenges including forecast drift and
  recurring revenue patterns.
- Integrated GCP services including **BigQuery, Cloud Functions, and Cloud
  Storage**; used Joblib for model serialization.
- Maintained forecast calibration within approximately **90–110%** across
  multiple prediction horizons.

### Architecture

```text
┌───────────────────────────────────────────────────────┐
│      Acquisition + Behavioral Event Data (GCP)          │
└───────────────────────────┬─────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │    BigQuery       │  data processing
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Cloud Functions   │  event-driven trigger
                    └────────┬────────┘
                             │
             ┌───────────────┴───────────────┐
   ┌─────────▼─────────┐          ┌─────────▼─────────┐
   │ LightGBM Classifier │          │ LightGBM Regressor  │
   │ (payment probability)│          │ (expected revenue)   │
   └─────────┬─────────┘          └─────────┬─────────┘
             └───────────────┬───────────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Combined LTV Model    │
                  │ 30d · 90d · 180d · 13mo │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │   Cloud Storage         │  model artifacts (Joblib)
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Calibration Monitor    │  target band: 90–110%
                  └─────────────────────────┘
```

---

## 7. ERCOT Energy Market Forecasting

**Tech Stack:**
`Python · CatBoost · Scikit-learn · Pandas · NumPy · PyArrow · Joblib · Time-Series Forecasting · Feature Engineering · ML Pipelines`

### Description

Developed end-to-end **machine-learning forecasting pipelines for wholesale
electricity markets**, focusing on ancillary services and energy storage
resource bidding behavior.

- Built automated pipelines to process raw **5-minute telemetry data** into
  hourly forecasting datasets.
- Implemented data cleaning, resource qualification, aggregation, and temporal
  feature engineering.
- Developed forecasting systems for **hourly Price/MW offer curves** and
  **14-segment energy storage bid curves**.
- Developed staged **CatBoost regression and classification models**.
- Implemented recursive out-of-sample forecasting and timeline-aware lookbacks.
- Added **monotonicity constraints and boundary validation** to keep curves
  physically and financially valid.
- Used **MAE-based evaluation** to measure forecasting performance per resource.

### Architecture

```text
┌──────────────────────────────────────────────────┐
│      Raw 5-Minute SCED Telemetry                    │
└───────────────────────────┬────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │ Cleaning + Resource     │
                  │ Qualification            │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │ Hourly Aggregation       │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │ Temporal / Lag           │
                  │ Feature Engineering       │
                  └──────────┬──────────┘
                             │
             ┌───────────────┴───────────────┐
   ┌─────────▼─────────┐          ┌─────────▼─────────┐
   │ CatBoost Boundary    │          │ CatBoost Curve       │
   │ Classification        │          │ Regression (14-seg)   │
   └─────────┬─────────┘          └─────────┬─────────┘
             └───────────────┬───────────────┘
                             │
                  ┌──────────▼──────────┐
                  │ Recursive Out-of-        │
                  │ Sample Forecasting        │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │ Monotonicity +           │
                  │ Boundary Validation       │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Valid Bid Curve Output   │
                  │  (MAE-evaluated)           │
                  └───────────────────────────┘
```

---

## 8. Forecasting Model Benchmarking & Evaluation

**Tech Stack:**
`Python · FOUNT SDK · CatBoost · Pandas · Scikit-learn · Time-Series Forecasting · Model Evaluation · MAE · Feature Engineering`

### Description

Developed a systematic **forecasting model benchmarking framework** to evaluate
automated forecasting approaches against a custom domain-specific
machine-learning pipeline.

- Worked with **14-segment Price/MW bid curves**.
- Performed strict time-based out-of-sample evaluation over a **168-hour /
  7-day forecasting horizon**.
- Compared automated forecasting outputs against a custom CatBoost baseline.
- Used **MAE** as a primary accuracy metric and evaluated bid-curve
  monotonicity.
- Analyzed model performance across individual bid-curve segments rather than
  aggregate metrics alone.
- Designed evaluation workflows that preserve temporal ordering and avoid data
  leakage.

### Architecture

```text
┌───────────────────────────────────────────────┐
│           Historical Bid-Curve Data              │
└───────────────────┬─────────────┬────────────────┘
                     │             │
         ┌───────────▼─┐   ┌──────▼────────┐
         │ Custom          │   │ FOUNT SDK       │
         │ CatBoost         │   │ Automated        │
         │ Baseline         │   │ Forecasting       │
         └───────────┬─┘   └──────┬────────┘
                     │             │
             ┌───────▼─────────────▼───────┐
             │ Time-Aware Out-of-Sample       │
             │ Split (168h / 7-day)            │
             └────────────┬─────────────────┘
                          │
             ┌────────────▼─────────────┐
             │ MAE + Monotonicity           │
             │ Evaluation                    │
             └────────────┬─────────────┘
                          │
             ┌────────────▼─────────────┐
             │ Comparative Accuracy /       │
             │ Stability Report              │
             └───────────────────────────────┘
```

---

## 9. Customer Churn Prediction System

**Tech Stack:**
`Python · XGBoost · Databricks · PySpark · Pandas · Scikit-learn · SQL · Machine Learning · Classification · Time-Based Validation`

### Description

Developed a **customer churn prediction system** using policy, claims, payment,
and behavioral data to identify customers at high risk of cancellation.

- Performed feature engineering across policy, claims, payment, and behavioral
  datasets.
- Implemented **time-based validation** with rolling windows to simulate
  real-world deployment.
- Addressed severe **class imbalance** in the churn prediction problem.
- Developed an XGBoost classification model for identifying high-risk customers.
- Focused evaluation on minority-class performance, achieving approximately
  **60% recall on the churn class**.
- Designed the output to support proactive retention and targeted intervention.

### Architecture

```text
┌────────────────────────────────────────────────┐
│  Policy · Claims · Payment · Behavioral Data       │
│              (Databricks / PySpark)                 │
└───────────────────────┬──────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │ Feature Engineering     │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ Time-Based / Rolling     │
              │ Validation Split          │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ XGBoost Classifier        │
              │ (class-imbalance          │
              │  handling)                 │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ Recall-Focused Eval        │
              │  (~60% churn recall)        │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ Retention Trigger Output    │
              └─────────────────────────────┘
```

---

## 10. Smart Glasses with Voice Assistance & GPS

**Type:**
`IEEE Research Publication · IEEE ICECCC 2025 · DOI: 10.1109/ICECCC65144.2025.11064275`

**Tech Stack:**
`Raspberry Pi · Python · Computer Vision · Object Detection · OCR · Ultrasonic Sensors · GPS Tracking · Speech Recognition · Text-to-Speech (TTS) · Edge Computing · Assistive Technology · IoT`

### Description

Developed an intelligent wearable **smart-glasses system with embedded AI voice assistance, multi-sensor perception, and GPS tracking** to facilitate independent mobility, situational awareness, and safety for visually impaired individuals. Published in the proceedings of **IEEE ICECCC 2025** ([IEEE Xplore: 11064275](https://doi.org/10.1109/ICECCC65144.2025.11064275)).

- **Real-Time Obstacle Detection & Avoidance:** Utilized an ultrasonic sensor array integrated into the frame to continuously scan forward surroundings, alerting users to physical hazards, low-hanging obstacles, and terrain changes across indoor rooms, public transport, and city streets.
- **Computer Vision Object Recognition:** Integrated an on-frame camera module running lightweight object detection algorithms to identify and classify surrounding objects (doors, stairs, vehicles, obstacles) with low latency.
- **Optical Character Recognition (OCR):** Implemented an on-device text-extraction pipeline that converts images of street signs, room notices, product labels, and printed documents into synthesized speech.
- **GPS Navigation & Location Tracking:** Integrated a GPS tracking receiver providing live geo-location monitoring for safety and delivering audio-guided turn-by-turn navigation.
- **Intuitive AI Voice Assistance:** Created a hands-free conversational interface using speech recognition and text-to-speech (TTS) synthesis, allowing users to query surroundings, request directions, and receive auditory guidance naturally.
- **Embedded Edge Computing:** Built on a Raspberry Pi controller interfacing with hardware peripherals, managing concurrent sensor streams and delivering instant auditory feedback without constant cloud dependence.

### System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      MULTI-MODAL SENSORY INPUT LAYER                    │
│   ┌────────────────┬────────────────┬────────────────┬────────────────┐ │
│   │   Ultrasonic   │  Camera Module │  GPS Receiver  │   Microphone   │ │
│   │ Sensor Array   │  (Visual Feed) │ (Location/Geo) │ (Voice Input)  │ │
│   └───────┬────────┴────────┬───────┴────────┬───────┴────────┬───────┘ │
└───────────┼─────────────────┼────────────────┼────────────────┼─────────┘
            │                 │                │                │
┌───────────▼─────────────────▼────────────────▼────────────────▼─────────┐
│              EDGE COMPUTING CONTROLLER  ·  Raspberry Pi                  │
│       Multithreaded sensor acquisition, preprocessing, and timing       │
└───────────┬─────────────────┬────────────────┬────────────────┬─────────┘
            │                 │                │                │
┌───────────▼────────┐ ┌──────▼───────┐ ┌──────▼──────┐ ┌──────▼────────┐
│  OBSTACLE SENSING  │ │    OBJECT    │ │  OCR TEXT   │ │     GPS       │
│  Proximity check   │ │  DETECTION   │ │ EXTRACTION  │ │  NAVIGATION   │
│  & collision-risk  │ │  Landmark &  │ │ Sign, label │ │ Geo-tracking  │
│  range estimation  │ │  object ID   │ │  & doc OCR  │ │ & route guide │
└───────────┬────────┘ └──────┬───────┘ └──────┬──────┘ └──────┬────────┘
            │                 │                │               │
┌───────────▼─────────────────▼────────────────▼───────────────▼──────────┐
│              AI VOICE ASSISTANT & DIALOGUE MANAGEMENT                   │
│   Speech-to-Text (STT) · Intent Understanding · Context Prioritization │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                    SYNTHESIS & OUTPUT FEEDBACK LAYER                    │
│   Text-to-Speech (TTS) Engine · Real-Time Audio Navigation & Alerts     │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
┌───────────────────▼───────────────────┐ ┌───────────▼───────────────────┐
│        USER AUDITORY FEEDBACK         │ │     CAREGIVER / SAFETY LINK   │
│  Earphones / Bone-Conduction Headset  │ │   Remote GPS Telemetry Alert  │
└───────────────────────────────────────┘ └───────────────────────────────┘
```

---

# Project Categories

## 🤖 Agentic AI & Generative AI
- Multi-Agent Real Estate AI Platform
- Agentic Development Environment
- Multilingual Educational RAG Platform

## 🧠 RAG & Knowledge Engineering
- LLM Wiki — Structured Knowledge Retrieval
- OKF — Open Knowledge Framework
- Multilingual Educational RAG Platform

## 📊 Machine Learning & Predictive Analytics
- Customer Lifetime Value Prediction Pipeline
- Customer Churn Prediction System

## ⚡ Time-Series & Forecasting
- ERCOT Energy Market Forecasting
- Forecasting Model Benchmarking & Evaluation

## 🔬 AI Research & Innovation
- Smart Glasses with Voice Assistance & GPS (IEEE ICECCC 2025)
- LLM Wiki Retrieval Architecture
- OKF Knowledge Graph Architecture