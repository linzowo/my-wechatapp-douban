// 小程序入口文件

// 引入相关模块
const wechat = require("./utils/wechat.js");
const baidu = require("./utils/baidu.js");
const douban = require("./utils/douban.js");

App({
  data: {
    name: "Douban Movie",
    version: "0.1.0",
    currentCity: "成都"
  },
  /**
   * WeChat API
   */
  wechat: wechat,
  /**
   * baidu API
   */
  baidu: baidu,
  /**
   * douban API
   */
  douban: douban,
  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch() {
    //   在初始化过程中获取用户的地址
    wechat
      .getLocation()
      .then(res => {
        // 获取坐标==>城市名称
        const { latitude, longitude } = res;
        return baidu.getCtiyName(latitude, longitude);
      })
      .then(name => {
        // 将获取到的城市名去掉 市
        this.data.currentCity = name.replace("市", "");
      })
      .catch(err => {
        //   报错就将城市默认设为成都
        this.data.currentCity = "成都";
        console.log(err);
      });
  },

  /**
   * 生命周期函数--监听小程序启动或切前台
   */
  onShow() {},

  /**
   * 生命周期函数--监听小程序切后台
   */
  onHide() {},

  /**
   * 生命周期函数--错误监听函数
   */
  onError() {},

  /**
   * 页面相关事件处理函数--页面不存在
   */
  onPageNotFound() {}
});
