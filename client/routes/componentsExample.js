import RouterBus from '@components/Router/RouterBus.vue';

import {
  COMPONENT_EXAMPLE_INDEX,
  COMPONENT_EXAMPLE_ROUTER,
  COMPONENT_EXAMPLE_BREADCRUMB,
  COMPONENT_EXAMPLE_LAYOUT
} from '@constants/routes';

export default {
  name: COMPONENT_EXAMPLE_INDEX,
  path: 'uiGuide',
  component: RouterBus,
  redirect: '/uiGuide/router',
  icon: 'robot',
  children: [
    {
      name: COMPONENT_EXAMPLE_ROUTER,
      path: 'router',
      icon: 'interation',
      component: () => import(/* webpackChunkName: "page" */ '@views/componentsExample/router.vue')
    },
    {
      name: COMPONENT_EXAMPLE_BREADCRUMB,
      path: 'breadcrumb',
      icon: 'read',
      component: () =>
        import(/* webpackChunkName: "page" */ '@views/componentsExample/breadcrumb.vue')
    },
    {
      name: COMPONENT_EXAMPLE_LAYOUT,
      path: 'layout',
      icon: 'appstore',
      component: () => import(/* webpackChunkName: "page" */ '@views/componentsExample/layout.vue')
    }
  ]
};
