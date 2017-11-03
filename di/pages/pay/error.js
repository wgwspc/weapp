// pages/order/pay.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    name:'',
    order_id:'',
    order_sn:'',
    amout:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setDate({
      uid: options.uid,
      name: options.name,
    });
    /* wx.request({
          url: app.d.ceshiUrl+'Api/Searcg/list',
          method:'post',
          data:{
            uid: this.data.city,
            name: this.data.name,
            
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            var order_id = res.data.order_id;
            var order_sn  = res.data.order_sn;
             var amout = res.data.amout;
            that,setData({
                order_id : order_id,
                order_sn: order_sn,
                amout: amout,
            });
            
          },
          fail: function (e) {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          },

        }) */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  wxpay: function () {
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: this.data.order_id,
        order_sn: this.data.order_sn,
        amout: this.data.amout,
        uid: this.data.userId,

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../pay/succes?uid=' + this.data.uid,
                });
              }, 2500);
            },
            fail: function (res) {

              wx.navigateTo({
                url: '../pay/error?uid=' + this.data.uid,
              });

            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})