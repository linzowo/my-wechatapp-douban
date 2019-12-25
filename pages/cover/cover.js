//封面内容通过查询缓存中的数据得到
// 如果缓存过期了就重新获取数据，并更新缓存

const app = getApp();

Page({
  data: {
    movies: []
  },

  getCache() {
    return new Promise(resolve => {
      app.wechat
        .getStorage("last_splash_data")
        .then(res => {
          const { movies, expires } = res.data;
          //   存在缓存 ==》 未过期
          if (movies && expires > Date.now()) {
            return resolve(res.data);
          }

          // 无缓存或者已过期
          console.log("缓存已过期");
          resolve(null);
        })
        .catch(err => {
          resolve(null);
        });
    });
  },

  /**
   * 处理跳转的函数
   */
  handleStart() {
    wx.switchTab({
      url: "../index/index"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCache().then(cache => {
      if (cache) {
        return this.setData({ movies: cache.movies });
      }

      // 没有缓存
      app.douban.find("coming_soon", 1, 1).then(d => {
        // 得到电影数据后
        this.setData({ movies: d.subjects });
        // 设置缓存
        return app.wechat
          .setStorage("last_splash_data", {
            movies: d.subjects,
            expires: Date.now() + 1 * 24 * 60 * 60 * 1000
          })
          .then(() => console.log("已缓存最新数据"));
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
