<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';
import { Action, namespace, Getter, State } from 'vuex-class';
import { Crumbs } from '@model/store/breadcrumb.model';

@Component
export default class WvtsBreadcrumb extends Vue {
  @Prop(Array) readonly crumbs: Crumbs[];
  @Prop(String) readonly propClass: string;
  @Prop([Object, String]) readonly propStyle: Object | String;

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
    const { crumbs: _crumbs, handleClickCrumb, handleCloseCrumb, propClass, propStyle } = this;

    const checkDisplay = (crumbPath: string): boolean => {
      const { fullPath } = this.$route;
      return crumbPath === fullPath;
    };

    const CrumbRender = _crumbs.map((_crumb: Crumbs) => {
      const { path, selected, name, closeable = true } = _crumb;
      const isDisplay = checkDisplay(path);

      return (
        <li class={[styles.crumbUnit, isDisplay && styles.displayed]} key={name}>
          <span class={styles.crumbName} onClick={() => handleClickCrumb(_crumb)}>
            {name}
          </span>
          {closeable && (
            <span
              class={styles.closeIconContainer}
              onClick={(e: any) => {
                e.stopPropagation();
                handleCloseCrumb(_crumb);
              }}
            >
              <a-icon type="close" class={styles.closeIcon} />
            </span>
          )}
        </li>
      );
    });

    return (
      <div class={styles.breadcrumb}>
        <transition-group
          name="crumbList"
          tag="ul"
          class={[styles.crumbList, propClass]}
          style={propStyle}
        >
          {CrumbRender}
        </transition-group>
      </div>
    );
  }
}
</script>

<style lang="scss">
.crumbList-enter,
.crumbList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.crumbList-leave-active {
  position: absolute;
}
</style>
