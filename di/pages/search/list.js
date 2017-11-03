// pages/search/list.js
var app = getApp();
var compose = require('../../utils/compose');
var dateFormat = require('../../utils/dateutil');
var utils = require('../../utils/utils');

var __dirname = 'pages/index',
  __overwrite = require('../../utils/overwrite.js');
require('../../utils/dateFormat.js');

(function (require, Page) {
  var CalendarPlugin = require('components/calendar/index');
  Page({
    data: {
      city: '',
      searchValue: '',
      date: {
        indate: new Date().format('yyyy-MM-dd'),
        outdate: new Date(+new Date + 3600000 * 24).format('yyyy-MM-dd')
      }
    },
    onLoad: function (options) {
      // 生命周期函数--监听页面加载
      var that = this;
      that.setData({
        city: options.city,
        indate: options.indate,
        outdate: options.outdate,
        searchValue: options.searchValue,
      });
     
     /* wx.request({
          url: app.d.ceshiUrl+'Api/Searcg/list',
          method:'post',
          data:{
            city: this.data.city,
            indate: this.data.date.indate,
            outdate: this.data.date.outdate,
            keywords: this.data.ssearchValue,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            var list = res.data.list;
            var gto  = res.data.imgs;
            that,setData({
                hotD : list,
                imgObj: gto,
            });
            if(list=''){
              wx.showToast({
                title: '没有更多数据了',
                duration:2000
              });
            }
          },
          fail: function (e) {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          },

        }) */
    },
    onReady: function () {

    },
    openCalendar: function () {
      var that = this;
      CalendarPlugin({
        begin: that.data.date.indate,
        end: that.data.date.outdate
      }, function (res) {
        that.data.date.indate = res.start.format('yyyy-MM-dd');
        that.data.date.outdate = res.end.format('yyyy-MM-dd');
        that.setData({
          date: that.data.date
        })
      })
    },

    selectCity: function (e) {//选择城市 切换保存方法
      wx.navigateTo({
        url: '../switchcity/switchcity'
      })
    },
    searchlist: function () {
      var objParams = {
        'city': this.data.city,
        'indate': this.data.date.indate,
        'outdate': this.data.date.outdate,
        'searchValue': this.data.searchValue
      };
      wx.setStorageSync('productSearchParams', objParams);
      wx.navigateTo({
        url: '../search/list',
      })
    },

  });
})(__overwrite.require(require, __dirname), __overwrite.Page);

