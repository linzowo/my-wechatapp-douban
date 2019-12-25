// 在这里将一些自带方法改造为promise结构

// 获取缓存
const getStorage = function(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    });
  });
};

// 设置缓存
const setStorage = function(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    });
  });
};

// 获取位置信息
const getLocation = function(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    });
  });
};

// 向外暴露新的对象
module.exports = {
  getStorage,
  setStorage,
  getLocation
};
