// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLog: false,
    isShow: false,
    isShowCard: true,
    name: "",
    group_id: "",
    thisCard: "",
    avartar: "../../images/card_logo.png",
    thisCard_logo: "",
    thisCard_img: "",
    thisCard01: "",
    thisCard02: "",
    thisCard03: "",
    thisCard04: "",
    token: "",
    QRCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
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
              console.log(res)
              if (res.data.data) {
                if (res.data.data.group_id == 3) {
                  that.setData({
                    name: '军人依法优先',
                    avartar: '../../images/card_logo.png',                  
                  });
                } else {
                  that.setData({                  
                    name: res.data.data.name,                  
                    avartar: getApp().globalData.server + res.data.data.avatar,                    
                  });
                } 
                that.setData({
                  isLog: true,
                  // name: res.data.data.name,
                  group_id: res.data.data.group_id,
                  thisCard: res.data.data.ucard,
                  // avartar: getApp().globalData.server + res.data.data.avatar,
                  thisCard_logo: getApp().globalData.server + res.data.data.idcard1_image,
                  thisCard_img: getApp().globalData.server + res.data.data.idcard2_image,
                  thisCard01: res.data.data.ucard.substring(0, 4),
                  thisCard02: res.data.data.ucard.substring(4, 8),
                  thisCard03: res.data.data.ucard.substring(8, 12),
                  thisCard04: res.data.data.ucard.substring(12, 16),
                  token: res.data.data.token,
                });      
                if (res.data.data.shenhestatus == 4) {
                  that.setData({
                    isShowCard: true
                  })
                } else {
                  that.setData({
                    isShowCard: false
                  })
                }
                that.getQRCode();
              } else {
                wx.redirectTo({
                  url: '../logs/logs'
                })
              }
            },
            fail: function(res) {
              wx.redirectTo({
                url: '../logs/logs'
              })
            }
          })
        } else {
          that.setData({
            isLog: false
          })
          wx.redirectTo({
            url: '../logs/logs'
          })
        }
      },
      fail: function(res) {
        that.setData({
          isLog: false
        })
        wx.redirectTo({
          url: '../logs/logs'
        })
      }
    })
  },
  showUCard: function() {
    if (this.data.isShow) {
      this.setData({
        isShow: false
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  getQRCode: function() {
    let that = this;
    that.setData({
      QRCode: getApp().globalData.server + '/api/user/erweima?token=' + that.data.token
    })
  },
  copyTBL: function(e) {
    console.log(e);
    var that = this;
    wx.setClipboardData({
      data: that.data.thisCard,
      success: function(res) {
        // self.setData({copyTip:true}),
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function(res) {
        //     // if (res.confirm) {
        //     //   console.log('确定')
        //     // } else if (res.cancel) {
        //     //   console.log('取消')
        //     // }
        //   }
        // })
      }
    });
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
    let that = this;
    wx.getStorage({
      key: 'log',
      success: function (res) {
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
            success: function (res) {
              console.log(res)
              if (res.data.data) {
                if (res.data.data.group_id == 3) {
                  that.setData({
                    name: '军人依法优先',
                    avartar: '../../images/card_logo.png',
                  });
                } else {
                  that.setData({
                    name: res.data.data.name,
                    avartar: getApp().globalData.server + res.data.data.avatar,
                  });
                }
                that.setData({
                  isLog: true,
                  // name: res.data.data.name,
                  group_id: res.data.data.group_id,
                  thisCard: res.data.data.ucard,
                  // avartar: getApp().globalData.server + res.data.data.avatar,
                  thisCard_logo: getApp().globalData.server + res.data.data.idcard1_image,
                  thisCard_img: getApp().globalData.server + res.data.data.idcard2_image,
                  thisCard01: res.data.data.ucard.substring(0, 4),
                  thisCard02: res.data.data.ucard.substring(4, 8),
                  thisCard03: res.data.data.ucard.substring(8, 12),
                  thisCard04: res.data.data.ucard.substring(12, 16),
                  token: res.data.data.token,
                });
                if (res.data.data.shenhestatus == 4) {
                  that.setData({
                    isShowCard: true
                  })
                } else {
                  that.setData({
                    isShowCard: false
                  })
                }
                that.getQRCode();
              } else {
                wx.redirectTo({
                  url: '../logs/logs'
                })
              }
            },
            fail: function (res) {
              wx.redirectTo({
                url: '../logs/logs'
              })
            }
          })
        } else {
          that.setData({
            isLog: false
          })
          wx.redirectTo({
            url: '../logs/logs'
          })
        }
      },
      fail: function (res) {
        that.setData({
          isLog: false
        })
        wx.redirectTo({
          url: '../logs/logs'
        })
      }
    })
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