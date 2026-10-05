// Reusable dropdown with a label, hint and error message.
//
// Props:
// - label, name, value, onChange : the basics (controlled select)
// - options     : array of strings, e.g. ['Low', 'Medium', 'High']
// - error       : error message string (shows the red error state)
// - hint        : small helper text under the field
// - placeholder : text of the empty first option (default "Select…")
// - any other props go straight to <select>

const selectBase =
  'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm focus:outline-none focus:ring-2'

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  hint,
  placeholder = 'Select…',
  ...rest
}) {
  const errorId = `${name}-error`

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`${selectBase} ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-red-600/30'
            : 'border-slate-300 focus:border-teal-600 focus:ring-teal-600/30'
        }`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {hint && !error && <p className="mt-1.5 text-sm text-slate-600">{hint}</p>}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
