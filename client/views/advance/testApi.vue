<script>
import styles from './index.module.scss';
import api from '@api/example';

const SCRIPT_CODE = `import io from '@utils/io';
export default {
  getTestApi(params) {
    return io.get('https://eziocloudmusicapi.leanapp.cn/artists?id=6452);
  }
};`;
const VIEW_CODE = `import api from '@api/example';
export default {
  methods: {
    requestApi() {
      api.getTestApi().then(res => {});
    }
  }
}`;
export default {
  name: 'testApi',
  data() {
    return {
      scriptCode: SCRIPT_CODE,
      viewCode: VIEW_CODE,
      visible: false,
      artist: {
        name: '',
        briefDesc: '',
        alias: [],
        picUrl: ''
      }
    };
  },
  created() {},
  methods: {
    requestApi() {
      api.getTestApi().then(res => {
        const { alias, briefDesc, name, picUrl } = res.data.artist;
        this.artist = {
          alias,
          briefDesc,
          name,
          picUrl
        };
        this.visible = true;
      });
    },
    onclose() {
      this.visible = false;
    }
  },
  render(h) {
    const {
      requestApi,
      visible,
      onclose,
      artist: { name, briefDesc, alias, picUrl }
    } = this;

    const DrawerTitle = (
      <div class={styles.drawerTitle}>
        <a-icon type="check-circle" />
        <span style="margin-left:8px;">请求成功</span>
      </div>
    );

    const _Script = (
      <div>
        <h3 class={styles.title} style="margin-top:20px;">
          <span class={styles.colorful}>></span> api script
        </h3>
        <pre v-hljs>
          <code>{this.scriptCode}</code>
        </pre>
      </div>
    );

    const Code = (
      <div>
        <h3 class={styles.title} style="margin-top:20px;">
          <span class={styles.colorful}>></span> view script
        </h3>
        <pre v-hljs>
          <code>{this.viewCode}</code>
        </pre>
      </div>
    );

    const IntroduceTitle = (
      <div>
        <div>
          <h2 style="display: inline-block;">
            <span class={styles.colorful}>&</span> request api
          </h2>
          <a class={styles.link} onClick={() => requestApi()}>
            点我试一下~
          </a>
        </div>
        <div class={styles.description}>
          WVTS提供了一份完整的前端IO方案，例如：我们现在请求一下接口数据
        </div>
      </div>
    );

    const DrawerBody = (
      <div>
        <img src={picUrl} style="height:150px;" />
        <h2 style="margin-top:25px;margin-bottom:6px;">{name}</h2>
        <span style="margin: -12px 0 12px 0;display:inline-block;">{alias.map(res => res)}</span>
        <h3>{briefDesc}</h3>
      </div>
    );

    return (
      <div>
        {IntroduceTitle}
        {_Script}
        {Code}
        <a-drawer
          placement="right"
          visible={visible}
          closable={false}
          on-close={onclose}
          width="512"
          wrapClassName={styles.wrapStyle}
        >
          <template slot="title">{DrawerTitle}</template>
          {DrawerBody}
        </a-drawer>
      </div>
    );
  }
};
</script>
