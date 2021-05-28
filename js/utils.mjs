//debouncing, helps us from making too many API requests
const debounce = (func, delay = 200) => {
  let timeoutId;
  //the wrapper function
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      //.apply keeps track of how many arguments need to be passed through
      func.apply(null, args);
    }, delay);
  };
};

export { debounce };
