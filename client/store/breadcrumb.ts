import { Commit, Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import {
  SET_CRUMBS,
  SET_CRUMBS_FN,
  DEL_CRUMB,
  DEL_CRUMB_FN,
  GET_CRUMBS,
  UPDATE_CRUMB,
  UPDATE_CRUMB_FN
} from '@constants/index';
import { CrumbState, Crumbs } from '@model/store/breadcrumb.model';
import { BaseState } from '@model/store/base.model';
import Router from '@components/Router';

const state: CrumbState = {
  crumbs: []
};

const getters: GetterTree<CrumbState, BaseState> = {
  [GET_CRUMBS](state): Crumbs[] {
    return state.crumbs;
  }
};

const mutations: MutationTree<CrumbState> = {
  /**
   * 设置crumb
   */
  [SET_CRUMBS](states: any, params: Crumbs) {
    states.crumbs = [...states.crumbs, params];
  },
  /**
   * 删除crumb
   */
  [DEL_CRUMB](states: any, params: Crumbs) {
    const { path } = params;
    const index = states.crumbs.findIndex((res: Crumbs) => res.path === path);
    states.crumbs.splice(index, 1);

    // 删除后路由跳转
    const length = states.crumbs.length;
    const last = length ? states.crumbs[length - 1] : false;
    Router.push({
      path: last ? last.path : '/'
    });
  },
  [UPDATE_CRUMB](states: any, params: Crumbs) {}
};

/**
 * 检查crumb是否存在
 */
const checkExists = (path: string): boolean => {
  const crumbs = state.crumbs;
  return crumbs.some((crumb: Crumbs) => crumb.path === path);
};

const actions: ActionTree<CrumbState, BaseState> = {
  /**
   * 设置crumb FN
   */
  [SET_CRUMBS_FN](context: { commit: Commit }, params: Crumbs) {
    const { path, meta } = params;
    if (meta && Object.keys(meta).length && meta.hiddenMenu) {
      return;
    }
    !checkExists(path) && context.commit(SET_CRUMBS, params);
  },
  /**
   * 删除crumb FN
   */
  [DEL_CRUMB_FN](context: { commit: Commit }, params: Crumbs) {
    context.commit(DEL_CRUMB, params);
  },
  /**
   * 更新crumb FN
   */
  [UPDATE_CRUMB_FN](context: { commit: Commit }, params: Crumbs) {
    context.commit(UPDATE_CRUMB, params);
  }
};

export const breadcrumb: Module<CrumbState, BaseState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
