// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',    //用户名名称
    passWord: '',    //密码
    repassWord:'',//重复密码
    secretKey:'',
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },//赋值
  passWordInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  repassWordInput: function (e) {
    this.setData({
      repassWord: e.detail.value
    })
  },
  //获取用户输入的作者名
  loginBtnClick: function (e) {
    let uname = this.data.userName
    let pword = this.data.passWord
    let rpword= this.data.repassWord
    if (uname == '') {
      wx.showToast({
        title: '用户名不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//书名为空时提示
      return false
    }
    else if(uname.length<6||uname.length>8){
      wx.showToast({
        title: '用户名不符合限制',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false
    }
    else if (pword == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if (pword.length < 4) {
      wx.showToast({
        title: '密码少于四位',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if (rpword == '') {
      wx.showToast({
        title: '重复密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if(pword!=rpword){
      wx.showToast({
        title: '密码不一致',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else {
      const db = wx.cloud.database();
      db.collection('person').where({
        username: uname,
      })
        .get().then(res => {
          if (res.data.length != 0) {
            wx.showToast({
              title: '用户名已存在',
              image: '../../photo/wrong.png',
              duration: 2000,
            })
          }
          else {
            wx.showToast({
              title: '注册成功',
              icon: '',
              duration: 2000,
            })//添加成功
            const db = wx.cloud.database();
            db.collection('person').add({
              data: {
                username: this.data.userName,
                password: this.data.passWord,
                status:'normal'
              },
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
  sloginBtnClick: function (e) {
    wx.navigateTo({
      url: '../mregister/mregister'
    })
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