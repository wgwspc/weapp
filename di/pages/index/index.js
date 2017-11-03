var app = getApp();

var __dirname = 'pages/index',
  __overwrite = require('../../utils/overwrite.js');
require('../../utils/dateFormat.js');

(function (require, Page) {
  var CalendarPlugin = require('components/calendar/index');
  Page({
    data: {
      city: '上海',
      searchValue: '',
      date: {
        indate: new Date().format('yyyy-MM-dd'),
        outdate: new Date(+new Date + 3600000 * 24).format('yyyy-MM-dd')
      }
    },
    onLoad: function () {
      // 生命周期函数--监听页面加载

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
    searchValueInput: function (e) {
      var searchValue = e.detail.value;
      
      this.setData({
        searchValue: searchValue
      }); 
      
    },
    searchlist: function(){
      
     
      wx.navigateTo({
        url: '../search/list?city=' + this.data.city + '&indate=' + this.data.date.indate + '&outdate=' + this.data.date.outdate + 'searchValue=' + this.data.searchValue,
      })
    },
    
  });
})(__overwrite.require(require, __dirname), __overwrite.Page);
