//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    server: getApp().globalData.server,
    isLog: false,
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')

    imgUrls: [],
    indicatorDots: true,
    indicatorColor: '#96a6a6',
    indicatorActiveColor: '#f8f8f8',
    autoplay: true,
    interval: 5000,
    duration: 1000,
    mainDataList: [],
    qiyeS: [],

    sellerLocationData: '',

    latitude: "",
    longitude: "",
    nowlatitude: "",
    nowlongitude: "",
    currentCity: "",
    markers: [],
    iconP: {},
    iconPone: '',

    oneIsShow: 1,
    oneLogo: "",
    oneName: "",
    oneAddress: "",
    oneTel: "",
    onejuli: "",
    oneLatitude: "",
    oneLongitude: "",
    oneDongTai: "",

    scene: [getApp().globalData.server + '/xcx-1.png']
  },



  onLoad: function() {
    this.mapCtx = wx.createMapContext('map')
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    let that = this;
    that.getBannerData();
    that.getHotData();
    that.getQiYeData();

    wx.getStorage({
        key: 'log',
        success: function(res) {
          // console.log(res.data)
          // console.log(that)
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
        that.loadCity(res.latitude, res.longitude);
        that.getSellerData(res.latitude, res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          nowlatitude: res.latitude,
          nowlongitude: res.longitude,
        })
      },
      fail: function(res) {
        // console.log(res);
      }
    })
  },
  loadCity: function(latitude, longitude) {
    let that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=oZKOA2lVH1iDGQr1RobpwF9Ob5dG8Rdi&location=' + latitude + ',' + longitude + '&output=json',

      success: function(res) {
        let city = res.data.result.addressComponent.city;
        that.setData({
          currentCity: city
        });
      },
      fail: function() {
        this.setData({
          currentCity: "获取定位失败"
        });
      },

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
        group: 1
      },
      success: function(res) {

        if (res.data.msg == "获取成功") {
          // console.log(res.data.data)
          that.setData({
            imgUrls: res.data.data
          })
        }
      }
    })
  },
  swipclick: function(e) {
    // console.log(e);
    wx.navigateTo({
      url: '../headlineOneInfo/headlineOneInfo?id=' + e.currentTarget.dataset.id
    })
  },
  getHotData: function() {
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
        // console.log(res.data.data)
        if (res.data.data.length < 3) {
          that.setData({
            autoplay: false
          })
        }
        that.setData({
          mainDataList: res.data.data
        })
      }
    })
  },
  getQiYeData: function() {
    let that = this;
    wx.request({
      url: getApp().globalData.server + '/api/seller/qiye',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          qiyeS: res.data.data
        })
        let iconP = {};
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].maplogo_image != "") {
            wx.downloadFile({
              url: getApp().globalData.server + res.data.data[i].maplogo_image,
              success: function(ret) {
                iconP[res.data.data[i].id] = ret.tempFilePath
                that.setData({
                  iconP: iconP
                })
                // console.log(iconP);
              },
              fail: function(err) {
                console.log(err);
              }
            })
          } else {
            iconP[res.data.data[i].id] = ''
          }
        }
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
        that.setData({
          sellerLocationData: res.data.data
        })
        let markers = [];
        for (let i = 0; i < res.data.data.length; i++) {
          // console.log(res.data.data[i].sellerqiye)
          // wx.downloadFile({
          //   url: getApp().globalData.server + res.data.data[i].sellerqiye.maplogo_image,
          //   success: function(ret) {
          // let iconPath = ''
          // if (that.data.qiyeS.length > 6) {
          // iconPath = that.data.iconP[id]
          // } else if (res.data.data[i].sellerqiye.name == "华润万家") {
          //   iconPath = '../../images/icon/hr.png'
          // } else if (res.data.data[i].sellerqiye.name == "中化石油") {
          //   iconPath = '../../images/icon/zh.png'
          // } else if (res.data.data[i].sellerqiye.name == "中国联通") {
          //   iconPath = '../../images/icon/lt.png'
          // } else if (res.data.data[i].sellerqiye.name == "苏宁易购") {
          //   iconPath = '../../images/icon/sn.png'
          // } else if (res.data.data[i].sellerqiye.name == "红孩子") {
          //   iconPath = '../../images/icon/hh.png'
          // } else if (res.data.data[i].sellerqiye.name == "国美零售") {
          //   iconPath = '../../images/icon/gm.png'
          // } 
          let id = res.data.data[i].sellerqiye.id
          that.setData({
            iconPone: that.data.iconP[id]
          })
          markers.push({
            id: res.data.data[i].id,
            latitude: res.data.data[i].tx_y,
            longitude: res.data.data[i].tx_x,
            width: 30,
            height: 30,
            iconPath: that.data.iconP[id],
            callout: {
              content: res.data.data[i].name,
              color: "#ffffff",
              fontSize: 12,
              padding: 4,
              borderRadius: 8,
              bgColor: '#ca0000',
            }
          })
          that.setData({
            markers
          })
          // console.log(markers)
          //   }
          // })
        }
      }
    })
  },
  //事件处理函数
  markertap(e) {
    // console.log(e.markerId)
    // console.log(this)
    
    for (let i = 0; i < this.data.sellerLocationData.length; i++) {
      if (this.data.sellerLocationData[i].id == e.markerId) {
        let juli = this.getFlatternDistance(this.data.nowlatitude, this.data.nowlongitude, this.data.sellerLocationData[i].y, this.data.sellerLocationData[i].x)
        let onejuli = Math.floor(juli)
        console.log(onejuli)
        this.setData({
          oneIsShow: 0,
          oneLogo: getApp().globalData.server + this.data.sellerLocationData[i].sellerqiye.logo_image,
          oneId: this.data.sellerLocationData[i].id,
          oneName: this.data.sellerLocationData[i].name,
          oneAddress: this.data.sellerLocationData[i].address,
          oneTel: this.data.sellerLocationData[i].mobile,
          // onejuli: this.data.sellerLocationData[i].juli,
          onejuli,
          oneLatitude: this.data.sellerLocationData[i].y,
          oneLongitude: this.data.sellerLocationData[i].x,
          oneDongTai: this.data.sellerLocationData[i].dongtai
        })
        
      }
    }
  },
  regionChange: function() {
    let that = this;
    that.mapCtx.getCenterLocation({
      success: function(res) {
        // console.log(res.longitude)
        // console.log(res.latitude)

        // console.log(that.data.latitude)
        // console.log(that.data.longitude)
        let ll = that.getFlatternDistance(that.data.latitude, that.data.longitude, res.latitude, res.longitude)
        // console.log(ll)
        if (ll > 20000) {
          that.getSellerData(res.latitude, res.longitude)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      }
    })
  },
  openSearchPage: () => {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  goHeadline: () => {
    wx.switchTab({
      url: '../headline/headline'
    })
  },
  openShopItemsPage: function() {
    wx.navigateTo({
      url: '../shopitem/shopitem?x=' + this.data.nowlongitude + '&y=' + this.data.nowlatitude
    })
  },
  play: function() {
    let that = this;
    that.getSellerData(that.data.latitude, that.data.longitude)
  },
  gps: function() {
    let that = this;
    that.mapCtx.moveToLocation();
  },
  openMap: function() {
    if (this.data.isLog) {
      wx.openLocation({
        latitude: this.data.oneLatitude - 0,
        longitude: this.data.oneLongitude - 0,
        scale: 28,
        name: this.data.oneName,
        address: this.data.oneAddress
      })
    } else {
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
  },
  setHideOne: function() {
    this.setData({
      oneIsShow: 1,
    })
  },
  openGetApp: () => {
    wx.navigateTo({
      url: '../getApp/getApp'
    })
  },
  openQiye: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../qiYeOneInfo/qiYeOneInfo?id=' + e.currentTarget.dataset.id
    })
  },
  scan() {
    wx.scanCode({
      success: (res) => {
        console.log("扫码结果");
        console.log(res);
        this.setData({
          img: res.result
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  getRad: function(d) {
    var PI = Math.PI;
    return d * PI / 180.0;
  },
  getFlatternDistance: function(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0; //单位M
    // console.log(lat1)
    // console.log(lng1)
    // console.log(lat2)
    // console.log(lng2)


    var f = this.getRad((lat1 - (-lat2)) / 2);
    var g = this.getRad((lat1 - lat2) / 2);
    var l = this.getRad((lng1 - lng2) / 2);

    // console.log(f)
    // console.log(g)
    // console.log(l)

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    // console.log(w)
    // console.log(r)
    // console.log(d)
    // console.log(h1)
    // console.log(h2)


    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  },
  /**
   * 用户点击右上角分享
   */
  onShow: function() {
    let that = this;
    // that.getQiYeData();
  },
  onShareAppMessage: function() {

  }

})