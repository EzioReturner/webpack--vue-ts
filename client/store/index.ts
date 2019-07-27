import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { sync } from 'vuex-router-sync';
import Router from '@components/Router';
import { BaseState } from '@model/store/base.model';
import base from './base';
import { breadcrumb } from './breadcrumb';
Vue.use(Vuex);

const store: StoreOptions<BaseState> = {
  strict: process.env.NODE_ENV === 'development',
  ...base,
  modules: {
    breadcrumb
  }
};

const Store = new Vuex.Store(store);
sync(Store, Router);

export default Store;
