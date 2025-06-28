from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/assessment/predict")
async def assessment_prediction():
    return {"message":"Nothing to predict yet"}