export function formatCurrency(price) {
  if (typeof price !== 'number') {
    price = Number(price)
    if (isNaN(price)) return ''
  }

  return price.toLocaleString('vi-VN') + 'VND'
}

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalStorege = (key) => {
  return JSON.parse(localStorage.getItem(key)) 
} 