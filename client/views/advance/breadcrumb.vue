<script>
import { mapActions } from 'vuex';
import Breadcrumb from '@components/Breadcrumb';
import { remove, cloneDeep } from 'lodash';
import styles from './index.module.scss';
export default {
  name: 'breadCrumbExmaple',
  data() {
    return {
      crumbs: [],
      index: 0
    };
  },
  methods: {
    handleClickCrumb({ name }) {
      this.$notify.success({
        message: `click: ${name}`
      });
    },
    handleCloseCrumb({ name, id }) {
      remove(this.crumbs, c => c.id === id);
      this.crumbs = cloneDeep(this.crumbs);
      this.$notify.warning({
        message: `close: ${name}`
      });
    },
    handleChangeCrumb() {
      this.index++;
      this.crumbs.push({
        name: `crumb ${this.index}`,
        id: Math.random()
          .toString(36)
          .substr(2)
      });
    }
  },
  render(h) {
    const { handleClickCrumb, crumbs, handleChangeCrumb, handleCloseCrumb, crumbsCode } = this;
    return (
      <div>
        <h2>
          <span class={styles.colorful}>&</span> 面包屑
        </h2>
        <div class={styles.description}>
          WVTS中，默认自带的面包屑组件会自动监听路由变化并渲染。也可根据需要在任意位置创建crumb，看下面！
        </div>
        <div class={styles.mt}>
          <h3 class={styles.title}>
            <span class={styles.colorful}>></span> 创建breadcrumb
          </h3>
          <a class={styles.link} onClick={() => handleChangeCrumb()}>
            点我试一下~
          </a>
        </div>
        <div class={styles.mt}>
          {crumbs.length > 0 && (
            <Breadcrumb
              on-click={handleClickCrumb}
              on-close={handleCloseCrumb}
              crumbs={crumbs}
              propClass={styles.crumbClass}
            />
          )}
        </div>
        <div class={styles.mt}>
          <h2>
            <span class={styles.colorful}>&</span> props
          </h2>
          <h3 class={styles.mt1}>crumbs</h3>
          <li class={styles.types}>
            类型：<span>Crumbs[]</span>
          </li>
          <h3 class={styles.mt}>propClass</h3>
          <li class={styles.types}>
            类型：<span>string</span>
          </li>
          <h3 class={styles.mt}>propStyle</h3>
          <li class={styles.types}>
            类型：<span>string | object</span>
          </li>
        </div>
        <div class={styles.mt2}>
          <h2>
            <span class={styles.colorful}>&</span> event
          </h2>
          <h3 class={styles.mt1}>click</h3>
          <li class={styles.types}>
            类型：<span>$event</span>
          </li>
          <h3 class={styles.mt1}>close</h3>
          <li class={styles.types}>
            类型：<span>$event</span>
          </li>
        </div>
      </div>
    );
  }
};
</script>
