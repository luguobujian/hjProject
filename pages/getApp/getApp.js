// pages/getApp/getApp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "请打开或下载惠军卡APP才可以领取惠军卡或扫描下方二维码关注公众号！",
    scene: [getApp().globalData.server + '/xcx-1.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.m == "l1") {
      that.setData({
        info: "请打开或下载惠军卡APP完成找回密码或扫描下方二维码关注公众号！"
      })
    } else if (options.m == "l2") {
      that.setData({
        info: "请打开或下载惠军卡APP完成注册新用户或扫描下方二维码关注公众号！"
      })
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.scene[0],
      urls: this.data.scene,
      fail: function (res) {
        console.log(res)
      }

    })
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