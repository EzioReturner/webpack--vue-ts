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
      `spining-mask ${spinClass || ''}`.replace(/(^\s*)|(\s*$)/g, '')
    );
    spinLoading.setTip = tip => {
      const tipDom = spinLoading.getElementsByClassName('spining-text')[0];
      tipDom.innerText = tip || '数据加载中...';
    };

    spinLoading.hide = () => {
      spinLoading.setAttribute('class', `${spinLoading.className} hidding`);
    };

    spinLoading.unhide = () => {
      let className = spinLoading.className
        .split(' ')
        .filter(name => name !== 'hidding')
        .join(' ');
      spinLoading.setAttribute('class', `${className}`);
    };

    const spinBody = document.createElement('div');
    spinBody.setAttribute(
      'class',
      `spining-icon ${icon ? '' : 'blizzard'}`.replace(/(^\s*)|(\s*$)/g, '')
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
          styles = Object.keys(iconStyle).reduce((total, key) => {
            const style = iconStyle[key];
            total += `${key}:${style};`;
            return total;
          }, '');
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
   * 移除loading
   */
  const removeLoading = (target, el) => {
    el.mask.hide();
    setTimeout(() => {
      el.mask.unhide();
      target.removeChild(el.mask);
    }, 300);
  };

  /**
   * 触发loading
   */
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      const spinLoading = el.mask;
      Vue.nextTick(() => {
        if (binding.modifiers.fullScreen) {
          document.body.appendChild(spinLoading);
        } else {
          el.appendChild(spinLoading);
        }
      });
    } else {
      const target = binding.modifiers.fullScreen ? document.body : el;
      removeLoading(target, el);
    }
  };

  /**
   * 注册spin
   */
  Vue.directive('spin', {
    bind: (el, binding, VNode) => {
      const tip = el.getAttribute('spin-tip');
      const icon = el.getAttribute('spin-icon');
      const iconStyle =
        el.getAttribute('spin-style') === '[object Object]'
          ? VNode.data.attrs['spin-style']
          : el.getAttribute('spin-style');
      const spinClass = el.getAttribute('spin-class');
      const options = {
        tip,
        icon,
        iconStyle,
        spinClass
      };

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
