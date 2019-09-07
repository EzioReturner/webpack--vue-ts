import axios from 'axios';
import { Notification } from 'ant-design-vue';
import $Store from '@/store';

class Request {
  instance;

  constructor() {
    this.instance = axios.create({
      withCredentials: true
    });
    this.initTnterceptors();
  }

  // 初始化拦截器
  initTnterceptors() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      response => {
        $Store.dispatch('SET_LOADING_FN', false);
        return response;
      },
      error => {
        return Promise.reject(error.response);
      }
    );
  }

  // 设置自定义头部
  setHeader = (key, val) => {
    this.instance.defaults.headers.common[key] = val;
  };

  // 错误notify
  notify(description) {
    Notification.error({
      description: description,
      message: '接口异常'
    });
  }

  // 错误处理
  handleError = error => {
    const { message, status } = error;
    switch (status) {
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        this.notify(message || error);
        break;
    }
    return Promise.reject(error);
  };

  sendRequest(method, path, data = {}) {
    let { params, options = {} } = data;
    $Store.dispatch('SET_LOADING_FN', options.noSpin !== true);
    return this.instance[method](path, params, options).catch(this.handleError);
  }

  get(path, data = {}) {
    const { params } = data;
    let _path = path;
    if (params) {
      _path += '?';
      Object.keys(params).forEach(key => {
        _path += `${key}=${params[key]}&`;
      });
      _path = _path.replace(/&$/, '');
    }
    return this.sendRequest('get', _path, data);
  }

  post(path, data) {
    return this.sendRequest('post', path, data);
  }

  put(path, data) {
    return this.sendRequest('put', path, data);
  }

  patch(path, data) {
    return this.sendRequest('patch', path, data);
  }

  delete(path, data) {
    return this.sendRequest('delete', path, data);
  }
}

export default new Request();
