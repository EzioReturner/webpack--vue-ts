/**
 * 我们建议将路由的name归纳至constans作为常量处理
 * RouterBus 为路由中介跳转组件，如有需要可自行添加
 */
import RouterBus from '@components/Router/RouterBus.vue';

import {
  EXAMPLE_INDEX,
  EXAMPLE_USEJS,
  EXAMPLE_USETS,
  EXAMPLE_USETSX,
  EXAMPLE_VUEXTS,
  EXAMPLE_THIRD_INDEX,
  EXAMPLE_THIRD_TEST,
  EXAMPLE_HIDEPAGE
} from '@constants/routes';

export default {
  name: EXAMPLE_INDEX,
  path: 'example',
  component: RouterBus,
  redirect: '/example/home',
  icon: 'desktop',
  children: [
    {
      name: EXAMPLE_USEJS,
      path: 'useJs',
      icon: 'cloud',
      component: () => import(/* webpackChunkName: "page" */ '@views/example/home.vue')
    },
    {
      name: EXAMPLE_USETS,
      path: 'useTs',
      icon: 'smile',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/ts.vue')
    },
    {
      name: EXAMPLE_USETSX,
      path: 'useTsx',
      icon: 'smile',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/tsx.vue')
    },
    {
      name: EXAMPLE_VUEXTS,
      path: 'vuexTs',
      icon: 'smile',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/vuex.vue')
    },
    {
      name: EXAMPLE_HIDEPAGE,
      path: 'hidePage',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/tsx.vue'),
      meta: {
        hiddenMenu: true
      }
    },
    {
      name: EXAMPLE_THIRD_INDEX,
      path: 'thirdLevelMenu',
      component: RouterBus,
      icon: 'folder-open',
      children: [
        {
          name: EXAMPLE_THIRD_TEST,
          path: 'test',
          icon: 'tag',
          component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/test.vue')
        }
      ]
    }
  ]
};
