// ============================================
// src/utils/validators.js
// Form validation rules
// ============================================

export function isRequired(value) {
  const trimmed = (value || "").toString().trim();
  if (!trimmed) return { valid: false, message: "This field is required" };
  return { valid: true, message: "" };
}

export function isEmail(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return { valid: false, message: "Email is required" };
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(trimmed))
    return { valid: false, message: "Please enter a valid email address" };
  return { valid: true, message: "" };
}

export function minLength(value, min) {
  const str = (value || "").toString();
  if (str.length < min)
    return { valid: false, message: `Must be at least ${min} characters` };
  return { valid: true, message: "" };
}

export function isPhone(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return { valid: false, message: "Phone number is required" };
  const cleaned = trimmed.replace(/[\s-]/g, "");
  const pattern = /^(\+92|92|03)\d{9,10}$/;
  if (!pattern.test(cleaned))
    return { valid: false, message: "Please enter a valid phone number" };
  return { valid: true, message: "" };
}

export function validateForm(formData, rules) {
  const errors = {};
  for (const [field, checks] of Object.entries(rules)) {
    for (const check of checks) {
      const result = check(formData[field]);
      if (!result.valid) {
        errors[field] = result.message;
        break;
      }
    }
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
