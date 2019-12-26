// 电影榜单页面功能

const app = getApp();

Page({
  data: {
    title: null,
    type: "in_theaters",
    list: [],
    page: 1,
    size: 20,
    hasMore: true
  },

  /**
   * 加载更多
   */
  loadMore() {
    wx.showLoading({ title: "拼命加载中..." });
    // 根据id查找对应的电影详情
    return app.douban
      .find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (!this.data.title) {
          wx.setNavigationBarTitle({
            title: d.title + " << 电影 << 豆瓣"
          });
        }

        this.setData({
          title: d.title,
          list: this.data.list.concat(d.subjects),
          hasMore: this.data.page - 1 < Math.ceil(d.total / this.data.size)
        });

        wx.hideLoading();
      })
      .catch(err => {
        this.setData({ title: "获取数据异常" });
        console.error(err);
        wx.hideLoading();
      });
  },
  /**
   * 页面加载时调用的方法
   */
  onLoad(params) {
    this.setData({ type: params.type });
    this.loadMore();
  },

  /**
   * 用户下来响应
   */
  onPullDownRefresh() {
    this.setData({ list: [], page: 1, hasMore: true });
    this.loadMore().then(() => wx.stopPullDownRefresh);
  },

  onReachBottom() {
    if (!this.data.hasMore) return;
    this.loadMore();
  }
});
