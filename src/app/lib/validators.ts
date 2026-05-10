export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-().]{7,20}$/.test(phone)
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}
