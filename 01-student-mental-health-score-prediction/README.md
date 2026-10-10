# Student Mental Health Score Prediction

An end-to-end Machine Learning application that predicts student mental health scores based on social media usage, study habits, sleep duration, physical activity, and stress levels.

The project integrates a trained regression model with a **FastAPI backend** and a **React frontend** to provide predictions through a user-friendly interface.

## Overview

The objective of this project is to explore student social media usage and related lifestyle factors using data analysis and regression modeling.

Users can enter relevant information through the frontend, which sends the input to the backend API. The trained machine learning model processes the input and returns a predicted mental health score.

**Note:** The predicted score is a model-generated estimate, not a clinical diagnosis.

## Tech Stack

### Machine Learning and Data Processing
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

## Features

- Predicts student mental health scores using a trained regression model.
- Accepts user inputs through a responsive frontend.
- Exposes the model through a REST API built with FastAPI.
- Validates incoming request data using Pydantic.
- Integrates the frontend and backend using Axios.
- Organizes the project into separate data, notebook, model, backend, and frontend folders.

## Machine Learning Workflow

1. Data loading and exploration
2. Exploratory Data Analysis (EDA)
3. Data cleaning and preprocessing
4. Feature engineering and encoding categorical variables
5. Train-test split
6. Regression model training
7. Model evaluation
8. Saving the trained model using Joblib
9. Integrating the model with FastAPI
10. Connecting the React frontend to the prediction API

## Model Evaluation

The regression model is evaluated using the following metrics:

| Metric                                      | Result 
|---------------------------------------------|---------- |
| Mean Absolute Error (MAE)                   |  0.326545 |
| Root Mean Squared Error (RMSE)              |  0.442339 |
| R² Score                                    |  0.890397 |

These metrics help assess prediction errors and how well the model explains variation in the target variable.

## Project Structure

```text
01-student-mental-health-prediction/
│
├── README.md
├── data/
│   └── Student Social Media And Mental Health Impact.csv
│
├── notebooks/
│   └── ML_Project.ipynb
│
├── model/
│   └── Mental_Health_Model.pkl
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
└── frontend/
    ├── package.json
    ├── src/
    └── ...
```

## API Integration

The FastAPI backend loads the trained model and exposes a prediction endpoint.

**Endpoint:** `POST /predict`

The frontend sends user inputs to the API, and the backend returns the predicted score.

Interactive API documentation is available at `/docs` when the backend is running.

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/vibhanimbalkar97-star/ML_Projects
cd ML-Projects/01-student-mental-health-prediction
```

### 2. Run the FastAPI backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at:

`http://127.0.0.1:8000`

API documentation:

`http://127.0.0.1:8000/docs`

### 3. Run the React frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

Configure the frontend API URL to point to the running FastAPI backend.

## Deployment

The application can be deployed using Render:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Live Demo**:  https://ml-projects-1-axpw.onrender.com/

Configure the frontend API URL and FastAPI CORS settings to use the deployed service URLs.

## Future Improvements

- Experiment with additional regression algorithms and hyperparameter tuning.
- Improve model performance through feature engineering.
- Add further validation and error handling.
- Enhance the UI and prediction visualizations.
- Monitor model performance on new data.

## Author

**Vibha Nimbalkar**

Machine Learning | Python | FastAPI | React.js | Full-Stack Development

GitHub: https://github.com/vibhanimbalkar97-star
