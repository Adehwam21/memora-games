from pydantic import BaseModel

class GuessWhatInput(BaseModel):
    age: float
    averageAttempts: float
    averageLevelErrors: float
    averageAccuracy: float
    averageResponseTime: float
    educationLevel_none: int
    educationLevel_primary: int
    educationLevel_secondary: int
    educationLevel_postsecondary: int
    educationLevel_postgraduate: int
