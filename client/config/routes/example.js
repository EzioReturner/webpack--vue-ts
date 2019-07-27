/**
 * 我们建议将路由的name归纳至constans作为常量处理
 * RouterBus 为路由中介跳转组件，如有需要可自行添加
 */
import RouterBus from '@components/Router/RouterBus.vue';

import {
  EXAMPLE_INDEX,
  EXAMPLE_PAGE,
  EXAMPLE_BREADCRUMB,
  EXAMPLE_THIRD_INDEX,
  EXAMPLE_THIRD_TEST,
  EXAMPLE_HIDEPAGE
} from '@constants/routes';

export default {
  name: EXAMPLE_INDEX,
  path: 'example',
  component: RouterBus,
  redirect: '/example/page',
  icon: 'desktop',
  children: [
    {
      name: EXAMPLE_PAGE,
      path: 'page',
      icon: 'cloud',
      component: () => import(/* webpackChunkName: "page" */ '@views/example/page.vue')
    },
    {
      name: EXAMPLE_BREADCRUMB,
      path: 'breadcrumb',
      icon: 'smile',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/breadcrumb.vue')
    },
    {
      name: EXAMPLE_HIDEPAGE,
      path: 'hidePage',
      component: () => import(/* webpackChunkName: "breadcrumb" */ '@views/example/breadcrumb.vue'),
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
