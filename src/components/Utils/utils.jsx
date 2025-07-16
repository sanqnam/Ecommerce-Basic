export function formatCurrency(price) {
  if (typeof price !== 'number') {
    price = Number(price)
    if (isNaN(price)) return ''
  }

  return price.toLocaleString('vi-VN') + 'VND'
}
// lưu lịch sử đã xem
export const saveProductToHistory = (product) => {
  let history = getLocalStorege('viewHistory') || [];
  const exists = history.find(item => item._id.$oid === product._id.$oid);

  if (!exists) {
    history.unshift(product);
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    // Lưu lại vào localStorage
    setLocalStorage('viewHistory', history);
  }
};

// favorite product
export const toggleFavorite = (product) => {
  let favorites = getLocalStorege('favorites') || [];
  const exists = favorites.find(item => item._id.$oid === product._id.$oid);
  if (exists) {
    // Nếu đã có thì xóa khỏi favorites
    favorites = favorites.filter(item => item._id.$oid !== product._id.$oid);
  } else {
    // Nếu chưa có thì thêm vào favorites
    favorites.push(product);
  }
  setLocalStorage('favorites',favorites);
  return favorites;
};

// Kiểm tra sản phẩm có trong favorite không
export const isFavorite = (productId) => {
  const favorites = getLocalStorege('favorites') || [];
  return favorites.some(item => item._id.$oid === productId);
};

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