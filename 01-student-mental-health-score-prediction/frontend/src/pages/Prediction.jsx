import Navbar from '../components/Navbar'
import PredictionForm from '../components/PredictionForm'
import ResultCard from '../components/ResultCard'

const DUMMY_RESULT = { score: 72.5, category: 'Moderate' }

export default function Prediction() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <ResultCard
          result={DUMMY_RESULT}
          maxScore={100}
          onReset={() => console.log('Predict Again clicked')}
        />
        <PredictionForm />
      </main>
    </div>
  )
}