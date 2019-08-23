/**
 * dom高亮指令
 */

const hlDirective = {};
hlDirective.install = Vue => {
  const createHighlightText = text => {
    const hlDOM = document.createElement('span');
    hlDOM.innerText = text;
    hlDOM.style.color = '#409EFF';
    return hlDOM;
  };

  const renderHighligh = (el, query, elInnerText) => {
    const text = el.innerText || elInnerText;
    const container = document.createElement('span');
    const splits = text.split(query);
    const existEmpty = splits.some(res => !res);
    existEmpty
      ? splits.forEach(letter => {
          const dom = letter ? document.createTextNode(letter) : createHighlightText(query);
          container.appendChild(dom);
        })
      : splits.forEach((letter, index) => {
          const letterSpan = document.createTextNode(letter);
          const querySpan = createHighlightText(query);
          container.appendChild(letterSpan);
          index !== splits.length - 1 && container.appendChild(querySpan);
        });
    el.innerHTML = container.innerHTML;
  };

  Vue.directive('hl', {
    bind: (el, binding) => {
      const query = binding.value;
      query && renderHighligh(el, query);
    },
    update: (el, binding) => {
      Vue.nextTick(() => {
        const query = binding.value;
        query && renderHighligh(el, query);
      });
    }
  });
};

export default hlDirective;
