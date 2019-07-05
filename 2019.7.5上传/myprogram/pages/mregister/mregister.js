// pages/mregister/mregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',    //用户名名称
    passWord: '',    //密码
    repassWord: '',//重复密码
    secretKey:'', //密匙
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },//获取输入的用户名
  passWordInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },//获取输入的密码
  repassWordInput: function (e) {
    this.setData({
      repassWord: e.detail.value
    })
  },//获取输入的重复密码
  secretKeyInput: function (e) {
    this.setData({
      secretKey: e.detail.value
    })
  },//获取输入的密匙
  //获取用户输入的作者名
  registerBtnClick: function (e) {
    let uname = this.data.userName
    let pword = this.data.passWord
    let rpword = this.data.repassWord
    let sekey = this.data.secretKey
    if (uname == '') {
      wx.showToast({
        title: '用户名不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//用户名为空时提示
      return false
    }
    else if (uname.length<4||uname.length>5) {
      wx.showToast({
        title: '用户名不符合限制',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//用户名不符合限制时提示
      return false
    }
    else if (uname.indexOf(" ") != -1) {
      wx.showToast({
        title: '账号不能有空格',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//账号里有空格时进行提示
      return false
    }
    else if (pword == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密码为空时提示
      return false
    }
    else if(pword.length<4){
      wx.showToast({
        title: '密码少于四位',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密码不符合限制时提示
      return false
    }
    else if (rpword == '') {
      wx.showToast({
        title: '重复密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密码为空时提示
      return false
    }
    else if(sekey==''){
      wx.showToast({
        title: '密匙不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密钥为空时提示
      return false
    }
    else if (pword != rpword) {
      wx.showToast({
        title: '密码不一致',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密码不一致时提示
      return false
    }
    else if(sekey!='10086'){
      wx.showToast({
        title: '密匙错误',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//密匙为空时提示
      return false
    }
    else {
      const db = wx.cloud.database();
      db.collection('manager').where({
        username: uname,
      })//按用户名检索manager集合
        .get().then(res => {
          if (res.data.length != 0) {
            wx.showToast({
              title: '用户名已存在',
              image: '../../photo/wrong.png',
              duration: 2000,
            })
          }//用户名存在时提示
          else {
            wx.showToast({
              title: '注册成功',
              icon: '',
              duration: 2000,
            })////注册成功时提示
            const db = wx.cloud.database();
            db.collection('manager').add({
              data: {
                username: this.data.userName,
                password: this.data.passWord
              },//将用户信息添加至manager集合
              success(res) {
                // 输出 [{ "title": "The Catcher in the Rye", ... }]
                console.log(res)
              }
            })
            console.log("用户名：" + this.data.userName + " 密码：" + this.data.passWord)
          }

        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})