<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, namespace, State } from 'vuex-class';
import WvtsHeader from './unit/Header.vue';
import WvtsNavigator from './unit/Navigator.vue';
import WvtsMainContainer from './unit/MainContainer.vue';
import style from './BasicLayout.module.scss';
// @ts-ignore
import { SET_COLLAPSE_CONFIG_FN } from '@constants/index';

/**
 * BasicLayout provied 4 slots, as below
 * @param {nav-siteTitle} :nav-title slot
 * @param {nav-siderMenu} :nav-sider-menu slot & WVTS will render route menu default if you don`t provide this slots
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
   * get slots
   */
  getSlots(): any {
    const { $scopedSlots } = this;

    if (!$scopedSlots) {
      return;
    }
    return Object.keys($scopedSlots).reduce((total: any, slot: string) => {
      const [type, slotName] = slot.split('-');
      if (!['header', 'nav'].includes(type)) {
        console.warn('WVTS', '[BasicLayout]:', '组件未按约定传参');
        return;
      }
      if (!slotName) {
        console.warn('WVTS', '[BasicLayout]:', '组件未按约定传参');
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
      <WvtsNavigator
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
      <WvtsHeader
        {...{
          scopedSlots: headerSlots,
          props: {
            editStyle: headerStyle
          }
        }}
      />
    );

    const MainContainer = (
      <WvtsMainContainer
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
