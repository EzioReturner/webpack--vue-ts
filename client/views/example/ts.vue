<template>
  <div>
    <h2 :class="styles.colorful">vue page use typescript</h2>
    <h3 :class="styles.title" style="margin-top:20px;"># view</h3>
    <div :class="styles.view">
      <span :class="styles.colorful">typescript</span>
      <Test />
    </div>
    <h3 :class="styles.title" style="margin-top:20px;"># Template</h3>
    <pre v-hljs>
      <code>{{templateCode}}</code>
    </pre>
    <h3 :class="styles.title"># script</h3>
    <pre v-hljs>
      <code>{{scriptCode}}</code>
    </pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './test.vue';
import _styles from './index.module.scss';

@Component({
  components: {
    Test
  }
})
class Ts extends Vue {
  public a: number = 123;
  public styles: any = _styles;
  public templateCode: string = `<template>
  <div>
    <div :class="styles.view">
      <span :class="styles.colorful">typescript</span>
      <Test />
    </div>
  </div>
</template>`;
  public scriptCode: string =
    `<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './test.vue';
import _styles from './index.module.scss';

@Component({
  components: {
    Test
  }
})
class Ts extends Vue {
  public a: number = 123;
  public styles: any = _styles;
}
export default Ts;
</sc` + 'ript>';
}
export default Ts;
</script>
