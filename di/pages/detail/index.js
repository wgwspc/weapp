// pages/detail/index.js
var app = getApp();
var user_id;

var __dirname = 'pages/index',
  __overwrite = require('../../utils/overwrite.js');
require('../../utils/dateFormat.js');

(function (require, Page) {
  var CalendarPlugin = require('components/calendar/index');
  Page({
    data: {
      uid: user_id,
      id:'',
      date: {
        indate: new Date().format('yyyy-MM-dd'),
        outdate: new Date(+new Date + 3600000 * 24).format('yyyy-MM-dd')
      }
    },
    onLoad: function (options) {
      // 生命周期函数--监听页面加载
      var that = this;
      that.setData({
        indate: options.indate,
        outdate: options.outdate,
        id : options.id,
      });

      /* wx.request({
           url: app.d.ceshiUrl+'Api/Detail/index',
           method:'post',
           data:{
            id: id
           },
           header: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           success:function(res){
             var detail = res.data.detail;
            
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
    openMap:function(){
      wx.openLocation({
        latitude: '',
        longitude: '',
      })
    },
    addOrder: function(){
      if(!uid){
        wx.navigateTo({
          url: '../login/register',
        })
      }
     
      wx.navigateTo({
        url: '../addOrder/cart?uid='+this.data.uid+'&hid='+this.data.id+'&indate='+this.data.date.indate+'&outdate='+this.data.date.outtime,
      })
    }

  });
})(__overwrite.require(require, __dirname), __overwrite.Page);


