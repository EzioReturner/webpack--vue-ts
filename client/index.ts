import Vue from 'vue';
import HelloDecoratorComponent from './components/HelloDecorator.vue';

new Vue({
  render: h => h(HelloDecoratorComponent)
}).$mount('#app');
