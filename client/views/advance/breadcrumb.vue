<script>
import styles from './index.module.scss';
export default {
  name: 'breadCrumbExmaple',
  methods: {
    handleChangeCrumb() {}
  },
  render(h) {
    const { handleChangeCrumb } = this;
    return (
      <div>
        <h2>
          <span class={styles.colorful}>&</span> 面包屑
        </h2>
        <div class={styles.description}>
          WVTS中，面包屑组件会自动监听路由变化并渲染。如需手动改变面包屑可以调用store方法，具体如下：
        </div>
        <div style="margin: 30px 0 0;">
          <h3 class={styles.title}>
            <span class={styles.colorful}>></span> 修改breadcrumb
          </h3>
          <a class={styles.link} onClick={() => handleChangeCrumb()}>
            点我试一下~
          </a>
        </div>
      </div>
    );
  }
};
</script>
