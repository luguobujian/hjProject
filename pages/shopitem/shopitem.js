// pages/shopitem/shopitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowData: true,
    isShow: false,
    loadingHidden: false,
    server: getApp().globalData.server,
    sellerLocationData: '',
    oneLogo: "",
    oneName: "",
    oneAddress: "",
    oneTel: "",
    onejuli: "",
    oneLatitude: "",
    oneLongitude: "",
    // goId: ""
    latitude: "",
    longitude: "",
    name: "",
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.getSellerData(options.y, options.x)
    wx.getStorage({
      key: 'log',
      success: function(res) {
        if (res.data.msg == "登录成功") {
          wx.request({
            url: getApp().globalData.server + '/api/user/info',
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              token: res.data.data.userinfo.token
            },
            success: function(res) {
              if (res.data.data) {
                that.setData({
                  isLog: true
                })
              } else {
                that.setData({
                  isLog: false
                })
              }
            },
            fail: function(res) {
              that.setData({
                isLog: false
              })
            }
          })

        } else {
          that.setData({
            isLog: false
          })
        }
      },
      fail: function() {

      }
    })
  },

  getSellerData: function(y, x) {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/seller/nearby_seller',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        x,
        y
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          loadingHidden: true
        })
        console.log(that.data.loadingHidden)
        if (res.data.data.length) {
          that.setData({
            sellerLocationData: res.data.data,
            isShowData: true
          })
        } else {
          that.setData({
            isShowData: false
          })
        }


      },
      fail: function() {
        that.setData({
          loadingHidden: true
        })
      }
    })
  },
  openMap: function(e) {
    if (this.data.isLog) {
      for (let i = 0; i < this.data.sellerLocationData.length; i++) {
        if (this.data.sellerLocationData[i].id == e.currentTarget.dataset.id) {
          this.setData({
            name: this.data.sellerLocationData[i].name,
            address: this.data.sellerLocationData[i].address,
            latitude: this.data.sellerLocationData[i].tx_y,
            longitude: this.data.sellerLocationData[i].tx_x
          })
        }
      }
      console.log(this.data.latitude - 0);
      console.log(this.data.longitude - 0);
      wx.openLocation({
        latitude: this.data.latitude - 0,
        longitude: this.data.longitude - 0,
        scale: 28,
        name: this.data.name,
        address: this.data.address
      })
    } else {
      wx.redirectTo({
        url: '../logs/logs'
      })
    }
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
    //wx.showNavigationBarLoading() //在标题栏中显示加载
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //console.log("上拉加载")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})