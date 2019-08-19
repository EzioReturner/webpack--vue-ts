<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, namespace, Getter, State } from 'vuex-class';
import Collapsed from '@components/Collapse/index.vue';
import Breadcrumb from '@components/Breadcrumb/index.vue';
import { GET_LOADING, SET_CRUMBS_FN, DEL_CRUMB_FN, GET_CRUMBS } from '@constants/index';
import { Crumbs } from '@model/store/breadcrumb.model';
import { CollapseConfig } from '@model/components/layout.model';
import styles from './MainContainer.module.scss';

const crumbStore = namespace('breadcrumb');
@Component
export default class LuckyueMainContainer extends Vue {
  @Prop(Object) readonly editStyle: any;
  @State(state => state.collapseConfig) collapseConfig: CollapseConfig;
  @Getter(GET_LOADING) loading: boolean;
  @crumbStore.Getter(GET_CRUMBS) crumbs: Crumbs[];
  @crumbStore.Action(SET_CRUMBS_FN) setCrumbsFN: Function;
  @crumbStore.Action(DEL_CRUMB_FN) delCrumbFN: Function;

  @Watch('$route.path')
  valueChange(val: string, oldVal: string): void {
    this.createCrumbUnit();
  }

  mounted(): void {
    this.createCrumbUnit();
  }

  createCrumbUnit(): void {
    const { fullPath, name, meta } = this.$route;
    const params: Crumbs = {
      path: fullPath,
      name: name || '',
      selected: false,
      meta
    };
    this.setCrumbsFN(params);
  }

  handleClickCrumb(crumb: Crumbs): void {
    const { path } = crumb;
    this.$router.push(path);
  }

  render(h: any) {
    const {
      crumbs,
      loading,
      editStyle,
      delCrumbFN,
      handleClickCrumb,
      collapseConfig: { position }
    } = this;
    const directives = [
      {
        name: 'spin',
        value: loading,
        modifiers: {
          fullScreen: true
        }
      }
    ];
    return (
      <section style={editStyle} class={styles.mainContainer} {...{ directives }}>
        <div>
          {position === 'breadcrumb' && <Collapsed />}
          <Breadcrumb on-close={delCrumbFN} on-click={handleClickCrumb} props={{ crumbs }} />
          <main class={styles.viewBody}>
            <router-view />
          </main>
        </div>
      </section>
    );
  }
}
</script>
