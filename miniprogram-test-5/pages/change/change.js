// pages/change/change.js
Page({

  data: {
    userName: '',    //用户名名称
    fpassWord: '',    //密码
    npassWord:'',//新密码
    repassWord: '',//重复密码
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },//赋值
  fpassWordInput:function(e){
    this.setData({
      fpassWord:e.detail.value
    })
  },
  npassWordInput: function (e) {
    this.setData({
      npassWord: e.detail.value
    })
  },
  repassWordInput: function (e) {
    this.setData({
      repassWord: e.detail.value
    })
  },
  //获取用户输入的作者名
  sureBtnClick: function (e) {
    let uname = this.data.userName
    let fpword = this.data.fpassWord
    let npword = this.data.npassWord
    let repword = this.data.repassWord
    let id=''
    if (uname == '') {
      wx.showToast({
        title: '用户名不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//书名为空时提示
      return false
    }
    else if (fpword == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if(npword==''){
      wx.showToast({
        title: '新密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if (repword == '') {
      wx.showToast({
        title: '重复密码不能为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if(fpword==npword){
      wx.showToast({
        title: '新旧密码不能一致',
        image: '../../photo/wrong.png',
        duration: 2000,
      })//作者名为空时
      return false
    }
    else if (npword != repword) {
      wx.showToast({
        title: '新密码不一致',
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
          if (res.data.length == 0) {
            wx.showToast({
              title: '用户名不存在',
              image: '../../photo/wrong.png',
              duration: 2000,
            })
          }
          else {
            const db = wx.cloud.database();
            db.collection('person').where({
              password: fpword,
            })
              .get().then(res => {
                if (res.data.length == 0) {
                  wx.showToast({
                    title: '密码错误',
                    image: '../../photo/wrong.png',
                    duration: 2000,
                  })
                }
                else{
                    id=res.data[0]._id
                    const db=wx.cloud.database()
                    db.collection('person').doc(id).update({
                    // data 传入需要局部更新的数据
                    data: {
                      // 表示将 done 字段置为 true
                      password: npword
                    },
                    success: function (res) {
                      console.log(res.data)
                      wx.showToast({
                        title: '密码修改成功',
                        icon: '',
                        duration: 2000,
                      })
                    }
                  })
                }
            })
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