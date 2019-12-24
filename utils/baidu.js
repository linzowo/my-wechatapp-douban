// 用于将获取到的坐标转换为城市

// 确定根地址
const URL = "https://api.map.baidu.com";
import fetch from "./fetch.js";

// 发起请求的方法
function fetchAPI(type, params) {
  return fetch(URL, type, params);
}

// 将坐标转换为城市的方法
function getCtiyName(latitude = 30.67, longitude = 107.07) {
  const params = {
    location: `${latitude},${longitude}`,
    output: "json",
    ak: "B61195334f65b9e4d02ae75d24fa2c53"
  };
  return fetchAPI("geocoder/v2/", params).then(
    res => res.data.result.addressComponent.city
  );
}

module.exports = { getCtiyName }