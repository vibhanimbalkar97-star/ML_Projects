import axios from "axios";

// One shared Axios instance. Every request made with `api` starts from this
// base URL, so we never repeat "http://127.0.0.1:8000" anywhere else.
// The value comes from the .env file (VITE_API_URL).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 15000, // give up after 15 seconds
  headers: { "Content-Type": "application/json" },
});

// Sends the form data to POST /predict and returns a clean result object.
//
// Request body (what FastAPI expects):
//   age, gender, country, academic_level, most_used_platform, purpose_of_use,
//   avg_daily_usage_hours, daily_unlocks, study_hours,
//   physical_activity_hours, sleep_hours_per_night, stress_level
//
// Returns: { score: number, category?: string }
export async function predictMentalHealth(data) {
  const response = await api.post("/predict", data);
  const body = response.data;

  const score = body.score ?? body.predicted_mental_health_score;
  if (typeof score !== "number") {
    throw new Error("Unexpected response from the server.");
  }

  return { score, category: body.category };
}

// Turns an Axios error into a short, readable message for the UI.
export function getErrorMessage(error) {
  // The server answered, but with an error status
  if (error.response) {
    const { status, data } = error.response;

    // 422 = FastAPI validation error: { detail: [{ loc: ['body','age'], msg: '...' }] }
    if (status === 422 && Array.isArray(data?.detail)) {
      return data.detail
        .map((d) => `${d.loc?.slice(1).join(".")}: ${d.msg}`)
        .join("; ");
    }
    if (status >= 500) {
      return "The server ran into a problem. Please try again in a moment.";
    }
    return "The request could not be completed. Please check your entries and try again.";
  }

  // The request was sent but no response came back (server off, network down, timeout)
  if (error.request) {
    return "We couldn't reach the server. Please check that the backend is running and try again.";
  }

  return "Something went wrong. Please try again.";
}

export default api;
