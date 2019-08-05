<template>
  <div id="home">
    <h2>this is use js page</h2>
    <span :class="styles.colorful">hellow,world </span>
    <span :class="homestyle.colors"> goodbye,world</span>
    <Jsx />
    <h2 :class="styles.title" style="margin-top:20px;">Template</h2>
    <pre v-hljs>
      <code>{{templateCode}}</code>
    </pre>
    <h2 :class="styles.title">script</h2>
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
      scriptCode: `import styles from './index.module.scss';
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
};`
    };
  },
  components: { Jsx },
  mounted() {}
};
</script>
