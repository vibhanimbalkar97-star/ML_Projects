// Simple loading indicator shown while the prediction request is running.
//
// Props:
// - message : optional text next to the spinner
export default function Loading({ message = 'Analyzing your information…' }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700 motion-reduce:animate-none"
      />
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  )
}
