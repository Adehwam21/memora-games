import pytest
from app.models.mmse_predictor import MMSEPredictor

# Sample game data
sample_data = {
    "age": 72,
    "averageAccuracy": 3.0,
    "averageAttempts": 2.0,
    "averageResponseTime": 1.8,
    "averageLevelErrors": 1.0,
    "educationLevel": "postsecondary"
}

def test_feature_engineering():
    df = GWPredictor.preprocess(sample_data)
    assert "accuracyPerAttempt" in df.columns
    assert "errorRate" in df.columns
    assert "speedScore" in df.columns
    assert "normalizedAccuracy" in df.columns
    assert df.shape[0] == 1  # should be a single row

def test_model_loading():
    MMSEPredictor.load_gw_model("gw")
    MMSEPredictor.load_gw_model("stp")
    assert MMSEPredictor.gw_model is not None
    assert MMSEPredictor.stp_model is not None

def test_gw_prediction():
    MMSEPredictor.load_gw_model("gw")
    prediction = MMSEPredictor.predict_mmse(sample_data)
    assert isinstance(prediction, float)
    assert 0 <= prediction <= 30  # MMSE score range

# def test_gw_prediction():
#     MMSEPredictor.load_stp_model("stp")
#     prediction = MMSEPredictor.predict_mmse(sample_data)
#     assert isinstance(prediction, float)
#     assert 0 <= prediction <= 30  # MMSE score range
