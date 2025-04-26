# import numpy as np

# def create_dummy_data():
#     """
#     Creates dummy performance data for 10 sessions, each with 10 levels.

#     Returns:
#     dict: A dictionary where each session contains a list of level performance metrics.
#     """
#     num_sessions = 10
#     num_levels = 10
#     performance_data = {}

#     for session in range(1, num_sessions + 1):
#         session_data = []

#         for level in range(1, num_levels + 1):
#             errors = np.random.choice([0, 1, 2, 3])  # Maximum 3 errors
#             accuracy = (3 - errors) / 3 * 100  # Convert to percentage
#             response_time = round(np.random.uniform(2.0, 8.0), 2)  # Random response time

#             session_data.append({
#                 "Level": level,
#                 "Response Time (s)": response_time,
#                 "Accuracy (%)": accuracy,
#                 "Errors": errors
#             })

#         performance_data[f"Session {session}"] = session_data

#     return performance_data
#     """
#     Computes an MMSE-like score based on game performance data.
    
#     The score is calculated based on response time, accuracy, and errors.
#     Higher accuracy improves the score, while higher response time and errors reduce it.
    
#     Parameters:
#     data (list of dicts): A list where each dictionary contains:
#         - 'Level': The level number (int)
#         - 'Response Time (s)': Time taken to respond in seconds (float)
#         - 'Accuracy (%)': Accuracy as a percentage (float)
#         - 'Errors': Number of errors made (int)
    
#     Returns:
#     float: The computed MMSE-like score, rounded to 2 decimal places.
#     """
#     # Extracting relevant data from the list of dictionaries
#     levels = np.array([row['Level'] for row in data])
#     response_time = np.array([row['Response Time (s)'] for row in data])
#     accuracy = np.array([row['Accuracy (%)'] for row in data]) / 100  # Convert percentage to decimal
#     errors = np.array([row['Errors'] for row in data])

#     # Normalize response time & errors using min-max scaling (range: 0 to 1)
#     resp_time_scaled = (response_time - response_time.min()) / (response_time.max() - response_time.min())
#     errors_scaled = (errors - errors.min()) / (errors.max() - errors.min())

#     # Logarithmic weighting: Higher levels contribute more to the final score
#     log_weights = np.log1p(levels) / np.log1p(levels.max())
    
#     # Compute the penalty: Higher response time and errors decrease the score
#     penalty = np.sum(log_weights * (resp_time_scaled + errors_scaled - accuracy))
    
#     # Ensure the final score is within the MMSE scale range (0 to 30)
#     MMSE_score = max(0, min(30, 30 - penalty))
    
#     return round(MMSE_score, 2)

# import numpy as np

# def compute_mmse_score(data):
#     levels = np.array([row['Level'] for row in data])
#     response_time = np.array([row['Response Time (s)'] for row in data])
#     accuracy = np.array([row['Accuracy (%)'] for row in data]) / 100  # Convert to decimal
#     errors = np.array([row['Errors'] for row in data])

#     # Prevent division by zero in min-max normalization
#     def safe_min_max_scaling(arr):
#         if arr.max() == arr.min():  
#             return np.zeros_like(arr)  # If all values are identical, return zeros
#         return (arr - arr.min()) / (arr.max() - arr.min())

#     resp_time_scaled = safe_min_max_scaling(response_time)
#     errors_scaled = safe_min_max_scaling(errors)

#     # Logarithmic weighting for higher levels
#     log_weights = np.log1p(levels) / np.log1p(levels.max())

#     # Compute the penalty
#     penalty = np.sum(log_weights * (resp_time_scaled + errors_scaled - accuracy))

#     # Ensure MMSE score is within [0, 30]
#     MMSE_score = max(0, min(30, 30 - penalty))

#     return round(MMSE_score, 2)

# import numpy as np

# def compute_mmse_score_standardized(data):
#     levels = np.array([row["Level"] for row in data])
#     response_time = np.array([row["Response Time (s)"] for row in data])
#     accuracy = np.array([row["Accuracy (%)"] for row in data])  # Already standardized
#     errors = np.array([row["Errors"] for row in data])  # Already standardized

#     # Adjusted Log Weighting (since levels are now standardized)
#     log_weights = np.log1p(levels - levels.min() + 1) / np.log1p(levels.max() - levels.min() + 1)

#     # Compute the penalty
#     penalty = np.sum(log_weights * (response_time + errors - accuracy))

#     # Ensure MMSE Score is between 0 and 30
#     MMSE_score = max(0, min(30, 30 - penalty))

#     return round(MMSE_score, 2)

# # Generate data for low MMSE score
# # low_mmse_data = create_low_mmse_data()

# # # Compute MMSE score
# # for session, performance in low_mmse_data.items():
# #     mmse_score = compute_mmse_score(performance)
# #     print(f"{session}: MMSE Score = {mmse_score}")


# # Generate example dataset
# data = create_dummy_data()
# data2 = [
#     {"Level": 1, "Response Time (s)": 7.8, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 2, "Response Time (s)": 8.0, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 3, "Response Time (s)": 7.9, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 4, "Response Time (s)": 8.0, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 5, "Response Time (s)": 7.8, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 6, "Response Time (s)": 8.0, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 7, "Response Time (s)": 7.9, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 8, "Response Time (s)": 8.0, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 9, "Response Time (s)": 7.8, "Accuracy (%)": 0.0, "Errors": 3},
#     {"Level": 10, "Response Time (s)": 8.0, "Accuracy (%)": 0.0, "Errors": 3},
# ]

# std_data = [
#     {"Level": -1.5667, "Response Time (s)": 0.0992, "Accuracy (%)": -0.0765, "Errors": -0.6030},
#     {"Level": -1.2185, "Response Time (s)": 1.3716, "Accuracy (%)": -0.8466, "Errors": 0.9045},
#     {"Level": -0.8704, "Response Time (s)": -2.3053, "Accuracy (%)": 2.2289, "Errors": -2.1106},
#     {"Level": -0.5222, "Response Time (s)": -0.0248, "Accuracy (%)": 0.6935, "Errors": -0.6030},
#     {"Level": -0.1741, "Response Time (s)": 0.1570, "Accuracy (%)": -0.8466, "Errors": 0.9045},
#     {"Level": 0.1741, "Response Time (s)": -0.1570, "Accuracy (%)": 0.6935, "Errors": -0.6030},
#     {"Level": 0.5222, "Response Time (s)": 0.3801, "Accuracy (%)": -0.8466, "Errors": 0.9045},
#     {"Level": 0.8704, "Response Time (s)": 1.4460, "Accuracy (%)": -0.8466, "Errors": 0.9045},
#     {"Level": 1.2185, "Response Time (s)": -0.6280, "Accuracy (%)": 0.6935, "Errors": -0.6030},
#     {"Level": 1.5667, "Response Time (s)": -0.3388, "Accuracy (%)": -0.8466, "Errors": 0.9045}
# ]



# # # Compute MMSE scores for each session
# # for session, performance in data.items():
# #     mmse_score = compute_mmse_score(performance)
# #     print(f"{session}: MMSE Score = {mmse_score}")

# norm_mmse_score = compute_mmse_score(data2)
# std_mmse_score = compute_mmse_score_standardized(std_data)
# print(f"Normalized Data MMSE Score = {norm_mmse_score}")
# print()
# print(f"Normalized Data MMSE Score = {norm_mmse_score}")

