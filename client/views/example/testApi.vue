<script>
import styles from './index.module.scss';
import api from '@api/example';
export default {
  name: 'testApi',
  data() {
    return {
      scriptCode: `import io from '@utils/io';
export default {
  getTestApi(params) {
    return io.get('https://eziocloudmusicapi.leanapp.cn/search?keywords= 海阔天空');
  }
};`,
      viewCode: `import api from '@api/example';
export default {
  methods: {
    requestApi() {
      api.getTestApi({ keyword: '海阔天空' }).then(res => {});
    }
  }
}`
    };
  },
  created() {
    this.requestApi();
  },
  methods: {
    requestApi() {
      api.getTestApi({ keyword: '海阔天空' }).then(res => {});
    }
  },
  render(h) {
    return (
      <div>
        <h2>
          <span class={styles.colorful}>&</span> request api
        </h2>
        <h3 class={styles.title} style="margin-top:20px;">
          <span class={styles.colorful}>></span> io script
        </h3>
        <pre v-hljs>
          <code>{this.scriptCode}</code>
        </pre>
        <h3 class={styles.title} style="margin-top:20px;">
          <span class={styles.colorful}>></span> view script
        </h3>
        <pre v-hljs>
          <code>{this.viewCode}</code>
        </pre>
      </div>
    );
  }
};
</script>
