// Changes the title of Homepage
export function ArrayPlusDelay(array, delegate, delay) {
  var i = 0;
  var interval = setInterval(function () {
    delegate(array[i]);

    if (i++ >= array.length - 1) clearInterval(interval);
    // loop would be i=0
  }, delay);
  return interval;
}
