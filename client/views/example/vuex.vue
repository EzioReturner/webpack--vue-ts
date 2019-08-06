<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import styles from './index.module.scss';

@Component
class Tsx extends Vue {
  public templateCode: string = `import { Commit, GetterTree, ActionTree, MutationTree } from 'vuex';
import {
  SET_COLLAPSED,
  SET_COLLAPSED_FN,
  SET_COLLAPSE_CONFIG,
  SET_COLLAPSE_CONFIG_FN
} from '@constants/index';
import { BaseState } from '@model/store/base.model';

const state: BaseState = {
  collapsed: false,
  collapseConfig: {
    position: 'header',
    icon: '',
    style: {}
  }
};

const mutations: MutationTree<BaseState> = {
  [SET_COLLAPSED](states: any, params: boolean) {
    states.collapsed = params;
  },
  [SET_COLLAPSE_CONFIG](states: any, params: object) {
    states.collapseConfig = params;
  }
};

const actions: ActionTree<BaseState, BaseState> = {
  [SET_COLLAPSED_FN](context: { commit: Commit }, params: boolean) {
    context.commit(SET_COLLAPSED, params);
  },
  [SET_COLLAPSE_CONFIG_FN](context: { commit: Commit }, params: object) {
    context.commit(SET_COLLAPSE_CONFIG, params);
  }
};

export default {
  state,
  mutations,
  actions
};
`;

  render(h: any) {
    const { templateCode } = this;

    return (
      <div>
        <h2 class={styles.colorful}>vuex with typescript</h2>
        <h3 class={styles.title} style="margin-top:20px;margin-bottom:0;">
          script
        </h3>
        <pre v-hljs>
          <code>{templateCode}</code>
        </pre>
      </div>
    );
  }
}
export default Tsx;
</script>
