import Vue from 'vue';
import { Icon } from 'ant-design-vue';
import '@styles/spin.scss';

/**
 * 创建spinDom
 */
Vue.use(Icon);
const createSpinDom = ({ lodingClass, icon, tip, iconStyle }) => {
  const spinLoading = document.createElement('div');
  spinLoading.setAttribute(
    'class',
    `spining-loading ${lodingClass || ''}`.replace(/(^\s*)|(\s*$)/, '')
  );

  const spinBody = document.createElement('div');
  spinBody.setAttribute(
    'class',
    `spining-icon ${icon ? '' : 'blizzard'}`.replace(/(^\s*)|(\s*$)/, '')
  );

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
  } else {
    const styles = iconStyle
      ? Object.keys(iconStyle).reduce((total, key) => {
          const style = iconStyle[key];
          total += `${key}:${style};`;
          return total;
        }, '')
      : '';
    const spinner = Vue.extend({
      template: `<a-icon type="${icon}" style="${styles}"/>`
    });
    const loadingIcon = new spinner().$mount(document.createElement('div'));
    spinBody.appendChild(loadingIcon.$el);
  }

  return spinLoading;
};

/**
 * 检查node数量
 */
const initSpinContainer = el => {
  const childNodes = el.childNodes;
  if (childNodes.length > 1) {
    throw Error('spin container must have only one child element');
  }
  const fcClass = childNodes[0].className;
  const loadingClass = `${fcClass} spining-container`;
  childNodes[0].setAttribute('class', loadingClass.replace(/(^\s*)|(\s*$)/, ''));
  return childNodes[0];
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

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      const firstChild = el.childNodes[0];
      firstChild.setAttribute('class', `${firstChild.className} spining-blur`);
      const spinLoading = el.mask;
      el.insertBefore(spinLoading, firstChild);
    });
  } else {
    removeLoading(el);
  }
};

/**
 * 注册指令
 */
Vue.directive('spin', {
  bind: (el, binding, VNode) => {
    const {
      data: { attrs }
    } = VNode;
    initSpinContainer(el);
    const options = attrs ? attrs.spinOptions : {};
    const spinLoading = createSpinDom(options);
    el.mask = spinLoading;
    el.setAttribute('class', `${el.className} spining-nested`);
    binding.value && toggleLoading(el, binding);
  },
  update: (el, binding) => {
    if (binding.value !== binding.oldValue) toggleLoading(el, binding);
  }
});

export default {};
