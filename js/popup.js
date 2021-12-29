const debounce = (func, wait = 100) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

const convert = (value, rate) => Number(value * rate).toFixed(2);

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch("https://api.exchangeratesapi.io/latest?symbols=INR&base=USD")
  const data = await res.json();
  const fx = data?.rates?.INR || 75;
  const rate = 10 / fx;

  const source= document.getElementById('source');
  const target = document.getElementById('target');
  source.onkeydown = debounce(event => {
    target.innerHTML = convert(Number(event.target.value), rate);
  });
}, false);
