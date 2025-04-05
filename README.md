# 💸 InvestSmartAI

**Team Name:** Market la Yaaru Mass?

InvestSmartAI is an AI-driven financial assistant that leverages stock price trends, sentiment analysis, and personalized financial profiling to help users make informed investment decisions.

---

## 🚀 Features

- 📈 **Stock Price Prediction** using LSTM + XGBoost hybrid models.
- 💬 **Sentiment Analysis** from financial news using FinBERT + LSTM.
- 🧠 **Personal Finance Recommender** using rule-based logic on income/expenses/risk appetite.
- 🔌 **FastAPI Backend** with real-time endpoints.
- 🌐 **Frontend** for visualizing predictions, sentiment trends, and personalized advice.

---

## 🧠 Backend – InvestSmartAI

Welcome to the **backend** of **InvestSmartAI** – an AI-powered stock market forecasting and personal finance advisory system. This backend handles:

- Live data fetching
- Sentiment analysis using FinBERT + LSTM
- Stock price prediction using LSTM + XGBoost
- Personalized investment recommendations

### 📁 Directory Structure

```
backend/
│
├── models/
│   ├── stock_predictor.py       # Predict stock prices
│   ├── sentiment_model.py       # Analyze + forecast sentiment
│   └── finance_model.py         # Recommender system (rule-based)
│
├── data/
│   ├── stock_data_valid.pkl     # Historical stock data (1980–2024)
│   ├── sentiment_data.json      # Daily average sentiment scores
│   └── predictions.json         # Final predicted output
│
├── utils/
│   ├── fetch_data.py            # yfinance + preprocessing
│   └── news_scraper.py          # Scrape headlines for FinBERT
│
├── main.py                      # FastAPI app
├── requirements.txt             # All Python dependencies
└── README.md                    # You’re reading this!
```

### 🛠️ Installation & Setup

#### 🔧 Prerequisites

Make sure you have:

- Python 3.8+
- pip
- Git
- (Optional) Virtualenv

#### ⬇️ Clone the Repository

```bash
git clone https://github.com/yourusername/devshouse.git
cd devshouse/backend
```

#### 🐍 Create a Virtual Environment (Recommended)

```bash
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
```

#### 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

### 🚀 Run the Backend Server

```bash
uvicorn main:app --reload
```

Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for Swagger UI.

### 🧪 API Endpoints

#### 📈 `/predict` (POST)

```json
{
  "company": "TCS",
  "days": 14
}
```

Returns predicted and actual stock prices for plotting.

#### 💬 `/sentiment` (GET)

Returns latest sentiment scores (actual and predicted).

#### 👤 `/advice` (POST)

```json
{
  "income": 50000,
  "expenses": 20000,
  "risk_appetite": "medium"
}
```

Returns recommended investment strategies.

#### 📊 `/metrics` (GET)

Returns:
- MAPE
- RMSE
- Accuracy of stock prediction model

### 🧠 Model Overview

| Model               | Type             | Description                                         |
|---------------------|------------------|-----------------------------------------------------|
| `stock_predictor`   | LSTM + XGBoost   | Hybrid model using prices + sentiment               |
| `sentiment_model`   | FinBERT + LSTM   | Analyzes news and forecasts future sentiment        |
| `finance_model`     | Rule-Based       | Gives suggestions based on your finances            |

### 🛎️ Workflow Summary

1. `fetch_data.py` uses **yfinance** to download stock data.
2. `news_scraper.py` pulls news headlines per company.
3. Headlines are scored using **FinBERT**, and daily average is saved.
4. **LSTM** model predicts future sentiment per company.
5. Price + sentiment is passed to prediction model.
6. Outputs saved in `data/predictions.json`.
7. APIs deliver data to frontend.

### ❗Deployment Tips

- Use Docker + Gunicorn + Nginx for production.
- Store large models externally (e.g., GDrive/S3).
- Add a `.env` file for API keys and paths.
- Move training logic to a separate `training/` folder.

### 📬 Contact

For questions or contributions:
- 📧 thejus@example.com *(replace with actual contact)*
- 🧠 Team: **Market la Yaaru Mass?**

---

## 🌟 Frontend – InvestSmartAI

The **frontend** is a clean, modern interface that consumes the FastAPI endpoints and renders:

- 📈 Stock price predictions
- 💬 Sentiment trends
- 👤 Personalized financial advice

### 💻 Tech Stack

- **React + Tailwind CSS**
- **Recharts** for charts
- **Axios** for API calls

### 🎨 UI Highlights

- Responsive design with TailwindCSS
- Grid-based layout with chart cards
- Light and dark mode support
- Animations with Framer Motion

### 🔧 Setup

```bash
cd frontend
npm install
npm run dev
```

### 🧭 Pages

- `/` – Home (intro + usage)
- `/predict` – Show stock trends
- `/sentiment` – Show FinBERT + LSTM sentiment
- `/advice` – Personal finance suggestions
- `/about` – Project info + team

