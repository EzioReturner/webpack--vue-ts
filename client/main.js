import Vue from 'vue';
import './styles/main.scss';

// 注册antd组件
import AntdVueInit from './utils/antd-vue-init';
AntdVueInit();

// 注册highlight
import './utils/highlight-init';

// // 注册directives
import './utils/directives-init';

Vue.config.productionTip = false;

// 注册 router 钩子
import Component from 'vue-class-component';
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

import Router from '@components/Router';
import Store from './store/index';

new Vue({
  router: Router,
  store: Store,
  render: h => {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}).$mount('#app');
