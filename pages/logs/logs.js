//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    accounttype: "",
    your: "",
    password: "",
    isShow: 0,
    pOrT: "password",

    logs: []
  },
  onLoad: function() {
    
  },
  getYour: function(e) {
    this.setData({
      your: e.detail.value,
    })
  },
  getPassword: function(e) {
    this.setData({
      password: e.detail.value,
    })
  },
  seePad: function() {
    if (this.data.isShow == 0) {
      this.setData({
        isShow: 1,
        pOrT: "text"
      })
    } else {
      this.setData({
        isShow: 0,
        pOrT: "password"
      })
    }
  },
  logIn: function() {
    // wx.navigateTo({
    //   url: '../index/index'
    // })
    let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    let cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!phoneReg.test(this.data.your) || this.data.your.length != 16) {
      if (this.data.password.length == 0) {
        wx.showToast({
          title: '请输入有效的密码！',
          icon: 'none',
          duration: 2000
        })
      } else {
        if (this.data.your.length == 11) {
          this.setData({
            accounttype: "mobile"
          })
        } else if (this.data.your.length == 18) {
          this.setData({
            accounttype: "ucard"
          })
        }
        wx.request({
          url: getApp().globalData.server + '/api/user/login',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            accounttype: this.data.accounttype,
            account: this.data.your,
            password: this.data.password
          },
          success: function(res) {
            console.log(res)
            if (res.data.msg == "登录成功") {
              wx.setStorage({
                key: "log",
                data: res.data
              })
              wx.switchTab({
                url: '../index/index'
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function(res) {
            console.log(res)
          }
        })
      }
    } else {
      wx.showToast({
        title: '请输入有效的手机/身份证号码！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  outLogIn: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  openGetApp: (e) => {
    wx.navigateTo({
      url: '../getApp/getApp?m='+e.currentTarget.dataset.mark
    })
  }
})