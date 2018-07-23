// pages/headlineOneInfo/headlineOneInfo.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData: "",
    content: "",
    motto: "分享"
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    console.log(options)
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/article/show',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: 　options.id
      },
      success: function(res) {
        // console.log(res)
        // console.log(res.data.data.content)
        let content = WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        that.setData({
          mainData: res.data.data,
          // content
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: this.data.mainData.title,
      imageUrl: getApp().globalData.server + this.data.mainData.lit_image,
      // path: 'pages/index/index',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})