import numpy as np

def compute_mmse_score(data):
    """
    Computes an MMSE-like score based on game performance data.
    
    The score is calculated based on response time, accuracy, and errors.
    Higher accuracy improves the score, while higher response time and errors reduce it.
    
    Parameters:
    data (list of dicts): A list where each dictionary contains:
        - 'Level': The level number (int)
        - 'Response Time (s)': Time taken to respond in seconds (float)
        - 'Accuracy (%)': Accuracy as a percentage (float)
        - 'Errors': Number of errors made (int)
    
    Returns:
    float: The computed MMSE-like score, rounded to 2 decimal places.
    """
    # Extracting relevant data from the list of dictionaries
    levels = np.array([row['Level'] for row in data])
    response_time = np.array([row['Response Time (s)'] for row in data])
    accuracy = np.array([row['Accuracy (%)'] for row in data]) / 100  # Convert percentage to decimal
    errors = np.array([row['Errors'] for row in data])

    # Normalize response time & errors using min-max scaling (range: 0 to 1)
    resp_time_scaled = (response_time - response_time.min()) / (response_time.max() - response_time.min())
    errors_scaled = (errors - errors.min()) / (errors.max() - errors.min())

    # Logarithmic weighting: Higher levels contribute more to the final score
    log_weights = np.log1p(levels) / np.log1p(levels.max())
    
    # Compute the penalty: Higher response time and errors decrease the score
    penalty = np.sum(log_weights * (resp_time_scaled + errors_scaled - accuracy))
    
    # Ensure the final score is within the MMSE scale range (0 to 30)
    MMSE_score = max(0, min(30, 30 - penalty))
    
    return round(MMSE_score, 2)

# Example dataset containing performance metrics across levels
data = [
    {'Level': 1, 'Attempts': 2, 'Response Time (s)': 5.08, 'Accuracy (%)': 50.0, 'Errors': 1},
    {'Level': 2, 'Attempts': 3, 'Response Time (s)': 6.62, 'Accuracy (%)': 33.3, 'Errors': 2},
    {'Level': 3, 'Attempts': 1, 'Response Time (s)': 2.17, 'Accuracy (%)': 100.0, 'Errors': 0},
    {'Level': 4, 'Attempts': 3, 'Response Time (s)': 4.93, 'Accuracy (%)': 66.7, 'Errors': 1},
    {'Level': 5, 'Attempts': 3, 'Response Time (s)': 5.15, 'Accuracy (%)': 33.3, 'Errors': 2},
    {'Level': 6, 'Attempts': 3, 'Response Time (s)': 4.77, 'Accuracy (%)': 66.7, 'Errors': 1},
    {'Level': 7, 'Attempts': 3, 'Response Time (s)': 5.42, 'Accuracy (%)': 33.3, 'Errors': 2},
    {'Level': 8, 'Attempts': 3, 'Response Time (s)': 6.71, 'Accuracy (%)': 33.3, 'Errors': 2},
    {'Level': 9, 'Attempts': 3, 'Response Time (s)': 4.20, 'Accuracy (%)': 66.7, 'Errors': 1},
    {'Level': 10, 'Attempts': 3, 'Response Time (s)': 4.55, 'Accuracy (%)': 33.3, 'Errors': 2}
]

# Compute and display the MMSE-like score
mmse_score = compute_mmse_score(data)
print("Computed MMSE Score:", mmse_score)
