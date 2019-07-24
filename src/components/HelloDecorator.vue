<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';

@Component
export default class HelloDecorator extends Vue {
  render(h: any) {
    return (
      <div>
        123
        <div>123</div>
      </div>
    );
  }
}
</script>

