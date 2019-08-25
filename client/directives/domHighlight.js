/**
 * 高亮指令
 * 使用方法： 在dom上挂载 v-hl 指令
 * 例如
 * let query = '测'
 * <span v-hl="query">测试</span>
 * 可以提供 prop @param {string} hlDefault 来设置初始数据
 * 如果存在 hlDefault 将在 query 为空时用 hlDefault 覆盖el.innerHTML
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
    const _default = el.getAttribute('hlDefault');
    const text = _default || el.innerText;
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
        const _default = el.getAttribute('hlDefault');
        if (query) {
          renderHighligh(el, query);
        } else {
          el.innerHTML = _default || el.innerText;
        }
      });
    }
  });
};

export default hlDirective;
