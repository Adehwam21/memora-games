import os
import joblib
import pandas as pd
from pathlib import Path

model_paths = {
    "guess-what": "models/gw_cat_best_with_pipeline.pkl",
    "stroop": "models/stp_lasso_best_with_pipeline.pkl" # Add correct path later
}

class MMSEPredictor:
    gw_model = None
    stp_model = None

    @staticmethod
    def load_gw_model(game_key = "gw"):
        model_path = Path(model_paths[game_key])

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        MMSEPredictor.gw_model = joblib.load(model_path)

    @staticmethod
    def load_stp_model(game_key = "stp"):
        model_path = Path(model_paths[game_key])

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        MMSEPredictor.stp_model = joblib.load(model_path)

    @staticmethod
    def preprocess_gw_data(X: dict) -> pd.DataFrame:
        eps = 1e-5
        X = X.copy()
        X['accuracyPerAttempt'] = X['averageAccuracy'] / (X['averageAttempts'] + eps)
        X['errorRate'] = X['averageLevelErrors'] / (X['averageAttempts'] + eps)
        X['speedScore'] = 1 / (X['averageResponseTime'] + eps)
        X['normalizedAccuracy'] = X['averageAccuracy'] / (X['age'] + eps)

        return pd.DataFrame([X])

    @staticmethod
    def preprocess_stp_data(X: dict) -> pd.DataFrame:
        eps = 1e-5
        X = X.copy()
        X['accuracyPerAttempt'] = X['accuracy'] / (X['attempts'] + eps)
        X['errorRate'] = X['errors'] / (X['attempts'] + eps)
        X['speedScore'] = 1 / (X['averageResponseTime'] + eps)
        X['normalizedAccuracy'] = X['accuracy'] / (X['age'] + eps)

        return pd.DataFrame([X])

    @staticmethod
    def predict_gw_mmse(game_data: dict) -> float:
        if MMSEPredictor.gw_model is None:
            raise ValueError("Gw Model not loaded. Call `load_gw_model()` first.")

        features = MMSEPredictor.preprocess_gw_data(game_data)
        prediction = MMSEPredictor.gw_model.predict(features)[0]
        result = round(prediction, 2)

        if not result:
            raise HTTPException(status_code=404, detail="Result not computed.")
        
        return result

    @staticmethod
    def predict_stp_mmse(game_data: dict) -> float:
        if MMSEPredictor.stp_model is None:
            raise ValueError("Stp Model not loaded. Call `load_model()` first.")

        features = MMSEPredictor.preprocess_stp_data(game_data)
        prediction = MMSEPredictor.stp_model.predict(features)[0]
        return round(prediction, 2)
