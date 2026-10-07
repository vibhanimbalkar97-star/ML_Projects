
import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer'

// The three "How It Works" steps live in an array, so the JSX below stays short.
const STEPS = [
  {
    title: 'Enter Your Information',
    text: 'Fill in a short form about your age, study and sleep hours, social media use, physical activity, and stress level.',
  },
  {
    title: 'ML Model Analyzes Data',
    text: 'A trained Machine Learning model compares your answers with the patterns it learned from its training data.',
  },
  {
    title: 'View Your Score',
    text: 'You receive one number as an estimate. Use it as a starting point for reflection, not as a conclusion.',
  },
]

// Shared focus style from the design system
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
  

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Understand Your Mental Health Score
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                This application uses Machine Learning to provide an ML-based estimate
                of your mental health score, based only on the information you enter.
                Answer a few questions and see the result in seconds.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/prediction"
                  className={`inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 ${focusRing}`}
                >
                  Start Prediction
                </Link>
                <a
                  href="#how-it-works"
                  className={`inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 ${focusRing}`}
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-title"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
        >
          <h2
            id="how-it-works-title"
            className="text-xl font-semibold text-slate-900 sm:text-2xl"
          >
            How It Works
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
            Three simple steps, from your answers to your estimate.
          </p>

          {/* 1 column on mobile, 3 columns from tablet up */}
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-800"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 sm:pb-20">
       <Disclaimer />
        </section>
      </main>
    </div>
  )
}
