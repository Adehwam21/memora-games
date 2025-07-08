from fastapi import FastAPI
from models.mmsePredictor import MMSEPredictor
from dto.model import GuessWhatInput

app = FastAPI()

try:
    MMSEPredictor.load_gw_model("gw")

    if MMSEPredictor.gw_model is not None:
        print("gw_cat_model loaded")
    # Predictor.load_stp_model("stp")
except Exception as e:
    # If the model fails to load, print the error message to the console
    print(f"Failed to load model: {e}")


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/assessment/predict")
async def assessment_prediction():
    return {"message":"Nothing to predict yet"}

@app.post("/game/predict-mmse/gw")
async def predict_mmse(input: GuessWhatInput):
    game_data = input.dict()
    score = await MMSEPredictor.predict_gw_mmse(game_data)
    return {"predicted_mmse": score}

# @app.post("/game/predict-mmse/stp")
# async def predict_mmse(input: GuessWhatInput):
#     game_data = input.dict()
#     score = await GWPredictor.predict_stp_mmse(game_data)
#     return {"predicted_mmse": score}
