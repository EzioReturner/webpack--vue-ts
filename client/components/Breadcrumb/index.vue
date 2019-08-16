<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Collapsed from '../Collapse/index.vue';
import styles from './index.module.scss';
import { Action, namespace, Getter, State } from 'vuex-class';
// @ts-ignore
import { CollapseConfig } from '@model/components/layout.model';
// @ts-ignore
import { Crumbs } from '@model/store/breadcrumb.model';
// @ts-ignore
import { SET_CRUMBS_FN, DEL_CRUMB_FN, GET_CRUMBS } from '@constants/index';

const crumbStore = namespace('breadcrumb');
@Component
export default class LuckyueBreadcrumb extends Vue {
  @State(state => state.collapseConfig) collapseConfig: CollapseConfig;
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

  /**
   * 在vuex中创建crumb数据
   */
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

  /**
   * crumb点击事件
   */
  handleClickCrumb(crumb: Crumbs): void {
    const { path } = crumb;
    this.$router.push(path);
  }

  /**
   * crumb关闭事件
   */
  handleCloseCrumb(crumb: Crumbs): void {
    this.delCrumbFN(crumb);
  }

  render(h: any): any {
    const {
      crumbs: _crumbs,
      collapseConfig: { position },
      handleClickCrumb,
      handleCloseCrumb
    } = this;

    const checkDisplay = (crumbPath: string): boolean => {
      const { fullPath } = this.$route;
      return crumbPath === fullPath;
    };

    const CrumbRender = _crumbs.map((_crumb: Crumbs) => {
      const { name, path, selected } = _crumb;
      const isDisplay = checkDisplay(path);

      return (
        <li class={[styles.crumbUnit, isDisplay && styles.displayed]}>
          <span class={styles.crumbName} onClick={() => handleClickCrumb(_crumb)}>
            {name}
          </span>
          <span
            class={styles.closeIconContainer}
            onClick={(e: any) => {
              e.stopPropagation();
              handleCloseCrumb(_crumb);
            }}
          >
            <a-icon type="close" class={styles.closeIcon} />
          </span>
        </li>
      );
    });

    return (
      <div class={styles.breadcrumb}>
        {position === 'breadcrumb' && <Collapsed />}
        <ul class={styles.crumbList}>{CrumbRender}</ul>
      </div>
    );
  }
}
</script>
