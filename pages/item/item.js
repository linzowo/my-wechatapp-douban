// 处理单条电影展示信息

const app = getApp();

Page({
  data: {
    title: "",
    movie: {}
  },
  /**
   * 页面加载时调用的方法
   */
  onLoad(params) {
    wx.showLoading({ title: "拼命加载中..." });
    // 根据id查找对应的电影详情
    app.douban.findOne(params.id).then(d => {
      this.setData({
        title: d.title,
        movie: d
      });
      wx.setNavigationBarTitle({
        title: this.data.title + " << 电影 << 豆瓣"
      });
      wx.hideLoading();
    }).catch(err => {
         this.setData({title:"获取数据异常",movie:{}});
         console.error(err);
         wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.title + " << 电影 << 豆瓣"
    });
  },

  /**
   * 功能函数分享页面设置
   */
  onShareAppMessage(params){
      return {
          title:this.data.title,
          desc:this.data.title,
          path:'/pages/item?id='+params.id
      }
  }

});
