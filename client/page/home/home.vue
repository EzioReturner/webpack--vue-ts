<template>
  <div id="home">
    <span :class="styles.colorful">hellow,world</span>
    <span :class="homestyle.colors">goodbye,world</span>
    <Jsx />
    <Ts />
    <Tsx />
  </div>
</template>
<script>
import styles from './index.module.scss';
import homestyle from './home.module.css';
import Jsx from './jsx';
import Ts from './ts';
import Tsx from './tsx';

export default {
  name: 'home',
  data() {
    return {
      styles: styles,
      homestyle: homestyle
    };
  },
  components: { Jsx, Ts, Tsx }
};
</script>
