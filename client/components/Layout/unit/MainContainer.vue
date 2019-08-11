<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import styles from './MainContainer.module.scss';
// @ts-ignore
import Breadcrumb from '@components/Breadcrumb';

@Component
export default class LuckyueMainContainer extends Vue {
  @Prop(Object) readonly editStyle: any;
  render(h: any) {
    const { editStyle } = this;
    return (
      <section style={editStyle} class={styles.mainContainer}>
        <Breadcrumb />
        <main class={styles.viewBody}>
          <router-view />
        </main>
      </section>
    );
  }
}
</script>
