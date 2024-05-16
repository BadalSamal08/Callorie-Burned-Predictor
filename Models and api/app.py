from flask import Flask, request, jsonify
import numpy as np
from xgboost import XGBRegressor
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = XGBRegressor()
model = joblib.load("C:/Users/badal/Documents/Project/Calorie Burnt predictor/model.pkl")

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json()
    # print(data)
    # features = np.array(data['features']).reshape(1, -1)
    # print(features)
    flag = 0
    features = data.get('features', [])
    for i in range(len(features)):
        if features[i] is None:
            # Replace missing value with default value (e.g., 0)
            features[i] = 0
            flag = flag + 1
    if flag == 7:
        return jsonify({'prediction': []})
    else :
        print(features)
        features = np.array(features).reshape(1,-1)
        prediction = model.predict(features)
        # Convert NumPy float32 to regular Python float
        pred = prediction.item()
        print(pred)
        return jsonify({'prediction': pred})
    
if __name__ == "__main__":
    app.run(debug=True)
