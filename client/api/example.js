import io from '@utils/io';

export default {
  getTestApi() {
    return io.get('https://eziocloudmusicapi.leanapp.cn/artists?id=6452', {
      options: {
        hideLoading: true
      }
    });
  }
};
