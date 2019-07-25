<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';
import Main from './main.vue';
@Component
export default class HelloDecorator extends Vue {
  render(h: any) {
    return (
      <div>
        {Main}
        <div class={styles.colorful}>4122345</div>
      </div>
    );
  }
}
</script>

