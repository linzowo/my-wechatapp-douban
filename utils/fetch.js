// 对api发起请求的处理函数

/**
 * 目标url基本结构 大致如下
 * https://douban.uieee.com/v2/movie/coming_soon
 * @param {String} api api根地址
 * @param {String} path 请求路径
 * @param {Object} params 请求参数
 * @return {Promise}  包含抓取任务的promise
 */
module.exports = function (api,path,params){ 
    return new Promise((resolve,reject) => {
        wx.request({
            url: `${api}/${path}`,
            data: Object.assign({},params),
            header: {'Content-Type' : 'json'},
            success: resolve,
            fail: reject
        })
    })
}