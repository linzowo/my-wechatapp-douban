// 存放和豆瓣相关的处理函数

// 声明公共文件
const URL = "https://douban.uieee.com/v2/movie";

// 引入相关功能模块
import fetch from "./fetch.js";

/**
 * 抓取豆瓣电影特定类型的API
 * https://douban.uieee.com/v2/movie/?title=movie_v2
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
const fetchAPI = function(type, params) {
  return fetch(URL, type, params);
};

/**
 * 根据参数发起请求获取指定类型/数量/排名信息
 * 可获取榜单 ==》 不传search
 * 可获取单个电影详细信息 ==》 传入search 例如：'subject/' + id
 * @param {String} type 榜单类型 例如：'coming_soon'
 * @param {Number} page 获取第几页
 * @param {Number} count 获取数量
 * @param {String} search 搜索关键词
 * @return {Promise} 包含请求任务的promise
 */
const find = function(type, page = 1, count = 20, search = "") {
  const params = {
    start: (page - 1) * count,
    count: count,
    city: getApp().data.currentCity
  };
  return fetchAPI(
    type,
    search ? Object.assign(params, { q: search }) : params
  ).then(res => {
    res.data;
  });
};

/**
 * 获取单条电影详情
 * @param {Number} id 电影的id
 * @return {Promise}       包含请求任务的promise
 */
const findOne = function(id) {
  return fetchAPI("subject/" + id).then(res=>{
      res.data;
  });
};
// 导出相关api
module.exports = { find, findOne };
