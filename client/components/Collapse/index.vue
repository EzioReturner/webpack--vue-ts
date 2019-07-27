<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace, State } from 'vuex-class';
// @ts-ignore
import { SET_COLLAPSED_FN } from '@constants';
import style from './index.module.scss';
// @ts-ignore
import { CollapseConfig } from '@model/components/layout.model';

@Component
export default class LuckyueCollapsed extends Vue {
  @State(state => state.collapsed) _collapsed: boolean;
  @State(state => state.collapseConfig) collapseConfig: CollapseConfig;
  @Action(SET_COLLAPSED_FN) saveCollapsedFn: Function;

  handleCollapse() {
    this.saveCollapsedFn(!this._collapsed);
  }

  // onClick() {
  //   const { $listeners, item } = this;
  //   const { click: onClick } = $listeners;
  //   onClick && onClick(item);
  // }

  render(h: any) {
    const { _collapsed, handleCollapse, collapseConfig } = this;
    const { icon, style: _style } = collapseConfig;
    return (
      <a-icon
        type={icon || 'menu-fold'}
        style={_style}
        class={[style.collapsedIcon, _collapsed && style.collapsed]}
        onClick={handleCollapse}
      />
    );
  }
}
</script>
