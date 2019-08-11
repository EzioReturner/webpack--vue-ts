<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import styles from './Navigator.module.scss';
// @ts-ignore
import { constantRouterMap } from '@/routes';
//@ts-ignore
import { MenuModel } from '@model/components/layout.model';

const routes = constantRouterMap[0].children;
@Component
export default class LuckyueNavigator extends Vue {
  @Prop(Object) readonly editStyle: any;
  @Prop(Boolean) readonly _collapsed: boolean;

  public mounted() {}

  public get activeIndex(): string[] {
    return [`/${this.openMenu.join('/')}`];
  }

  public get openMenu(): string[] {
    return this.checkOpenMenu();
  }

  // @Watch('$route.path')
  // valueChange(val: string, oldVal: string): void {
  // }

  /**
   * 默认开启菜单判断
   */
  checkOpenMenu(): string[] {
    const { path, params } = this.$route;
    const paramsValue = JSON.stringify(params) !== '{}' ? Object.values(params) : [];
    return path.split('/').filter((chip: string) => {
      return chip && !paramsValue.includes(chip);
    });
  }

  handleClickMenuItem(path: string) {
    this.$router.push(path);
  }

  render(h: any) {
    const {
      $scopedSlots,
      editStyle,
      _collapsed,
      openMenu,
      activeIndex,
      handleClickMenuItem
    } = this;

    /**
     * SiteTitle 插槽渲染判断
     */
    const SiteTitle = $scopedSlots.siteTitle ? (props => $scopedSlots.siteTitle(props))() : null;

    /**
     * 菜单数据过滤方法
     */
    const getNavMenu = (_routes: MenuModel[], parentPath?: string) => {
      if (!_routes.length) {
        return;
      }
      return _routes
        .filter((menu: MenuModel) => {
          const { meta } = menu;
          if (!meta) {
            return true;
          } else {
            const { hiddenMenu, authority } = meta;
            if (!hiddenMenu) {
              return true;
            }
            return false;
          }
        })
        .map((menu: MenuModel) => generateMenu(menu, parentPath));
    };

    /**
     * 生成菜单dom方法
     */
    const generateMenu = (menu: any, parentPath?: string) => {
      const { children, name, icon, path } = menu;
      const _path = parentPath ? parentPath + `/${path}` : `/${path}`;

      if (children && children.length) {
        return (
          <a-sub-menu key={path}>
            <template slot="title">
              {icon && <a-icon type={icon} />}
              <span class={styles.menuTitle}>{name}</span>
            </template>
            {getNavMenu(children, _path)}
          </a-sub-menu>
        );
      }
      return (
        <a-menu-item key={_path} onClick={() => handleClickMenuItem(_path)}>
          {icon && <a-icon type={icon} />}
          <span class={styles.menuTitle}>{name}</span>
        </a-menu-item>
      );
    };

    /**
     * NavMenu 插槽渲染判断
     */
    const menuProps = _collapsed
      ? {}
      : {
          openKeys: openMenu
        };
    const NavMenu = $scopedSlots.siderMenu ? (
      (props => $scopedSlots.siderMenu(props))()
    ) : (
      <a-menu
        inlineCollapsed={_collapsed}
        mode="inline"
        class="asideMenu"
        style="margin-top:20px;"
        selectedKeys={activeIndex}
        defaultOpenKeys={openMenu}
      >
        {routes && getNavMenu(routes)}
      </a-menu>
    );

    return (
      <aside class={[styles.navigator, _collapsed && styles.collapsed]} style={editStyle}>
        {SiteTitle}
        <div class={styles.menuContainer}>{NavMenu}</div>
      </aside>
    );
  }
}
</script>
