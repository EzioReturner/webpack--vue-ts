<script>
import styles from './index.module.scss';
export default {
  name: 'routerExmaple',
  data() {
    return {
      templateCode: `
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
};`
    };
  },
  render(h) {
    return (
      <div>
        <h2>
          <span class={styles.colorful}>&</span> 路由
        </h2>
        <div class={styles.description}>
          WVTS中，默认自带了基于中心化管理的路由模式，将通过路由配置项自动渲染菜单
        </div>
        <h3 class={styles.title} style="margin-top:20px;">
          <span class={styles.colorful}>></span> 一个简单的路由配置如下：
        </h3>
        <pre v-hljs>
          <code>{this.templateCode}</code>
        </pre>
      </div>
    );
  }
};
</script>
