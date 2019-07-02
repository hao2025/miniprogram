// pages/system/system.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  //查询按钮
  searchBtnClick:function(e){
    let uname=this.data.userName
    const db=wx.cloud.database()
    db.collection('person').where({
      username:uname,
    })
      .get().then(res=>{
        if(res.data.length!=0){
          wx.showModal({
            title: '查询结果',
            content: '普通会员',
            showCancel: false,
          })
        }
        else{
          db.collection('personvip').where({
            username: uname,
          })
            .get().then(res => {
              if (res.data.length != 0) {
                wx.showModal({
                  title: '查询结果',
                  content: 'VIP会员',
                  showCancel: false,
                })
              }
              else{
                db.collection('manager').where({
                  username: uname,
                })
                  .get().then(res => {
                    if (res.data.length != 0) {
                      wx.showModal({
                        title: '查询结果',
                        content: '管理员',
                        showCancel: false,
                      })
                    }
                    else {
                      wx.showToast({
                        title: '无此用户',
                        image: '../../photo/wrong.png',
                        duration: 2000,
                      })
                    }
                  })
              }
            })
        }
      })
  },

  //升级按钮
  upBtnClick:function(e){
    let uname = this.data.userName
    let id = ''
    const db = wx.cloud.database()
    db.collection('person').where({
      username: uname,
    })
      .get().then(res => {
        if (res.data.length != 0) {
          id = res.data[0]._id
          db.collection('personvip').add({
            data: {
              username: res.data[0].username,
              password: res.data[0].password,
              status: 'vip'
            },
            success(res) {
              // 输出 [{ "title": "The Catcher in the Rye", ... }]
              console.log(res)
            }
          })
          db.collection('person').doc(id).remove({
            success: res => {
              wx.showToast({
                title: '升级成功',
              })
              this.setData({
                id: '',
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '升级失败',
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '不存在或不是普通用户',
            image: '../../photo/wrong.png',
            duration: 2000,
          })
        }
      })
  },

  //点击删除
  deleteBtnClick:function(e){  
    let uname=this.data.userName
    let id=''
    const db = wx.cloud.database()
    db.collection('person').where({
      username: uname,
    })
      .get().then(res => {
        console.log(res.data.length)
        if (res.data.length == 0) {
          db.collection('personvip').where({
            username:uname,
          })
            .get().then(res=>{
              if(res.data[0].length==0){
                db.collection('manager').where({
                  username:uname,
                })
                  .get().then(res=>{
                    if(res.data[0].length==0){
                      wx.showToast({
                        title: '没有此用户',
                        image: '../../photo/wrong.png',
                        duration: 2000,
                      })
                    }
                    else{
                      id = res.data[0]._id
                      console.log(id)
                      const db = wx.cloud.database()
                      db.collection('manager').doc(id).remove({
                        success: res => {
                          wx.showToast({
                            title: '删除成功',
                          })
                          this.setData({
                            id: '',
                          })
                        },
                        fail: err => {
                          wx.showToast({
                            icon: 'none',
                            title: '删除失败',
                          })
                        }
                      })
                    }
                  })
              }
              else{
                id = res.data[0]._id
                console.log(id)
                const db = wx.cloud.database()
                db.collection('personvip').doc(id).remove({
                  success: res => {
                    wx.showToast({
                      title: '删除成功',
                    })
                    this.setData({
                      id: '',
                    })
                  },
                  fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '删除失败',
                    })
                  }
                })
              }
            })
        }
        else{
          id=res.data[0]._id
          console.log(id)
          const db = wx.cloud.database()
          db.collection('person').doc(id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              this.setData({
                id: '',
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              })
            }
          })
        }
      })
  },
  exitBtnClick: function (e) {
    wx.reLaunch({
      url: '../choice/choice',
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