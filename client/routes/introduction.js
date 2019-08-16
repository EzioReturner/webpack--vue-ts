/**
 * 我们建议将路由的name归纳至constans作为常量处理
 * RouterBus 为路由中介跳转组件，如有需要可自行添加
 */
import RouterBus from '@components/Router/RouterBus.vue';

import {
  INTRODUCTION_INDEX,
  INTRODUCTION_USE_JS,
  INTRODUCTION_USE_TS,
  INTRODUCTION_USE_TSX,
  INTRODUCTION_VUEX_TS,
  INTRODUCTION_THIRD_INDEX,
  INTRODUCTION_THIRD_TEST,
  INTRODUCTION_HIDEPAGE
} from '@constants/routes';

export default {
  name: INTRODUCTION_INDEX,
  path: 'introduction',
  component: RouterBus,
  redirect: '/introduction/useJs',
  icon: 'desktop',
  children: [
    {
      name: INTRODUCTION_USE_JS,
      path: 'useJs',
      icon: 'cloud',
      component: () => import(/* webpackChunkName: "page" */ '@views/introduction/home.vue')
    },
    {
      name: INTRODUCTION_USE_TS,
      path: 'useTs',
      icon: 'smile',
      component: () => import(/* webpackChunkName: "ts-example" */ '@views/introduction/ts.vue')
    },
    {
      name: INTRODUCTION_USE_TSX,
      path: 'useTsx',
      icon: 'flag',
      component: () => import(/* webpackChunkName: "tsx-example" */ '@views/introduction/tsx.vue')
    },
    {
      name: INTRODUCTION_VUEX_TS,
      path: 'vuexTs',
      icon: 'fire',
      component: () => import(/* webpackChunkName: "vuex-example" */ '@views/introduction/vuex.vue')
    },
    {
      name: INTRODUCTION_HIDEPAGE,
      path: 'hidePage',
      component: () => import(/* webpackChunkName: "hide" */ '@views/introduction/tsx.vue'),
      meta: {
        hiddenMenu: true
      }
    },
    {
      name: INTRODUCTION_THIRD_INDEX,
      path: 'thirdLevelMenu',
      component: RouterBus,
      icon: 'folder-open',
      children: [
        {
          name: INTRODUCTION_THIRD_TEST,
          path: 'test',
          icon: 'tag',
          component: () => import(/* webpackChunkName: "test" */ '@views/introduction/test.vue')
        }
      ]
    }
  ]
};
