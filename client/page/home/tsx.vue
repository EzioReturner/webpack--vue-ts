<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './test.vue';
import styles from './index.module.scss';

@Component
class Tsx extends Vue {
  public a: number = 123;
  public styles: any = styles;

  render(h: any) {
    return <div class={styles.colorful}>tttttssssssxxxxxx</div>;
  }
}
export default Tsx;
</script>
