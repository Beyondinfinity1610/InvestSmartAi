# InvestSmartAI

## 🔍 Overview
InvestSmartAI is a powerful AI-powered stock prediction platform designed to provide 30-day forecasts using a hybrid LSTM + XGBoost model. The system integrates:
- Real-time prediction backend (FastAPI)
- Scalable model pipeline
- Interactive dashboard
- Sentiment-based prediction(present) and explainability (coming soon)




---

## 📊 Machine Learning Models(best of both of worlds) ✔️
### 1. **LSTM (Long Short-Term Memory)(pattern recogonition training)**
- Used to learn sequential patterns from historical stock prices and technical indicators
- Outputs latent features that represent market behavior
- last year of prediction is removed and features is fed into the XGBoost model as its better in tabulated numeric data 

### 2. **XGBoost(accuracy aimed)**
- Consumes LSTM features and performs regression to predict next-day stock close prices
- Efficient and interpretable with fast inference

### 3. **MinMaxScaler**
- Normalizes inputs before feeding into LSTM and XGBoost
- Ensures stable predictions

---

## 🔁 Backend API (FastAPI)

### POST `/predict_stock`
**Request Body:**
```json
{
  "data": [[...], [...], ..., [...]],  // shape: (sequence_length, features)
  "sequence_length": 30,
  "features": 8
}
```

**Response:**
```json
{
  "predictions": [float, float, ..., float],
  "timesteps": ["Day 1", ..., "Day 30"],
  "status": "success"
}
```

### POST `/predict_live`
Fetches latest dataset, makes predictions using LSTM-XGBoost, and returns:
- Last 60 actual close prices
- Next 30 predicted prices

---

## 🖥 Dashboard Integration
The frontend dashboard (built in React) consumes API responses and visualizes:
- Previous and predicted close prices on a chart
- Table view of prediction data
- Toggle views for daily/weekly/monthly trends

### Features:
- Realtime prediction updates
- RESTful integration with FastAPI endpoints
- Responsive UI with interactive tooltips and hover effects

---

## 🚀 Future Plans
We aim to fully integrate:
- Sentiment analysis from news/tweets (FinBERT, ChatGPT)
- Explainable AI (SHAP values)
- User-based model personalization
- Federated learning for privacy
- Portfolio simulation tools
- Secure user authentication and preferences

---

## ⚙️ Setup Instructions
```bash
# 1. Clone the repo
$ git clone https://github.com/yourusername/devshouse.git && cd devshouse

# 2. Create virtual environment
$ python -m venv venv && source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 3. Install dependencies
$ pip install -r requirements.txt

# 4. Run the FastAPI server
$ uvicorn main:app --reload
```


---

## 📬 Contact
**Team Market la Yaaru Mass?**  
Email: thejeshwaarsathishkumar@gmail.com

---

> "Forecast the market, educate the investor, and automate the future."

