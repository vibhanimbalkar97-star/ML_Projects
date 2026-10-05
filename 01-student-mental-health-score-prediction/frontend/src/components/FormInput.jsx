// Reusable text / number input with a label, hint and error message.
//
// Props:
// - label, name, value, onChange : the basics (controlled input)
// - error : error message string (shows the red error state)
// - hint  : small helper text under the field
// - type  : "text" (default), "number", ...
// - children : extra elements inside the field (e.g. a <datalist>)
// - any other props (min, max, step, inputMode, list, ...) go straight to <input>

const inputBase =
  'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2'

export default function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  type = 'text',
  children,
  ...rest
}) {
  const errorId = `${name}-error`

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-red-600/30'
            : 'border-slate-300 focus:border-teal-600 focus:ring-teal-600/30'
        }`}
        {...rest}
      />

      {children}

      {hint && !error && <p className="mt-1.5 text-sm text-slate-600">{hint}</p>}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
