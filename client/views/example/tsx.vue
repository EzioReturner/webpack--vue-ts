<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';

/* eslint-disable */
@Component
class Tsx extends Vue {
  public a: number = 123;
  public styles: any = styles;
  public templateCode: string =
    `<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './test.vue';
import styles from './index.module.scss';

@Component
class Tsx extends Vue {
  public a: number = 123;
  public styles: any = styles;

  render(h: any) {
    return (
      <div>
        <div class={styles.view}>
          <div class={styles.colorful}>tttttssssssxxxxxx</div>
          <Test />
        </div>
      </div>
    );
  }
}
export default Tsx;
</scr` + 'ipt>';

  render(h: any) {
    const { templateCode } = this;
    const Test1 = <div>test display!</div>;

    return (
      <div>
        <h2 class={styles.colorful}>vue page use tsx</h2>
        <h3 class={styles.title} style="margin-top:20px;">
          view
        </h3>
        <div class={styles.view}>
          <div class={styles.colorful}>tttttssssssxxxxxx</div>
          {Test1}
        </div>
        <h3 class={styles.title} style="margin-top:20px;margin-bottom:0;">
          script
        </h3>
        <pre v-hljs>
          <code>{templateCode}</code>
        </pre>
      </div>
    );
  }
}
export default Tsx;
</script>
