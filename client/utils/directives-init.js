import Vue from 'vue';

Vue.directive('spin', {
  inserted: el => {
    console.log(el);
    const spinLoading = document.createElement('div');
    spinLoading.setAttribute('class', 'spining-loading');
    const elClass = el.className;
    el.setAttribute('class', `${elClass} spining-container`);
  },
  update: (el, binding) => {
    console.log(el);
    console.log(binding);
  }
});
export default {};
