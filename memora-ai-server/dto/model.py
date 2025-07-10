from pydantic import BaseModel

class GuessWhatInput(BaseModel):
    age: float
    averageAttempts: float
    averageLevelErrors: float
    averageAccuracy: float
    averageResponseTime: float
    educationLevel: str

class StroopInput(BaseModel):
    age: float
    attempts: float
    errors: float
    accuracy: float
    averageResponseTime: float
    educationLevel: str