// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    lastSearch: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(getCurrentPages());
    wx.getStorage({
      key: 'lastSearch',
      success: function(res) {
        console.log(res)
        that.setData({
          lastSearch: res.data
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  clearValue: function() {
    this.setData({
      inputValue: ""
    })
  },
  goSearch: function() {
    this.setData({
      lastSearch: this.data.inputValue
    })
    wx.navigateTo({
      url: '../searchShopItem/searchShopItem?search=' + this.data.inputValue
    })
  },
  lastGoSearch: function(e) {
    console.log(e)
    this.setData({
      lastSearch: e.currentTarget.dataset.lastSearch
    });
    wx.navigateTo({
      url: '../searchShopItem/searchShopItem?search=' + e.currentTarget.dataset.lastSearch
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

  }
})