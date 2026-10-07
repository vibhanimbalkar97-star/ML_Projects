import { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import {
  GENDERS,
  ACADEMIC_LEVELS,
  PLATFORMS,
  PURPOSES,
  STRESS_LEVELS,
  COUNTRY_SUGGESTIONS,
  INITIAL_VALUES,
  validate,
  buildPayload,
} from "../utils/validation";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600";

/* ---------------------------------------------------------------
   The form component.
   Props (both optional):
   - onSubmit(payload): called with the validated data
   - isLoading: disables the button while a request is running
---------------------------------------------------------------- */
export default function PredictionForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  // One handler for every input: update the field that changed.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Remove that field's error as soon as the user edits it.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus the first invalid field in page order (this also scrolls to it)
      Array.from(e.currentTarget.elements)
        .find((el) => newErrors[el.name])
        ?.focus();
      return;
    }

    onSubmit(buildPayload(formData));
  };

  const handleReset = () => {
    setFormData(INITIAL_VALUES);
    setErrors({});
  };

  // The four props every reusable field needs, in one place.
  const field = (name) => ({
    name,
    value: formData[name],
    onChange: handleChange,
    error: errors[name],
  });

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        Your information
      </h2>
      <p className="mt-1 text-sm text-slate-600">All fields are required.</p>

      {hasErrors && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          Please fix the highlighted fields and try again.
        </div>
      )}

      {/* 1 column on mobile, 2 columns from the sm breakpoint up */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          label="Age"
          type="number"
          min="10"
          max="100"
          step="1"
          inputMode="numeric"
          hint="Between 10 and 100."
          {...field("age")}
        />

        {/* Gender uses radio buttons, so it has a fieldset instead of a single input */}
        <fieldset aria-describedby={errors.gender ? "gender-error" : undefined}>
          <legend className="mb-1.5 block text-sm font-medium text-slate-800">
            Gender
          </legend>
          <div className="flex gap-6 pt-2.5">
            {GENDERS.map((option) => (
              <label
                key={option}
                className="flex items-center text-sm text-slate-800"
              >
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="h-4 w-4 border-slate-300 text-teal-700 focus:ring-2 focus:ring-teal-600"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p
              id="gender-error"
              className="mt-1.5 text-sm font-medium text-red-700"
            >
              {errors.gender}
            </p>
          )}
        </fieldset>

        <FormInput
          label="Country"
          list="country-options"
          autoComplete="off"
          hint="Pick a suggestion or type your country."
          {...field("country")}
        >
          <datalist id="country-options">
            {COUNTRY_SUGGESTIONS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </FormInput>

        <FormSelect
          label="Academic level"
          options={ACADEMIC_LEVELS}
          {...field("academic_level")}
        />

        <FormInput
          label="Sleep per night (hours)"
          type="number"
          min="0"
          max="24"
          step="0.1"
          inputMode="decimal"
          hint="Between 0 and 24."
          {...field("sleep_hours_per_night")}
        />

        <FormInput
          label="Study hours per day"
          type="number"
          min="0"
          max="24"
          step="0.1"
          inputMode="decimal"
          hint="Between 0 and 24."
          {...field("study_hours")}
        />

        <FormInput
          label="Physical activity per day (hours)"
          type="number"
          min="0"
          max="24"
          step="0.1"
          inputMode="decimal"
          hint="Between 0 and 24."
          {...field("physical_activity_hours")}
        />

        <FormSelect
          label="Stress level"
          options={STRESS_LEVELS}
          {...field("stress_level")}
        />

        <FormSelect
          label="Most used social media platform"
          options={PLATFORMS}
          {...field("most_used_platform")}
        />

        <FormSelect
          label="Main purpose of use"
          options={PURPOSES}
          {...field("purpose_of_use")}
        />

        <FormInput
          label="Social media use per day (hours)"
          type="number"
          min="0"
          max="24"
          step="0.1"
          inputMode="decimal"
          hint="Between 0 and 24."
          {...field("avg_daily_usage_hours")}
        />

        <FormInput
          label="Phone unlocks per day"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          hint="A whole number, 0 or more."
          {...field("daily_unlocks")}
        />
      </div>

      {/* Buttons: stacked on mobile, side by side from sm up */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${focusRing}`}
        >
          {isLoading ? "Predicting…" : "Predict Score"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className={`inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${focusRing}`}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
