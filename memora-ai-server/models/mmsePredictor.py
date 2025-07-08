import os
import joblib
import pandas as pd
from pathlib import Path

model_paths = {
    "gw": "models/gw_cat_best_model.pkl",
    # "stp": "models/stp_model_name.pkl" # Add correct path later
}

class MMSEPredictor:
    gw_model = None
    stp_model = None

    @staticmethod
    def load_gw_model(game_key: str):
        model_path = Path(model_paths[game_key])

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        MMSEPredictor.model = joblib.load(model_path)

    @staticmethod
    def feature_engineer(X: dict) -> pd.DataFrame:
        eps = 1e-5
        X = X.copy()
        X['accuracyPerAttempt'] = X['averageAccuracy'] / (X['averageAttempts'] + eps)
        X['errorRate'] = X['averageLevelErrors'] / (X['averageAttempts'] + eps)
        X['speedScore'] = 1 / (X['averageResponseTime'] + eps)
        X['normalizedAccuracy'] = X['averageAccuracy'] / (X['age'] + eps)

        return pd.DataFrame([X])

    @staticmethod
    def predict_gw_mmse(game_data: dict) -> float:
        if MMSEPredictor.gw_model is None:
            raise ValueError("Gw Model not loaded. Call `load_gw_model()` first.")

        features = MMSEPredictor.feature_engineer(game_data)
        prediction = MMSEPredictor.gw_model.predict(features)[0]
        result = round(prediction, 2)

        if not result:
            raise HTTPException(status_code=404, detail="No gunshot detected.")
        
        return {mmseScore: result}

    # @staticmethod
    # def predict_stroop_mmse(game_data: dict) -> float:
    #     if MMSEPredictor.stp_model is None:
    #         raise ValueError("Gw Model not loaded. Call `load_model()` first.")

    #     features = MMSEPredictor.feature_engineer(game_data)
    #     prediction = MMSEPredictor.stp_model.predict(features)[0]
    #     return round(prediction, 2)