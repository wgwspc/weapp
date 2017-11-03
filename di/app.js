// app.js
App({
 /* d: {
    hostUrl: 'https://wxplus.paoyeba.com/index.php',
    hostImg: 'http://img.ynjmzb.net',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 1,
    appId:"",
    appKey:"",
    ceshiUrl:'',
  },*/
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //login
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          //get wx user simple info
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
              //get user sessionKey
              //get sessionKey
             // that.getUserSessionKey(code);
            }
          });
        }
      });
    }
  },
  getAuthor: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.openSetting({
            success(res){
              console.log(res)
              if (!res.authSetting['scope.userLocation']) {
                wx.showModal({
                  title: '温馨提醒',
                  content: '需要获取您的地理位置才能使用小程序',
                  cancelText: '不使用',
                  confirmText: '获取位置',
                  success: function (res) {
                    if (res.confirm) {
                      getAuthor();
                    } else if (res.cancel) {
                      wx.showToast({
                        title: '您可点击左下角 定位按钮 重新获取位置',
                        icon: 'success',
                        duration: 3000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })

  },
  
  

 globalData:{
    userInfo:null
  },

  onPullDownRefresh: function (){
    wx.stopPullDownRefresh();
  }

});






