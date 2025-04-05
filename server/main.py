from fastapi import FastAPI, Depends, APIRouter, HTTPException, Depends, Body
from app.auth.auth import auth_router, get_current_user
from app.schemas.models import PredictInput, Profile, Asset, Watchlist, GraphData, Settings
import pickle, numpy as np
from app.db.connect import users_collection
from typing import Optional, List
from google import genai
from prompt_guidelin import system_prompt
import re
from tensorflow.keras.models import load_model, Model
import joblib
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins (⚠️ only use this in dev, not in prod)
origins = ["*"]

# For production, define allowed origins like:
# origins = ["https://your-frontend.com", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # e.g. ["GET", "POST"]
    allow_headers=["*"],              # e.g. ["Authorization", "Content-Type"]
)

app.include_router(auth_router)

# Model configuration
SEQUENCE_LENGTH = 60
n_days = 30
required_columns = ['Open', 'High', 'Low', 'Close', 'Adj close', 'Volume', 'Scaled_sentiment']

# Load models and scaler
lstm_model = load_model("app/models/lstm_model.h5")
xgb_model = joblib.load("app/models/xgb_model.pkl")
scaler = joblib.load("app/models/scaler.pkl")

# Create intermediate LSTM model to extract features
intermediate_model = Model(inputs=lstm_model.input, outputs=lstm_model.layers[-2].output)

# def predict_next_30_days():
#     # Load the latest data
#     df = pd.read_csv("app/data/latest_data.csv")
#     df = df[required_columns].dropna()
#     last_60 = df[-SEQUENCE_LENGTH:]

#     # Scale the input
#     scaled_input = scaler.transform(last_60)
#     sequence = scaled_input.copy()
    
#     future_predictions = []

#     for _ in range(n_days):
#         input_seq = np.expand_dims(sequence[-SEQUENCE_LENGTH:], axis=0)
#         lstm_features = intermediate_model.predict(input_seq, verbose=0)
#         pred = xgb_model.predict(lstm_features)[0]
#         future_predictions.append(pred)

#         # Update sequence with new prediction
#         new_row = sequence[-1].copy()
#         new_row[3] = pred  # Update the 'Close' price
#         sequence = np.vstack([sequence, new_row])

#     return future_predictions

# @app.get("/predict_future")
# def predict_future():
#     predictions = predict_next_30_days()
#     today = datetime.today()
#     dates = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(1, n_days + 1)]
#     return [{"date": d, "predicted_price": float(p)} for d, p in zip(dates, predictions)]

from fastapi import FastAPI, Body, HTTPException
from typing import List, Dict, Any
import numpy as np
from pydantic import BaseModel

# Define a model input schema
class ModelInput(BaseModel):
    data: List[List[float]]
    sequence_length: int = 60
    features: int = 7


