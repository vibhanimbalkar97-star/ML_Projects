import { useState, useCallback } from 'react'
import { getErrorMessage, predictMentalHealth } from '../services/app'


// Custom hook that manages everything about one prediction request.
//
// Returns:
// - predict(formData) : sends the data to the API
// - loading           : true while the request is running
// - result            : { score, category? } after a successful request, otherwise null
// - error             : a readable error message, otherwise null
// - reset()           : clears the result and error (back to the start)
export default function usePrediction() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const predict = useCallback(async (formData) => {
    // Start fresh: show loading, clear anything from a previous request.
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const data = await predictMentalHealth(formData)
      setResult(data) // success
    } catch (err) {
      setError(getErrorMessage(err)) // failure: store a readable message
    } finally {
      setLoading(false) // runs after success AND after failure
    }
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setResult(null)
    setError(null)
  }, [])

  return { predict, loading, result, error, reset }
}
