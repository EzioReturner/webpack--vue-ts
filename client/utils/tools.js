// 防抖
export function debounce(fn, wait = 300) {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

// 科学记数法
export function scientificNotation(value) {
  if (typeof value === 'undefined' || typeof value !== 'number' || value === null || isNaN(value)) {
    return false;
  }
  const _value = value.toString().split('');
  let total = '';
  for (let i = _value.length - 1, j = 1; i > -1; i--, j++) {
    const num = j % 3 === 0 ? `,${_value[i]}` : _value[i];
    total = num + total;
  }
  return total.replace(/^,/, '');
}

// 四舍五入保留预订小数
export function halfAdjust(value, fixedLength) {
  if (!value || !fixedLength) {
    console.log('you should provide a num and fixed length');
    return false;
  }
  const power = Math.pow(10, fixedLength);
  const powNum = value * power;
  const roundNum = Math.round(powNum);
  return roundNum / power;
}
