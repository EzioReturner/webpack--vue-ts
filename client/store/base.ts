import { Commit, GetterTree, ActionTree, MutationTree } from 'vuex';
import {
  SET_COLLAPSED,
  SET_COLLAPSED_FN,
  SET_COLLAPSE_CONFIG,
  SET_COLLAPSE_CONFIG_FN,
  SET_LOADING,
  SET_LOADING_FN,
  GET_LOADING
} from '@constants/index';
import { BaseState } from '@model/store/base.model';

const state: BaseState = {
  collapsed: false,
  collapseConfig: {
    position: 'header',
    icon: '',
    style: {}
  },
  loading: false
};

const getters: GetterTree<BaseState, BaseState> = {
  [GET_LOADING](state): boolean {
    return state.loading;
  }
};

const mutations: MutationTree<BaseState> = {
  [SET_COLLAPSED](states: BaseState, params: boolean) {
    states.collapsed = params;
  },
  [SET_COLLAPSE_CONFIG](states: BaseState, params: object) {
    states.collapseConfig = params;
  },
  [SET_LOADING](states: BaseState, params: boolean) {
    states.loading = params;
  }
};

const actions: ActionTree<BaseState, BaseState> = {
  [SET_COLLAPSED_FN](context: { commit: Commit }, params: boolean) {
    context.commit(SET_COLLAPSED, params);
  },
  [SET_COLLAPSE_CONFIG_FN](context: { commit: Commit }, params: object) {
    context.commit(SET_COLLAPSE_CONFIG, params);
  },
  [SET_LOADING_FN](context: { commit: Commit }, params: boolean) {
    context.commit(SET_LOADING, params);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
