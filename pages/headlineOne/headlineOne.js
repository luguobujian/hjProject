// pages/headlineOne/headlineOne.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: getApp().globalData.server,
    id: "",
    mainDataList: [],
    isShowData: true,
    limit: 8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      id: options.id
    })
    wx.request({
      url: getApp().globalData.server + '/api/article/arclist',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        category_id: options.id,
        page: "1",
        limit: that.data.limit,
        flag: ""
      },
      success: function(res) {
        console.log(res);
        if (res.data.data) {
          that.setData({
            mainDataList: res.data.data,
            isShowData: true
          })
        } else {
          that.setData({
            isShowData: false
          })
        }

      }
    })
  },
  goNewsInfo: function(e) {
    console.log(e),
      wx.navigateTo({
        url: '../headlineOneInfo/headlineOneInfo?id=' + e.currentTarget.dataset.id
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
    let that = this;
    let limit = that.data.limit + 8;
    wx.request({
      url: getApp().globalData.server + '/api/article/arclist',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        category_id: that.data.id,
        page: "1",
        limit,
        flag: ""
      },
      success: function(res) {
        console.log(res);
        if (res.data.data) {
          that.setData({
            mainDataList: res.data.data,
            isShowData: true
          })
        } else {
          that.setData({
            isShowData: false
          })
        }

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})