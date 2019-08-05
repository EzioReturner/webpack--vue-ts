<template>
  <div>
    <span :class="styles.colorful">tsssssssssss</span>
    <Test />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './test.vue';
import styles from './index.module.scss';

@Component({
  components: {
    Test
  }
})
class Ts extends Vue {
  public a: number = 123;
  public styles: any = styles;
}
export default Ts;
</script>
