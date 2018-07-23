// pages/headline/headline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: getApp().globalData.server,
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    menuList: [],
    mainDataList: [],
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: '#96a6a6',
    indicatorActiveColor: '#f8f8f8',
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
    if (e.detail.current == 0) {
      this.setData({
        winHeight: 372 + 224 * 6
      });
    } else {
      this.setData({
        winHeight: 224 * 6
      });
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../headlineOne/headlineOne?id=' + e.currentTarget.dataset.categoryId
    })
    // var cur = e.target.dataset.current;
    // if (this.data.currentTaB == cur) {
    //   return false;
    // } else {
    //   if (cur == 0) {
    //     this.setData({
    //       winHeight: 372 + 224 * 6
    //     });
    //   } else {
    //     this.setData({
    //       winHeight: 224 * 6
    //     });
    //   }
    //   this.setData({
    //     currentTab: cur
    //   })
    // }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function() {
    let that = this;
    that.getMenuData();
    that.getBannerData();
    that.getMainData();
    //  高度自适应
    // if (that.data.currentTab == 0) {
    //   that.setData({
    //     winHeight: 372 + 224 * that.data.imgUrls.length
    //   });
    // } else {
    //   that.setData({
    //     winHeight: 224 * that.data.imgUrls.length
    //   });
    // }

  },
  getMenuData: function() {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/common/category_menu',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        client: "xcx"
      },
      success: function(res) {
        console.log(res)
        if (res.data.msg == "获取成功") {
          console.log(res.data.data)
          that.setData({
            menuList: res.data.data
          })
        }
      },
      fail: function() {
        console.log(res)
      }
    })
  },
  getBannerData: function() {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/banner/lists',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        group: 2
      },
      success: function(res) {

        if (res.data.msg == "获取成功") {
          console.log(res.data.data)
          that.setData({
            imgUrls: res.data.data
          })
        }
      }
    })
  },
  getMainData: function() {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/article/arclist',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        category_id: "",
        page: "1",
        limit: "999999",
        flag: "tuijian"
      },
      success: function(res) {
        
        that.setData({
          mainDataList: res.data.data
        })
      }
    })
  },
  swipclick: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../headlineOneInfo/headlineOneInfo?id=' + e.currentTarget.dataset.id
    })
  },
  goNewsInfo: function(e) {
    console.log(e),
      wx.navigateTo({
        url: '../headlineOneInfo/headlineOneInfo?id=' + e.currentTarget.dataset.id
      })
  },
  // footerTap: app.footerTap,

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {

  // },

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