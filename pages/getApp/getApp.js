// pages/getApp/getApp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "申领取惠军卡",
    scene: [getApp().globalData.server + '/xcx-1.png?' + Math.random() / 9999]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.m == "l1") {
      that.setData({
        info: "完成找回密码"
      })
    } else if (options.m == "l2") {
      that.setData({
        info: "申领取惠军卡"
      })
    }
  },
  previewImage: function (e) {
    let that = this;
    wx.previewImage({
      // current: this.data.scene[0],
      urls: this.data.scene,
      success: function (res) {
        // alert(that.data.scene)
      },
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