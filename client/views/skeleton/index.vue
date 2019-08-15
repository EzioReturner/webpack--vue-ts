<template>
  <BasicLayout :editConfig="editConfig">
    <template #nav-siteTitle>
      <a :class="style.controlBut" target="_blank" rel="noopener noreferrer">
        <span :class="style.title">WVTS</span>
      </a>
    </template>
    <template #header-actions>
      <a
        :class="style.controlBut"
        style="margin-right:32px;font-size:18px;"
        @click="handleClickActions"
      >
        <a-icon type="logout" />
      </a>
    </template>
  </BasicLayout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BasicLayout from '@components/Layout/BasicLayout.vue';
import _style from './index.module.scss';

@Component({
  components: {
    BasicLayout
  }
})
export default class Skeleton extends Vue {
  private style: any = _style;
  private editConfig: any = {
    headerMode: 'split', // inline
    headerStyle: {
      color: 'blue'
    },
    navStyle: {
      color: 'blue'
    },
    mainStyle: {},
    collapse: {
      style: {},
      icon: '',
      position: 'header' // 'breadcrumb'
    }
  };
  handleClickActions() {}
}
</script>
