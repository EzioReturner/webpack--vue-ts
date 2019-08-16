import Vue from 'vue';
import '@styles/loading.scss';

const createSpinDom = () => {
  const spinLoading = document.createElement('div');
  spinLoading.setAttribute('class', 'spining-loading');

  const spinBody = document.createElement('div');
  spinBody.setAttribute('class', 'spining-body blizzard');

  spinLoading.appendChild(spinBody);
  for (let index = 0; index < 3; index++) {
    const idom = document.createElement('i');
    spinBody.appendChild(idom);
  }
  return spinLoading;
};

Vue.directive('spin', {
  bind: (el, binding, VNode) => {
    if (!binding.value) {
      return;
    }
    const spinLoading = createSpinDom();

    const elClass = el.className;
    el.setAttribute('class', `${elClass} spining-nested`);

    const childNodes = el.childNodes;
    if (childNodes.length > 1) {
      throw Error('spin contaniner must have only one child element');
    }
    const firstChild = el.childNodes[0];
    const fcClass = firstChild.className;
    firstChild.setAttribute('class', `${fcClass} spining-container spining-blur`);
    el.insertBefore(spinLoading, firstChild);
  },
  update: (el, binding, VNode) => {
    console.log(el);
    console.log(binding);
  }
});
export default {};
