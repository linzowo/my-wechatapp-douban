// 搜索页处理文件

const app = getApp();

Page({
  data: {
    subtitle: "请输入搜索内容",
    page: 1,
    size: 20,
    list: [],
    search: "",
    hasMore: true
  },

  /**
   * 加载更多
   */
  loadMore() {
    if (!this.data.hasMore) return;
    return app.douban
      .find("search", this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (!d.subjects) {
          this.setData({ hasMore: false });
          return;
        }

        if (d.subjects.length) {
          this.setData({
            list: d.subjects,
            hasMore: page - 1 < Math.ceil(d.total / this.data.size)
          });
        } else {
          this.setData({ hasMore: false });
        }
      })
      .catch(err => {
        this.setData({ subtitle: "搜索接口暂时无法使用" });
        console.error(err);
      });
  },
  /**
   * 搜索框输入处理函数
   * @param {*} e
   */
  handleSearch(e) {
    if (!e.detail.value) return;
    this.setData({ search: e.detail.value, hasMore: true });
    this.loadMore();
  },
  /**
   * 上滑加载更多
   */
  onReachBottom() {
    this.loadMore();
  }
});
