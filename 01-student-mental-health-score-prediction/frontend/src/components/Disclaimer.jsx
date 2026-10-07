export default function Disclaimer({ className = '' }) {
  return (
    <div
      role="note"
      className={`rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ${className}`}
    >
      This tool provides an ML-based estimate for informational purposes only and
      is not a medical diagnosis.
    </div>
  )
}