@app.post("/predict_stock")
async def predict_stock(input_data: ModelInput):

    print(os.path.abspath("data/latest_dataset.csv"))

    try:
        # Validate input dimensions
        if (len(input_data.data) != SEQUENCE_LENGTH or 
            any(len(row) != len(required_columns) for row in input_data.data)):
            raise HTTPException(
                status_code=400,
                detail=f"Input must be sequence of {SEQUENCE_LENGTH} timesteps with {len(required_columns)} features"
            )

        df = pd.read_csv("data\latest_dataset.csv")  # Changed from latest_data.csv

        df['Date'] = pd.to_datetime(df['Date'])
        previous_data = df[['Date', 'Close']].tail(60).to_dict('records')
        previous = [{
            "date": row['Date'].strftime("%Y-%m-%d"),
            "close": row['Close']
        } for row in previous_data]

        # Convert to numpy array and scale
        raw_sequence = np.array(input_data.data)
        scaled_sequence = scaler.transform(raw_sequence)

        predictions = []
        current_sequence = scaled_sequence.copy()

        for _ in range(30):
            # Prepare LSTM input
            input_array = np.expand_dims(current_sequence, axis=0)
            
            # Get features and predict
            lstm_features = intermediate_model.predict(input_array, verbose=0)
            next_pred_scaled = xgb_model.predict(lstm_features)[0]
            
            # Inverse scale using original scaler
            dummy_row = np.zeros((1, len(required_columns)))
            dummy_row[0, 3] = next_pred_scaled  # Close price at index 3
            next_pred = scaler.inverse_transform(dummy_row)[0, 3]
            
            predictions.append(float(next_pred))

            # Update sequence with scaled prediction
            new_row = current_sequence[-1].copy()
            new_row[3] = next_pred_scaled
            current_sequence = np.vstack([current_sequence[1:], new_row])

        return {
            "previous": previous,
            "predictions": predictions,
            "timesteps": [f"Day {i+1}" for i in range(30)],
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Stock AI API!"}

# @app.post("/predict")
# def predict(input_data: PredictInput, current_user: str = Depends(get_current_user)):
#     # Process the input data for prediction
#     # This would depend on how your model expects input
#     # Example implementation:
#     try:
#         # Create a dataframe with the required columns
#         input_df = pd.DataFrame([input_data.dict()])
        
#         # Ensure all required columns are present
#         for col in required_columns:
#             if col not in input_df.columns:
#                 input_df[col] = 0  # Default value
        
#         input_df = input_df[required_columns]
        
#         # Scale the input
#         scaled_input = scaler.transform(input_df)
        
#         # For LSTM, we need a sequence
#         # Here we're assuming you have some historical data to form a sequence
#         # In a real implementation, you'd need to handle this properly
#         sequence = np.expand_dims(scaled_input, axis=0)
        
#         # Get LSTM features
#         lstm_features = intermediate_model.predict(sequence)
        
#         # Make prediction with XGBoost
#         prediction = xgb_model.predict(lstm_features)[0]
        
#         # Inverse transform to get the actual price
#         # This is a simplified example
#         return {"prediction": float(prediction)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def validate_input(query: str) -> bool:
    # Length check
    if len(query) > 200:
        return False

    # Keyword denylist
    prohibited_terms = ["crypto", "nft", "personal", "hypothetical"]
    if any(term in query.lower() for term in prohibited_terms):
        return False

    # Stock-specific allowlist
    stock_keywords = ["stock", "share", "nyse", "nasdaq", "dividend"]
    if not any(kw in query.lower() for kw in stock_keywords):
        return False

    # Programming syntax blocklist (Python, JS, C/C++, Java, etc.)
    programming_patterns = [
        r"\bdef\b", r"\bclass\b", r"\bimport\b", r"\bfunction\b", r"\bconsole\.log\b",
        r"\bvar\b", r"\blet\b", r"\bconst\b", r"\bif\s*\(", r"\bwhile\s*\(",
        r"\bfor\s*\(", r"try\s*{", r"catch\s*\(", r"#include\s*<", r"\bpublic\b",
        r"\bprivate\b", r"\bstatic\b", r"\bSystem\.out\.println\b", r"<script.*?>",
        r"{.*?}", r"\[.*?\]", r"\(.*?\)", r"==|!=|>=|<=|=>|<-|->|::",  # common logic/syntax
    ]
    for pattern in programming_patterns:
        if re.search(pattern, query, re.IGNORECASE):
            return False

    # Injection/XSS patterns
    injection_patterns = [
        r"(?:--|\|\||;)",  # SQL chaining
        r"(?:select|drop|insert|delete|update|union)",  # SQL keywords
        r"(?:\bOR\b|\bAND\b).+=.",  # conditional logic
        r"<[^>]+>",  # HTML tags
        r"(?:\$\{.+\})",  # Template injections
    ]
    for pattern in injection_patterns:
        if re.search(pattern, query, re.IGNORECASE):
            return False

    # Block external links that are NOT stock/company/news related
    if "http" in query.lower() or "www." in query.lower():
        allowed_domains = ["bloomberg", "reuters", "yahoo finance", "marketwatch", "moneycontrol", "investopedia"]
        if not any(domain in query.lower() for domain in allowed_domains):
            return False

    return True

client = genai.Client(api_key="AIzaSyAjdTYIsxh5lvHFMHxL_TmDcjX3LuFxQ3I")

@app.post("/chat")
def call_gemini_api(prompt: str = Body(...)):
    if not validate_input(prompt):
        raise HTTPException(status_code=400, detail="Invalid input")
    
    # Append the validated prompt to the system prompt
    full_prompt = f"{system_prompt}\n{prompt}"
    
    # Call the Gemini API
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=full_prompt
    )
    return {"response": response.text}

