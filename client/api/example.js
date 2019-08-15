import io from '@utils/io';

export default {
  getTestApi(params) {
    return io.get('https://eziocloudmusicapi.leanapp.cn/search?keywords= 海阔天空');
  }
};
