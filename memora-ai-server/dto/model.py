from pydantic import BaseModel

class GuessWhatInput(BaseModel):
    age: float
    averageAttempts: float
    averageLevelErrors: float
    averageAccuracy: float
    averageResponseTime: float
    educationLevel: str