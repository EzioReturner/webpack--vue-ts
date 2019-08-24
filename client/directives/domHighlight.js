/**
 * 高亮指令
 */

const hlDirective = {};
hlDirective.install = Vue => {
  const createHighlightText = text => {
    const hlDOM = document.createElement('span');
    hlDOM.innerText = text;
    hlDOM.style.color = '#409EFF';
    return hlDOM;
  };

  const checkText = (dom, text, query) => {
    const index = text.indexOf(query);
    if (index < 0) {
      dom.appendChild(document.createTextNode(text));
      return dom;
    }
    const queryScope = index + query.length;
    const head = text.slice(0, index);
    const surplus = text.substr(queryScope);
    dom.appendChild(document.createTextNode(head));
    dom.appendChild(createHighlightText(query));
    return checkText(dom, surplus, query);
  };

  const renderHighligh = (el, query) => {
    const text = el.innerText;
    let container = document.createElement('span');
    if (text === query) {
      container = createHighlightText(query);
    } else {
      container = checkText(container, text, query);
    }
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
