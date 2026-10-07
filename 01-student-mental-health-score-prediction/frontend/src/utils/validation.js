/* ---------------------------------------------------------------
   Options for dropdowns and radios.
   These match the allowed values in the FastAPI (Pydantic) model.
---------------------------------------------------------------- */
export const GENDERS = ['Male', 'Female']
export const ACADEMIC_LEVELS = ['High School', 'Undergraduate', 'Graduate']
export const PLATFORMS = [
  'Facebook', 'Instagram', 'KakaoTalk', 'LINE', 'LinkedIn', 'Snapchat',
  'TikTok', 'Twitter', 'VKontakte', 'WeChat', 'WhatsApp', 'YouTube',
]
export const PURPOSES = ['Education', 'Entertainment', 'Networking', 'News']
export const STRESS_LEVELS = ['Low', 'Medium', 'High', 'Very High']
export const COUNTRY_SUGGESTIONS = [
  'Australia', 'Canada', 'France', 'Germany', 'India',
  'Mexico', 'Turkey', 'UK', 'USA',
]

/* ---------------------------------------------------------------
   Validation rules (same limits as the API).
---------------------------------------------------------------- */
export const NUMBER_RULES = {
  age: { min: 10, max: 100, integer: true },
  avg_daily_usage_hours: { min: 0, max: 24 },
  daily_unlocks: { min: 0, integer: true },
  study_hours: { min: 0, max: 24 },
  physical_activity_hours: { min: 0, max: 24 },
  sleep_hours_per_night: { min: 0, max: 24 },
}

export const REQUIRED_CHOICES = [
  'gender',
  'academic_level',
  'most_used_platform',
  'purpose_of_use',
  'stress_level',
]

// Starting values for the form: every field is an empty string.
export const INITIAL_VALUES = {
  age: '',
  gender: '',
  country: '',
  academic_level: '',
  most_used_platform: '',
  purpose_of_use: '',
  avg_daily_usage_hours: '',
  daily_unlocks: '',
  study_hours: '',
  physical_activity_hours: '',
  sleep_hours_per_night: '',
  stress_level: '',
}

/* ---------------------------------------------------------------
   validate(values)
   Returns an object like { age: 'Enter a value between 10 and 100.' }.
   An empty object means the form is valid.
---------------------------------------------------------------- */
export function validate(values) {
  const errors = {}

  // Number fields
  for (const [name, rule] of Object.entries(NUMBER_RULES)) {
    const raw = String(values[name]).trim()
    const num = Number(raw)

    if (raw === '') {
      errors[name] = 'This field is required.'
    } else if (Number.isNaN(num)) {
      errors[name] = 'Enter a valid number.'
    } else if (rule.integer && !Number.isInteger(num)) {
      errors[name] = 'Enter a whole number.'
    } else if (rule.max !== undefined && (num < rule.min || num > rule.max)) {
      errors[name] = `Enter a value between ${rule.min} and ${rule.max}.`
    } else if (num < rule.min) {
      errors[name] = `Enter ${rule.min} or more.`
    }
  }

  // Dropdowns and radios
  for (const name of REQUIRED_CHOICES) {
    if (values[name] === '') errors[name] = 'Please choose an option.'
  }

  // Free text
  if (values.country.trim() === '') errors.country = 'Please enter your country.'

  return errors
}

/* ---------------------------------------------------------------
   buildPayload(values)
   Turns the form's strings into the types the API expects
   (numbers for number fields, trimmed text for country).
---------------------------------------------------------------- */
export function buildPayload(values) {
  const payload = { ...values, country: values.country.trim() }
  for (const name of Object.keys(NUMBER_RULES)) {
    payload[name] = Number(values[name])
  }
  return payload
}
