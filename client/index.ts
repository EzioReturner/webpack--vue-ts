import Vue from 'vue';
import HelloDecoratorComponent from './components/HelloDecorator.vue';

Vue.prototype.$message = '123';

new Vue({
  render: h => h(HelloDecoratorComponent)
}).$mount('#app');
