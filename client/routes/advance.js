import RouterBus from '@components/Router/RouterBus.vue';

import {
  ADVANCE_INDEX,
  ADVANCE_ROUTER,
  ADVANCE_BREADCRUMB,
  ADVANCE_LAYOUT,
  ADVANCE_REQUEST_API
} from '@constants/routes';

export default {
  name: ADVANCE_INDEX,
  path: 'advance',
  component: RouterBus,
  redirect: '/advance/router',
  icon: 'robot',
  children: [
    {
      name: ADVANCE_ROUTER,
      path: 'router',
      icon: 'interation',
      component: () => import(/* webpackChunkName: "page" */ '@views/advance/router.vue')
    },
    {
      name: ADVANCE_BREADCRUMB,
      path: 'breadcrumb',
      icon: 'read',
      component: () => import(/* webpackChunkName: "page" */ '@views/advance/breadcrumb.vue')
    },
    {
      name: ADVANCE_LAYOUT,
      path: 'layout',
      icon: 'appstore',
      component: () => import(/* webpackChunkName: "page" */ '@views/advance/layout.vue')
    },
    {
      name: ADVANCE_REQUEST_API,
      path: 'requestApi',
      icon: 'rocket',
      component: () => import(/* webpackChunkName: "requestApi" */ '@views/advance/testApi')
    }
  ]
};
