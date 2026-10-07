// Shows the prediction result.
//
// Props:
// - result   : { score: number, category?: string }
//              (category is optional; it is only shown when provided)
// - maxScore : optional top of the score scale (e.g. 100). The circular
//              visual is drawn only when this is provided, because the
//              scale must be known to draw it honestly.
// - onReset  : called when the "Predict Again" button is clicked

import Disclaimer from "./Disclaimer"

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'

// Ring geometry: circumference = 2 * PI * radius
const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ResultCard({ result, maxScore, onReset }) {
  if (!result || typeof result.score !== 'number') return null

  const { score, category } = result

  // Show up to 2 decimals, without trailing zeros (72.5 stays "72.5").
  const displayScore = Number(score.toFixed(2)).toString()

  const hasScale = typeof maxScore === 'number' && maxScore > 0
  // Share of the ring to fill, kept between 0 and 1.
  const fraction = hasScale ? Math.min(Math.max(score / maxScore, 0), 1) : 0

  return (
    <section
      aria-labelledby="result-title"
      aria-live="polite"
      className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center sm:p-8"
    >
      <h2
        id="result-title"
        className="text-sm font-medium uppercase tracking-wide text-teal-800"
      >
        Mental Health Score
      </h2>

      {/* Score visual */}
      <div className="mt-6 flex justify-center">
        <div className="relative h-44 w-44 sm:h-52 sm:w-52">
          {hasScale && (
            <svg
              viewBox="0 0 120 120"
              className="h-full w-full -rotate-90"
              aria-hidden="true"
            >
              {/* Track (the empty part of the ring) */}
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                className="stroke-teal-100"
              />
              {/* Filled part of the ring */}
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${fraction * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                className="stroke-teal-700"
              />
            </svg>
          )}

          {/* Number in the middle of the ring (or a plain circle without a scale) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center ${
              hasScale ? '' : 'rounded-full border-4 border-teal-100 bg-white'
            }`}
          >
            <span className="text-5xl font-bold text-teal-900 sm:text-6xl">
              {displayScore}
            </span>
            {hasScale && (
              <span className="mt-1 text-sm text-teal-800">out of {maxScore}</span>
            )}
          </div>
        </div>
      </div>

      {/* Category (only if the result includes one) */}
      {category && (
        <p className="mt-6 text-sm text-slate-600">
          Category:{' '}
          <span className="ml-1 inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 font-medium text-teal-900">
            {category}
          </span>
        </p>
      )}

      {/* Informational message */}
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600">
        This estimate is based only on the information you entered. You can use it
        as a starting point for reflection. If you have concerns about your mental
        health, consider talking to a qualified professional.
      </p>

      {/* Required disclaimer */}
    <Disclaimer className="mx-auto mt-5 max-w-md text-left" />

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onReset}
          className={`inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto ${focusRing}`}
        >
          Predict Again
        </button>
      </div>
    </section>
  )
}
