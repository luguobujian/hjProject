// pages/shopitem/shopitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    isShow: false,
    isShowData: true,
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
    console.log(options);

    let that = this;
    that.setData({
      search: options.search
    })
    wx.getStorage({
        key: 'log',
        success: function(res) {
          console.log(res.data)
          console.log(that)
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
        }
      }),
      // wx.showNavigationBarLoading();
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
            wx.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
              success: function(res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '授权失败',
                    icon: 'success',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function(dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用getLocationt的API
                        this.getLocation(this);
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
            this.getLocation(this);
          } else { //授权后默认加载
            this.getLocation(this);
          }
        }
      })
  },
  getLocation: (that) => {
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: (res) => {
        // console.log(res);
        that.getSellerData(res.latitude, res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      fail: function(res) {
        // console.log(res);
      }
    })
  },
  getSellerData: function(y, x) {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/seller/search_seller',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        name: that.data.search,
        x,
        y
      },
      success: function(res) {
        console.log(res.data.data)
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

        wx.setStorage({
          key: "lastSearch",
          data: that.data.search
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
            latitude: this.data.sellerLocationData[i].y,
            longitude: this.data.sellerLocationData[i].x
          })
        }
      }
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