<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';
import { Action, namespace, Getter, State } from 'vuex-class';
import { Crumbs } from '@model/store/breadcrumb.model';

@Component
export default class LuckyueBreadcrumb extends Vue {
  @Prop(Array) readonly crumbs: Crumbs[];

  /**
   * crumb点击事件
   */
  handleClickCrumb(crumb: Crumbs): void {
    const { click } = this.$listeners;
    const onClick: any = click;
    onClick && onClick(crumb);
  }

  /**
   * crumb关闭事件
   */
  handleCloseCrumb(crumb: Crumbs): void {
    const { close } = this.$listeners;
    const onClose: any = close;
    onClose && onClose(crumb);
  }

  render(h: any): any {
    const { crumbs: _crumbs, handleClickCrumb, handleCloseCrumb } = this;

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
        <ul class={styles.crumbList}>{CrumbRender}</ul>
      </div>
    );
  }
}
</script>
