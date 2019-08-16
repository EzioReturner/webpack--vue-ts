import Vue from 'vue';
import '@styles/loading.scss';

/**
 * 创建spinDom
 */
const createSpinDom = ({ lodingClass, icon, tip }) => {
  const spinLoading = document.createElement('div');
  spinLoading.setAttribute('class', `spining-loading ${lodingClass || ''}`);

  const spinBody = document.createElement('div');
  spinBody.setAttribute('class', `spining-icon ${icon ? '' : 'blizzard'}`);

  const spinText = document.createElement('span');
  spinText.setAttribute('class', 'spining-text');
  spinText.innerHTML = tip || '数据加载中...';

  spinLoading.appendChild(spinBody);
  spinLoading.appendChild(spinText);

  if (!icon) {
    for (let index = 0; index < 3; index++) {
      const idom = document.createElement('i');
      spinBody.appendChild(idom);
    }
  }

  return spinLoading;
};

/**
 * 检查node数量
 */
const checkNodeLength = el => {
  const childNodes = el.childNodes;
  if (childNodes.length > 1) {
    throw Error('spin container must have only one child element');
  }
  return childNodes[0];
};

/**
 * 添加loading
 */
const appendLoadingToNested = (el, VNode) => {
  const {
    data: { attrs }
  } = VNode;

  const options = attrs ? attrs.spinOptions : {};
  const spinLoading = createSpinDom(options);

  const firstChild = checkNodeLength(el);

  const fcClass = firstChild.className;
  const loadingClass = `${fcClass} spining-container spining-blur`;
  firstChild.setAttribute('class', loadingClass);
  el.insertBefore(spinLoading, firstChild);
};

/**
 * 移除loading
 */
const removeLoading = el => {
  const [firstChild, container] = el.childNodes;
  if (!container) {
    return;
  }
  let className = container.className;
  className = className
    .split(' ')
    .filter(name => name !== 'spining-blur')
    .join(' ');
  container.setAttribute('class', className);
  el.removeChild(firstChild);
};

/**
 * 注册指令
 */
Vue.directive('spin', {
  bind: (el, binding, VNode) => {
    const elClass = el.className;
    el.setAttribute('class', `${elClass} spining-nested`);
    if (!binding.value) {
      return;
    }
    appendLoadingToNested(el, VNode);
  },
  update: (el, binding, VNode) => {
    if (binding.value) {
      appendLoadingToNested(el, VNode);
    } else {
      removeLoading(el);
    }
  }
});

export default {};
