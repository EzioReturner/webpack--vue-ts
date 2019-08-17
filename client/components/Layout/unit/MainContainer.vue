<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import styles from './MainContainer.module.scss';
import { Action, namespace, Getter, State } from 'vuex-class';
// @ts-ignore
import Breadcrumb from '@components/Breadcrumb';
import { GET_LOADING } from '@constants/index';
import { setTimeout } from 'timers';
@Component
export default class LuckyueMainContainer extends Vue {
  @Prop(Object) readonly editStyle: any;
  @Getter(GET_LOADING) loading: boolean;

  render(h: any) {
    const { editStyle, loading } = this;
    return (
      <section style={editStyle} class={styles.mainContainer} v-spin={loading}>
        <div>
          <Breadcrumb />
          <main class={styles.viewBody}>
            <router-view />
          </main>
        </div>
      </section>
    );
  }
}
</script>
