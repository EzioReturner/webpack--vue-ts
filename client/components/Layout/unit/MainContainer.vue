<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import style from './MainContainer.module.scss';
// @ts-ignore
import Breadcrumb from '@components/Breadcrumb';

@Component
export default class LuckyueMainContainer extends Vue {
  @Prop(Object) readonly editStyle: any;
  render(h: any) {
    const { editStyle } = this;
    return (
      <section style={editStyle} class={style.mainContainer}>
        <Breadcrumb />
        <main class={style.viewBody}>
          <router-view />
        </main>
      </section>
    );
  }
}
</script>
