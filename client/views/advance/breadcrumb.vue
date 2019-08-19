<script>
import styles from './index.module.scss';
import { mapActions } from 'vuex';
import Breadcrumb from '@components/Breadcrumb';
import { remove, cloneDeep } from 'lodash';
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
    const { handleClickCrumb, crumbs, handleChangeCrumb, handleCloseCrumb } = this;
    return (
      <div>
        <h2>
          <span class={styles.colorful}>&</span> 面包屑
        </h2>
        <div class={styles.description}>
          WVTS中，默认自带的面包屑组件会自动监听路由变化并渲染。也可根据需要在任意位置创建crumb，看下面！
        </div>
        <div style="margin: 30px 0 0;">
          <h3 class={styles.title}>
            <span class={styles.colorful}>></span> 创建breadcrumb
          </h3>
          <a class={styles.link} onClick={() => handleChangeCrumb()}>
            点我试一下~
          </a>
        </div>
        <div style="margin-top:30px;">
          {crumbs.length > 0 && (
            <Breadcrumb on-click={handleClickCrumb} on-close={handleCloseCrumb} crumbs={crumbs} />
          )}
        </div>
      </div>
    );
  }
};
</script>
