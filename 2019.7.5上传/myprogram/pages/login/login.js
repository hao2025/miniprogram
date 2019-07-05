// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',    //用户名称
    passWord: '', //密码
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },//获取输入的账户
  passWordInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },//获取输入的密码
  loginBtnClick: function (e) {
    let uname = this.data.userName
    let pword = this.data.passWord
    let usname=''
    let paword=''
    if (uname == '') {
      wx.showToast({
        title: '用户名不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false
    }//当用户名为空时，进行提示
    else if (pword == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//当密码为空时，进行提示
      return false
    }
    else {
      const db=wx.cloud.database();
      db.collection('manager').where({
        username:uname,
      })//按用户名检索集合manager
        .get().then(res=>{
          console.log(res.data.length)
          if (res.data.length == 0) {
            wx.showToast({
              title: '用户名错误',
              image: '../../photo/wrong.png',
              duration: 2000,
            })//检索失败时进行提示
          }
          else if (res.data[0].password != pword) {
            wx.showToast({
              title: '密码错误',
              image: '../../photo/wrong.png',
              duration: 2000,
            })//密码错误时进行提示
          }
          else {
            wx.showToast({
              title: '登陆成功',
              icon: '',
              duration: 2000,
            })//用户名和密码匹配成功，进行提示
            wx.switchTab({
              url: '../show/show',
            })//登陆成功并跳转页面
          }
        })
    }
  },
  changeBtnClick:function(e){
    wx.navigateTo({
      url: '../change/change'
    })
  },//点击修改按钮进行跳转页面
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