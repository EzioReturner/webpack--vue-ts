import { Icon } from 'ant-design-vue';
import '@styles/spin.scss';

const spinDirective = {};
spinDirective.install = Vue => {
  Vue.use(Icon);

  /**
   * 创建spinDom
   */
  const createSpinDom = ({ spinClass, icon, tip, iconStyle }) => {
    const spinLoading = document.createElement('div');
    spinLoading.setAttribute(
      'class',
      `spining-loading ${spinClass || ''}`.replace(/(^\s*)|(\s*$)/, '')
    );
    spinLoading.setTip = tip => {
      const tipDom = spinLoading.getElementsByClassName('spining-text')[0];
      tipDom.innerText = tip || '数据加载中...';
    };

    const spinBody = document.createElement('div');
    spinBody.setAttribute(
      'class',
      `spining-icon ${icon ? '' : 'blizzard'}`.replace(/(^\s*)|(\s*$)/, '')
    );

    const spinText = document.createElement('span');
    spinText.setAttribute('class', 'spining-text');

    spinLoading.appendChild(spinBody);
    spinLoading.appendChild(spinText);
    spinLoading.setTip(tip);

    if (!icon) {
      for (let index = 0; index < 3; index++) {
        const idom = document.createElement('i');
        spinBody.appendChild(idom);
      }
    } else {
      let styles = '';
      if (iconStyle) {
        if (typeof iconStyle === 'string') {
          styles = iconStyle;
        } else if (typeof iconStyle === 'object') {
          styles = iconStyle
            ? Object.keys(iconStyle).reduce((total, key) => {
                const style = iconStyle[key];
                total += `${key}:${style};`;
                return total;
              }, '')
            : '';
        }
      }
      const spinner = Vue.extend({
        template: `<a-icon type="${icon}" style="${styles}"/>`
      });
      const loadingIcon = new spinner().$mount(document.createElement('div'));
      spinBody.appendChild(loadingIcon.$el);
    }

    return spinLoading;
  };

  /**
   * 初始化容器
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

  /**
   * 触发loading
   */
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
   * 注册spin
   */
  Vue.directive('spin', {
    bind: (el, binding) => {
      const tip = el.getAttribute('spin-tip');
      const icon = el.getAttribute('spin-icon');
      const iconStyle = el.getAttribute('spin-style');
      const spinClass = el.getAttribute('spin-class');
      const options = {
        tip,
        icon,
        iconStyle,
        spinClass
      };
      initSpinContainer(el);
      const spinLoading = createSpinDom(options);
      el.mask = spinLoading;
      el.setAttribute('class', `${el.className} spining-nested`);
      binding.value && toggleLoading(el, binding);
    },
    update: (el, binding) => {
      el.mask.setTip(el.getAttribute('spin-tip'));
      if (binding.value !== binding.oldValue) toggleLoading(el, binding);
    }
  });
};

export default spinDirective;
