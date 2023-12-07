export const getUserFromLocalStorage = (type) => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(type)) : null;
export const getPropsFromLocalStorage = (type) => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(type)) : null;
export const setLocalStorageProp_ = (type, value) => localStorage.setItem(type, JSON.stringify(value));