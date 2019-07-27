<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, namespace, State } from 'vuex-class';
import LuckyueHeader from './unit/Header.vue';
import LuckyueNavigator from './unit/Navigator.vue';
import LuckyueMainContainer from './unit/MainContainer.vue';
import style from './BasicLayout.module.scss';
// @ts-ignore
import { SET_COLLAPSE_CONFIG_FN } from '@constants/index';

@Component
export default class BasicLayout extends Vue {
  @Prop(Object) readonly editConfig: any;
  @State(state => state.collapsed) _collapsed: any;
  @Action(SET_COLLAPSE_CONFIG_FN) setCollapseConfigFN: Function;

  mounted() {
    const { collapse } = this.editConfig;
    this.setCollapseConfigFN(collapse);
  }
  /**
   * 获取 slots 方法
   */
  getSlots(): any {
    const { $scopedSlots } = this;

    if (!$scopedSlots) {
      return;
    }
    return Object.keys($scopedSlots).reduce((total: any, slot: string) => {
      const [type, slotName] = slot.split('-');
      if (!['header', 'nav'].includes(type)) {
        console.warn('Luckyue', '[BasicLayout]:', '组件未按约定传参');
        return;
      }
      if (!slotName) {
        console.warn('Luckyue', '[BasicLayout]:', '组件未按约定传参');
        return;
      }
      !total[`${type}Slots`] && (total[`${type}Slots`] = {});

      const scope_slot = $scopedSlots[slot];
      scope_slot && (total[`${type}Slots`][slotName] = (props: any) => scope_slot(props));
      return total;
    }, {});
  }

  render(h: any) {
    const { _collapsed } = this;

    const { navSlots, headerSlots } = this.getSlots();

    const { navStyle, headerStyle, mainStyle, headerMode } = this.editConfig;

    const _headerMode = headerMode || 'header';

    const Navigator = (
      <LuckyueNavigator
        {...{
          scopedSlots: navSlots,
          props: {
            editStyle: { ...navStyle, 'min-height': _headerMode === 'inline' ? 'auto' : '100vh' },
            _collapsed
          }
        }}
      />
    );

    const Header = (
      <LuckyueHeader
        {...{
          scopedSlots: headerSlots,
          props: {
            editStyle: headerStyle
          }
        }}
      />
    );

    const MainContainer = (
      <LuckyueMainContainer
        props={{
          editStyle: mainStyle
        }}
      />
    );

    const SplitLayout = (
      <section class={style.splitLayout}>
        {Navigator}
        <section class={[style.container, _collapsed && style.collapsed]}>
          {Header}
          {MainContainer}
        </section>
      </section>
    );

    const InlineLayout = (
      <section class={style.inlineLayout}>
        {Header}
        <section class={[style.container, style.inline]}>
          {Navigator}
          {MainContainer}
        </section>
      </section>
    );

    return _headerMode === 'split' ? SplitLayout : InlineLayout;
  }
}
</script>

<style lang="scss">
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