@app.post("/profile")
def update_profile(profile: Profile, current_user: str = Depends(get_current_user)):
    # Ensure a single document exists for the user
    users_collection.update_one(
        {"username": current_user},
        {"$setOnInsert": {"username": current_user}},  # Create the document if it doesn't exist
        upsert=True
    )
    # Update the profile field
    users_collection.update_one(
        {"username": current_user},
        {"$set": {"profile": profile.dict()}}
    )
    return {"message": "Profile updated"}

@app.get("/profile", response_model=Profile)
def get_profile(current_user: str = Depends(get_current_user)):
    user_doc = users_collection.find_one({"username": current_user})
    if not user_doc or "profile" not in user_doc:
        raise HTTPException(status_code=404, detail="Profile not found")
    return user_doc["profile"]

@app.get("/assets", response_model=List[Asset])
def get_assets(current_user: str = Depends(get_current_user)):
    user = users_collection.find_one({"username": current_user})
    return user.get("assets", [])

@app.post("/assets")
def add_asset(asset: Asset, current_user: str = Depends(get_current_user)):
    # Ensure a single document exists for the user
    users_collection.update_one(
        {"username": current_user},
        {"$setOnInsert": {"username": current_user}},  # Create the document if it doesn't exist
        upsert=True
    )
    # Add the asset to the assets array
    users_collection.update_one(
        {"username": current_user},
        {"$push": {"assets": asset.dict()}}
    )
    return {"message": "Asset added"}

@app.get("/watchlist", response_model=Watchlist)
def get_watchlist(current_user: str = Depends(get_current_user)):
    user = users_collection.find_one({"username": current_user})
    if not user or "watchlist" not in user:
        raise HTTPException(status_code=404, detail="Watchlist not found")
    return user["watchlist"]

@app.post("/watchlist")
def add_to_watchlist(item: Watchlist, current_user: str = Depends(get_current_user)):
    # Ensure a single document exists for the user
    users_collection.update_one(
        {"username": current_user},
        {"$setOnInsert": {"username": current_user}},  # Create the document if it doesn't exist
        upsert=True
    )
    # Update the watchlist field
    users_collection.update_one(
        {"username": current_user},
        {"$set": {"watchlist": item.dict()}}
    )
    return {"message": "Watchlist updated"}

@app.get("/graph", response_model=GraphData)
def get_graph_data(current_user: str = Depends(get_current_user)):
    user = users_collection.find_one({"username": current_user})
    if not user or "graph" not in user:
        raise HTTPException(status_code=404, detail="Graph data not found")
    return user["graph"]

@app.post("/settings")
def update_settings(settings: Settings, current_user: str = Depends(get_current_user)):
    # Ensure a single document exists for the user
    users_collection.update_one(
        {"username": current_user},
        {"$setOnInsert": {"username": current_user}},  # Create the document if it doesn't exist
        upsert=True
    )
    # Update the settings field
    users_collection.update_one(
        {"username": current_user},
        {"$set": {"settings": settings.dict()}}
    )
    return {"message": "Settings updated"}