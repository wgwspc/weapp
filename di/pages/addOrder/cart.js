// pages/order/cart.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hid:'',
    uid:'',
    hname:'',
    num:1,
    peopel:1,
    pname:'',
    card:'',
    total:0,
    tel:'',
    amount:0,
    fullmoney:0,
    deposit:0,
    date: {
      indate: new Date().format('yyyy-MM-dd'),
      outdate: new Date(+new Date + 3600000 * 24).format('yyyy-MM-dd')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setDate({
          indate:options.indate,
          outdate:options.putdate,
          uid:options.uid,
          hid:options.id,
      })

      /* wx.request({
           url: app.d.ceshiUrl+'Api/Detail/index',
           method:'post',
           data:{
            hid: id
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
  minusAdultNum: function () {//减少成人的数量
    this.data.adultNum--;
    if(this.data.adultNum > 0) {
      this.setData({
        num: this.data.adultNum
      })
    } else {
      this.data.adultNum++;
      var obj = {
        pointer: this,
        info: '成人数量不能小于1！',
        duration: 2000
      }
      app.toast1(obj);
    }
  },
  minusChildNum: function () {//减少儿童的数量
    this.data.childNum--;
    if (this.data.childNum >= 0) {
      this.setData({
        people: this.data.childNum
      })
    } else {
      this.data.childNum++;
      var obj = {
        pointer: this,
        info: '儿童数量不能小于0！',
        duration: 2000
      }
      app.toast1(obj);
    }
  },
  plusAdultNum: function () {//增加成人的数量
    this.data.adultNum++;
    if(this.data.adultNum + this.data.childNum > 9) {
      this.data.adultNum--;
      var obj = {
        pointer: this,
        info: '成人+儿童最多支持9人！',
        duration: 2000
      }
      app.toast1(obj);
    } else {
      this.setData({
        num: this.data.adultNum
      })
    }
  },
  plusChildNum: function () {//增加儿童的数量
    this.data.childNum++;

   if (this.data.adultNum + this.data.childNum > 9) {
      this.data.childNum--;
      var obj = {
        pointer: this,
        info: '成人+儿童最多支持9人！',
        duration: 2000
      }
      app.toast1(obj);
    } else {
      this.setData({
        people: this.data.childNum
      })
    }
  },
  pnameValueInput: function (e) {
    var pname = e.detail.value;

    this.setData({
      pname: pname
    });

  },
  cardValueInput: function (e) {
    var card = e.detail.value;

    this.setData({
      card:  card
    });

  },
  createProductOrder: function () {
   //创建订单
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Payment/payment',
      method: 'post',
      data: {
        uid: that.data.userId,
        hname: that.data.hname,
        hid: that.data.hid,
        indate: that.data.date.indate,//地址的id
        outdate: that.data.date.outdate,//用户备注
        num:that.data.num,
        people:that.data.people,
        tel:that.data.tel,
        card:that.data.card,
        total:that.data.total,
        amount:that.data.amount,
        fullmoney:that.data.fullmoney,
        deposit:that.data.deposit,
        price: that.data.total,//总价
        vid: that.data.vid,//优惠券ID
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;
        if (data.status == 1) {
          //创建订单成功
         
            //微信支付
            that.wxpay(data.arr);
          
        } else {
          wx.showToast({
            title: "下单失败!",
            duration: 2500
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        });
      }
    });
  },

  //调起微信支付
  wxpay: function (order) {
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order.order_id,
        order_sn: order.order_sn,
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
                  url: '../pay/succes?uid='+this.data.uid,
                });
              }, 2500);
            },
            fail: function (res) {
              
                wx.navigateTo({
                  url: '../pay/error?uid=' + this.data.uid+'&name='+this.data.name,
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