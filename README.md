haolda# 💸 InvestSmartAI

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

### 📁 Directory Structure(similar not same as used)(example)

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

### 🧪 API Endpoints(examples not same name as used just for understanding)

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


#### 📊 `/fetch-live-data` (POST)

Returns:
- live data in metioned range(fixed for requirment)
  
- added to data set

#### 📊 `/TRACK ACCURACY` (GET)

Returns:
- live data in metioned range(fixed for requirment)
- compares with recently predicted data preventing misleads and future scope for re calibrating the model
 

### 🧠 Model Overview

| Model               | Type             | Description                                         |
|---------------------|------------------|-----------------------------------------------------|
| `stock_predictor`   | LSTM + XGBoost   | Hybrid model using prices + sentiment               |
| `sentiment_model`   | FinBERT + LSTM   | Analyzes news and forecasts future sentiment (experimental       |


### 🛎️ Workflow Summary

1. `fetch_data.py` uses **yfinance** to download stock data.
2. `news_scraper.py` pulls news headlines per company.
3. Headlines are scored using **FinBERT**, and daily average is saved.
4. **LSTM** model predicts future sentiment per company.
5. Price + sentiment is passed to prediction model.
6. Outputs saved in `data/predictions.json`.
7. APIs deliver data to frontend.

### ❗Deployment Tips(idealogy)

- Use Docker + Gunicorn + Nginx for production.
- Store large models externally (e.g., GDrive/S3).
- Add a `.env` file for API keys and paths.
- Move training logic to a separate `training/` folder.

### 📬 Contact

For questions or contributions:
- 📧 thejeshwaarsathishkumar@gmail.com *(replace with actual contact)*
- 🧠 Team: **Market la Yaaru Mass?**

---

## 🌟 Frontend – InvestSmartAI

The provided **Settings.jsx** code is a comprehensive implementation of a settings page for your investment platform. It includes features such as profile management, notification preferences, investment preferences, privacy settings, and more. Below is a breakdown of the key components and functionality for your GitHub README file.

---

# 💸 InvestSmartAI – Frontend

**Team Name:** Market la Yaaru Mass?

InvestSmartAI is an AI-powered financial assistant that leverages stock price trends, sentiment analysis, and personalized financial profiling to help users make informed investment decisions.

---

## 🌟 Features

- **Profile Management**: Update user details like name, email, phone number, and profile picture.
- **Notification Preferences**: Manage alerts for market updates, investment alerts, and transaction confirmations.
- **Investment Preferences**: Customize risk tolerance, investment horizon, and preferred asset categories.
- **Privacy & Security**: Control data permissions, session management, and two-factor authentication.
- **Linked Accounts**: Manage external investment platform connections (e.g., Kotak Securities, DhanHQ).
- **Appearance Settings**: Toggle between light/dark mode and adjust language preferences.

---

## 🖥️ Website Structure

### Website Page Flow
![Website Page Structure](https://pplx-res.cloudinary.com/image/upload/v1743770435/user_uploads/l Pages
1. **Landing Page**: Introduction to the platform.
2. **Authentication**:
   - Login
   - Signup
3. **Onboarding Tutorial**: Guide to using the platform.
4. **Portfolio Setup**: Initial setup for user preferences and goals.
5. **Dashboard (Home Page)**:
   - AI Market Insights
   - Portfolio Overview
   - Transaction History
6. **Settings Page**:
   - Profile Management
   - Notification Preferences
   - Investment Preferences
7. **About Page**: Information about the platform.

---

## ⚙️ Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Recharts**: For data visualization (e.g., stock trends).
- **Axios**: For API integration with the backend.

---

## 🛠️ Installation & Setup

### Prerequisites

Make sure you have:
- Node.js (v14 or higher)
- npm or yarn

### Steps to Set Up the Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/investsmartai.git
   cd investsmartai/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🎨 UI Highlights

### Components in `Settings.jsx`
1. **Profile Management**
   - Update personal details like name, email, phone number.
   - Upload profile pictures (JPG/PNG format).

2. **Password Management**
   - Change passwords with validation for strength.

3. **Two-Factor Authentication**
   - Toggle 2FA for enhanced account security.

4. **Linked Accounts**
   - Manage external investment accounts (e.g., Kotak Securities).
   - Sync or disconnect accounts.

5. **Notification Preferences**
   - Enable/disable notifications for market updates, investment alerts, and transaction confirmations.
   - Choose delivery methods (email/SMS/in-app).

6. **Investment Preferences**
   - Set risk tolerance levels (low/medium/high).
   - Define investment horizons (short/medium/long-term).
   - Select preferred asset categories (stocks, bonds, ETFs, crypto).

7. **Appearance Settings**
   - Toggle between light/dark mode.
   - Change language preferences.

8. **Privacy Settings**
   - Manage data permissions for portfolio analysis and spending patterns.
   - View active sessions and revoke unauthorized devices.

---

## 📁 Directory Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── Settings.jsx        # Main settings page component
│   │   ├── Dashboard.jsx       # Dashboard with AI insights + portfolio tracking
│   │   └── LiveDataFetcher.jsx # Fetch live stock data from API
│   │   └── AccuracyTracker.jsx # Track prediction accuracy vs actuals
│   ├── assets/                 # Static assets (images/icons)
│   ├── styles/                 # Tailwind CSS customizations
│   ├── App.js                  # Main React component with routing logic
│   └── index.js                # Entry point for React app
│
├── public/
│   ├── index.html              # HTML template for React app
│   └── favicon.ico             # Favicon for branding
│
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation (this file)
```

---

## 🧭 Navigation Guide

### Routes in the Application

| Route           | Description                                      |
|------------------|--------------------------------------------------|
| `/`             | Landing page                                    |
| `/login`        | User login page                                 |
| `/signup`       | User signup page                                |
| `/onboarding`   | Onboarding tutorial                             |
| `/dashboard`    | Home page with AI insights + portfolio tracking |
| `/settings`     | User settings page                              |
| `/about`        | About the platform                              |

---

## 🧪 Testing API Integration

You can test API endpoints using tools like Postman or curl:

### Example: Fetch Live Data (`POST /fetch_live_data`)
```bash
curl -X POST http://localhost:8000/fetch_live_data \
  -H "Content-Type: application/json" \
  -d '{"ticker": "AAPL", "period": "60d", "interval": "1d"}'
```

### Example: Predict Stock Prices (`POST /predict_stock`)
```bash
curl -X POST http://localhost:8000/predict_stock \
  -H "Content-Type: application/json" \
  -d '{"data": [[open1, high1, low1, close1, adj_close1, volume1, sentiment1], ...]}'
```

---

## 📬 Contact Us

For questions or contributions:
- 📧 Email us at [team@example.com](mailto:team@example.com)
- 🧠 Team Name: Market la Yaaru Mass?

---

This README provides a clear overview of your frontend project while being concise and informative for developers exploring your repository on GitHub!

Citations:
[1] https://pplx-res.cloudinary.com/image/upload/v1743770435/user_uploads/lvmyJabZYupMRQU/image.jpg
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/59293453/96b296af-e124-4280-877b-263b6a674779/paste-2.txt

---
Answer from Perplexity: https://www.perplexity.ai/search/i-am-coding-an-ai-powered-inve-3u9u4yhtRzSdfwH7pshKYg?8=r&utm_source=copy_output
