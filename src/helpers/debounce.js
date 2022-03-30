export default (fn, delayInMs) => {
  let timer = null;

  return (event) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => fn(event), delayInMs);
  };
};
