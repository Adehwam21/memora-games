from fastapi import FastAPI
from models.mmsePredictor import MMSEPredictor
from dto.model import GuessWhatInput, StroopInput

app = FastAPI()

try:
    MMSEPredictor.load_gw_model("guess-what")
    MMSEPredictor.load_stp_model("stroop")

    if MMSEPredictor.gw_model is not None:
        print("gw_cat_model loaded")

    if MMSEPredictor.stp_model is not None:
        print("Stp_lasso_model loaded")

except Exception as e:
    # If the model fails to load, print the error message to the console
    print(f"Failed to load model: {e}")


@app.get("/api/v1/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/v1/assessment/predict")
async def assessment_prediction():
    return {"message":"Nothing to predict yet"}

@app.post("/api/v1/game/predict-mmse/guess-what")
async def predict_gw_mmse(input: GuessWhatInput):
    game_data = input.dict()
    score = MMSEPredictor.predict_gw_mmse(game_data)
    print(f"Predicted Guess What MMSE score: {score}")
    return {"predicted_mmse": score}

@app.post("/api/v1/game/predict-mmse/stroop")
async def predict_stp_mmse(input: StroopInput):
    game_data = input.dict()
    score = MMSEPredictor.predict_stp_mmse(game_data)
    return {"predicted_mmse": score}
