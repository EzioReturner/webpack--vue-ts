/**
 * 我们推荐将路由所需的所有组件都放到中一个文件中管理
 * 如果你需要使用路由懒加载的功能，可以使用动态import
 * 举个栗子: const view = () => import('../view.vue');
 */
import example from './example';
import componentsExample from './componentsExample';

import { SKELETON, HOME_VIEW } from '@constants/routes';

export const constantRouterMap = [
  {
    // 主页
    path: '/',
    name: SKELETON,
    redirect: '/homeview',
    component: () => import(/* webpackChunkName: "basicLayout" */ '@views/skeleton/index.vue'),
    meta: {
      hiddenMenu: true
    },
    children: [
      {
        path: 'homeview',
        name: HOME_VIEW,
        icon: 'fund',
        component: () => import(/* webpackChunkName: "basicLayout" */ '@views/home/index.vue')
      },
      example,
      componentsExample,
      {
        path: '404',
        name: '404NotFound',
        icon: 'mobile-phone',
        meta: {
          hiddenMenu: true,
          pass: true
        },
        component: () =>
          import(/* webpackChunkName: "basicLayout" */ '@components/Exception/404.vue')
      }
    ]
  }
];
