export const useStorage = () => {
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setTimeout(function () {
      removeItem(key);
    }, 3 * 60 * 1000);
  };

  const getItem = (key) => {
    let value = localStorage.getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {
      value = null;
    }

    return value;
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};
