<script>
import WvtsHeader from '@components/Layout/unit/Header.vue';
import WvtsNavigator from '@components/Layout/unit/Navigator.vue';
import styles from './index.module.scss';
export default {
  name: 'layout',
  render(h) {
    const detail = (
      <section>
        <div class={styles.mt}>
          <h2>
            <span class={styles.colorful}>></span> slots
          </h2>
          <div class={styles.mt1}>
            <h3>
              nav-siteTitle <h4 class={styles.tips}>菜单栏顶部title插槽</h4>
            </h3>
            <li class={styles.types}>
              类型：<span>VNode | string</span>
            </li>
          </div>
          <div class={styles.mt}>
            <h3>
              nav-siderMenu <h4 class={styles.tips}>菜单栏内容插槽 (如未提供则默认渲染路由菜单)</h4>
            </h3>
            <li class={styles.types}>
              类型：<span>VNode | string</span>
            </li>
          </div>
          <div class={styles.mt}>
            <h3>
              header-siteTitle <h4 class={styles.tips}>头部title插槽</h4>
            </h3>
            <li class={styles.types}>
              类型：<span>VNode | string</span>
            </li>
          </div>
          <div class={styles.mt}>
            <h3>
              header-actions <h4 class={styles.tips}>头部右侧功能栏</h4>
            </h3>
            <li class={styles.types}>
              类型：<span>VNode | string</span>
            </li>
          </div>
        </div>
        <div class={styles.mt}>
          <h2>
            <span class={styles.colorful}>></span> props
          </h2>
        </div>
        <div class={styles.mt1}>
          <h3>
            headerMode
            <h4 class={styles.tips}> 控制layout为左右布局或上下布局</h4>
          </h3>
          <li class={styles.types}>
            类型：<span>string</span>
          </li>
          <li class={styles.types}>
            accept：<span>split | inline</span>
          </li>
        </div>
        <div class={styles.mt}>
          <h3>
            headerStyle <h4 class={styles.tips}>header组件style</h4>
          </h3>
          <li class={styles.types}>
            类型：<span>object</span>
          </li>
        </div>
        <div class={styles.mt}>
          <h3>
            navStyle <h4 class={styles.tips}>nav组件style</h4>
          </h3>
          <li class={styles.types}>
            类型：<span>object</span>
          </li>
        </div>
        <div class={styles.mt}>
          <h3>
            mainStyle <h4 class={styles.tips}>main组件style</h4>
          </h3>
          <li class={styles.types}>
            类型：<span>object</span>
          </li>
        </div>
        <div class={styles.mt}>
          <h3>
            collapse <h4 class={styles.tips}>收缩按钮配置项</h4>
          </h3>
          <li class={styles.types}>
            类型：<span>object</span>
          </li>
          <li class={styles.types}>
            keys:{' '}
            <div>
              style: <span>object</span>
            </div>
            <div>
              icon: <span>string</span>
            </div>
            <div>
              position: <span>string</span>
            </div>
          </li>
        </div>
      </section>
    );

    const demo = (
      <section>
        <h2 class={styles.mt}>
          <span class={styles.colorful}>></span> demo
        </h2>
        <WvtsHeader>
          <div slot="siteTitle">siteTitle-slots</div>
          <div slot="actions">actions-slots</div>
        </WvtsHeader>
        <WvtsNavigator>
          <div slot="siteTitle">siteTitle-slots</div>
          <div slot="siderMenu" style="margin-top:20px;">
            siderMenu-slots
          </div>
        </WvtsNavigator>
      </section>
    );

    return (
      <div>
        <h2 class={styles.title}>
          <span class={styles.colorful}>#</span> layout 骨架
        </h2>
        <div class={styles.description}>
          WVTS中，提供了一套基础骨架方案，并提供了多个定制插槽，详细如下：
        </div>
        <div style="margin-top:40px;">
          <h2 class={styles.title}>
            <span class={styles.colorful}>&</span> BasicLayout{' '}
            <span class={styles.tips}>(layout耦合度较高不建议拆除使用)</span>
          </h2>
        </div>
        <section class={styles.section}>
          {detail}
          {demo}
        </section>
      </div>
    );
  }
};
</script>
