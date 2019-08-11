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
/**
 * BasicLayout provied 4 slots, as below
 * @param {nav-siteTitle} :nav-title slot
 * @param {nav-siderMenu} :nav-sider-menu slot & if you don`t provide this slots luckyue will render route menu default
 * @param {header-siteTitle} :header-title, position in left side
 * @param {header-actions} :header-actions, positon in right side was used to render user actions like logout and more
 *
 * props @param {editConfig} :Contains the following parameters
 * @headerMode provide two mode @split || @inline
 * @headerStyle rewrite the whole header component style
 * @navStyle rewrite the whole nav component style
 * @mainStyle rewrite the whole main component style
 * @collapse this property provide these parametes as below
 *    @param {style} :rewrite the whole collapse component style
 *    @param {icon} :rewrite the collapse`s icon reference antd-icon
 *    @param {position} :decide the collapse component to place in where @header || @breadcrumb
 */
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
