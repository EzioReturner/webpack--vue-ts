<template>
  <div>
    <h2><span :class="styles.colorful">&</span> A sample vue page example</h2>
    <h3 :class="styles.title" style="margin-top:20px;">
      <span :class="styles.colorful">></span> view
    </h3>
    <div :class="styles.view">
      <span :class="styles.colorful">hellow,world</span>
      <span :class="homestyle.colors">goodbye,world</span>
      <Jsx />
    </div>
    <h3 :class="styles.title" style="margin-top:20px;">
      <span :class="styles.colorful">></span> Template
    </h3>
    <pre v-hljs>
      <code>{{templateCode}}</code>
    </pre>
    <h3 :class="styles.title"><span :class="styles.colorful">></span> script</h3>
    <pre v-hljs>
      <code>{{scriptCode}}</code>
    </pre>
  </div>
</template>

<script>
import styles from './index.module.scss';
import homestyle from './home.module.css';
import Jsx from './jsx';

export default {
  name: 'home',
  data() {
    return {
      styles: styles,
      homestyle: homestyle,
      templateCode: `<template>
  <div id="home">
    <span :class="styles.colorful">hellow,world</span>
    <span :class="homestyle.colors">goodbye,world</span>
    <Jsx />
  </div>
</template>`,
      scriptCode:
        `<script>
import styles from './index.module.scss';
import homestyle from './home.module.css';
import Jsx from './jsx';

export default {
  name: 'home',
  data() {
    return {
      styles: styles,
      homestyle: homestyle,
  },
  components: { Jsx },
  mounted() {}
};
</sc` + 'ript>'
    };
  },
  components: { Jsx },
  mounted() {}
};
</script>
