<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';
import Main from './main.vue';

@Component
class HelloDecorator extends Vue {
  public a: number = 123;
  render(h: any) {
    return (
      <div>
        {Main}
        <div class={styles.colorful}>42112345</div>
      </div>
    );
  }
}
export default HelloDecorator;
</script>

