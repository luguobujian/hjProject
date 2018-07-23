// pages/qiYeOneInfo/qiYeOneInfo.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    qiyeS: '',
    mainData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
    that.getQiYeData(options.id);
  },
  getQiYeData: function (id) {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/seller/qiye',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          qiyeS: res.data.data
        })
        that.getOneInfo();
      }
    })
  },
  getOneInfo: function () {
    
    let that = this;
    // console.log(that.data.qiyeS)
    // console.log(that.data.id)
    for (let i = 0; i < that.data.qiyeS.length; i ++) {
      if (that.data.id == that.data.qiyeS[i].id) {
        that.data.qiyeS[i].content && WxParse.wxParse('article', 'html', that.data.qiyeS[i].content, that, 5);
        // let content = WxParse.wxParse('article', 'html', that.data.qiyeS[i].content, that, 5);
        that.setData({
          mainData: that.data.qiyeS[i]
        })
      }
    }
    // console.log(that.data.mainData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})