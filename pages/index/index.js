const app = getApp();

Page({
  data: {
    list: [
      { key: "in_theaters" },
      { key: "coming_soon" },
      { key: "new_movies" },
      { key: "top250" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.showLoading({ title: "拼命加载中..." });

    //   生成任务列表
    const tasks = this.data.list.map(item => {
      return app.douban.find(item.key, 1, 8).then(d => {
        item.title = d.title;
        item.movies = d.subjects;
        return item;
      });
    });

    //   完成任务列表
    Promise.all(tasks).then(list => {
      this.setData({
        list: list
      });

      console.log(this.data.list);
      
      
      wx.hideLoading();
    });
  }
});
