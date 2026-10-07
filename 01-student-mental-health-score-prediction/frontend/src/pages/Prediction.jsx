import { useEffect, useRef } from "react";
import Loading from "../components/Loading"
import usePrediction from "../hooks/usePrediction"
import PredictionForm from './../components/PredictionForm';
import ResultCard from './../components/ResultCard';
import Disclaimer from "../components/Disclaimer";


  export default function Prediction() {
  const { predict, loading, result, error, reset } = usePrediction()
  const resultRef = useRef(null)
  const errorRef = useRef(null)

  // Submit button is at the bottom of the form, but the result and the
  // error appear at the top. Bring them into view.
  useEffect(() => {
    if (result) resultRef.current?.focus()
  }, [result])

  useEffect(() => {
    if (error) errorRef.current?.scrollIntoView({ block: 'center' })
  }, [error])

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Mental Health Score Prediction
      </h1>
      <p className="mt-2 text-base leading-relaxed text-slate-600">
        Fill in the form below to get an ML-based estimate of your mental health score.
      </p>

      <div className="mt-6 space-y-6">
        {!result && <Disclaimer />}

        {loading && <Loading />}

        {error && (
          <div
            ref={errorRef}
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <p className="font-semibold">We couldn't get your estimate</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {result && (
          <div ref={resultRef} tabIndex={-1} className="focus:outline-none">
            <ResultCard result={result} onReset={reset} />
          </div>
        )}

        <div className={result ? 'hidden' : ''}>
          <PredictionForm onSubmit={predict} isLoading={loading} />
        </div>
      </div>
    </main>
  )
}


