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
  },//获取输入的用户名
  searchBtnClick:function(e){
    let uname=this.data.userName
    if(uname==''){
      wx.showToast({
        title: '账号为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    const db=wx.cloud.database() //连接数据库
    db.collection('person').where({
      username:uname,
    })//按用户名检索person集合
      .get().then(res=>{
        if(res.data.length!=0){
          wx.showModal({
            title: '查询结果',
            content: '普通会员',
            showCancel: false,
          })
        }//显示查询结果
        else{
          db.collection('personvip').where({
            username: uname,
          })//按用户名检索personvip集合
            .get().then(res => {
              if (res.data.length != 0) {
                wx.showModal({
                  title: '查询结果',
                  content: 'VIP会员',
                  showCancel: false,
                })
              }//显示查询结果
              else{
                db.collection('manager').where({
                  username: uname,
                })//按用户名检索manager
                  .get().then(res => {
                    if (res.data.length != 0) {
                      wx.showModal({
                        title: '查询结果',
                        content: '管理员',
                        showCancel: false,
                      })
                    }//显示查询结果
                    else {
                      wx.showToast({
                        title: '无此用户',
                        image: '../../photo/wrong.png',
                        duration: 2000,
                      })
                    }
                  })//查询不到，显示结果
              }
            })
        }
      })
  },
  upBtnClick:function(e){
    let uname = this.data.userName
    let id = ''
    let ucount=400
    if (uname == '') {
      wx.showToast({
        title: '账号为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    const db = wx.cloud.database()
    db.collection('person').where({
      username: uname,
    })//按用户名检索person集合
      .get().then(res => {
        if (res.data.length != 0) {
          id = res.data[0]._id
          ucount=res.data[0].count+400
          db.collection('personvip').add({
            data: {
              username: res.data[0].username,
              password: res.data[0].password,
              status: 'vip',
              count:ucount
            },//查询到该普通用户时将其添加至personvip集合
            success(res) {
              console.log(res)
            }
          })
          db.collection('person').doc(id).remove({
            success: res => {
              wx.showToast({
                title: '升级成功',
              })//检索条件为id，并将原person集合下的该用户移除
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
          })//失败时进行处理
        }
        else {
          wx.showToast({
            title: '请检查用户',
            image: '../../photo/wrong.png',
            duration: 2000,
          })
        }
      })//查询不到时进行提示
  },
  deleteBtnClick:function(e){
    let uname=this.data.userName
    let id=''
    if (uname == '') {
      wx.showToast({
        title: '账号为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    const db = wx.cloud.database()
    db.collection('person').where({
      username: uname,
    })//按用户名检索person集合
      .get().then(res => {
        console.log(res.data.length)
        if (res.data.length == 0) {
          db.collection('personvip').where({
            username:uname,
          })//按用户名检索personvip集合
            .get().then(res=>{
              if(res.data.length==0){
                db.collection('manager').where({
                  username:uname,
                })//按用户名检索manager集合
                  .get().then(res=>{
                    if(res.data.length==0){
                      wx.showToast({
                        title: '没有此用户',
                        image: '../../photo/wrong.png',
                        duration: 2000,
                      })//都查询不到则删除失败
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
                        },//该用户为manager时删除
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
                  },//该用户为personvip时删除
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
            },//该用户为person时删除
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
    wx.redirectTo({
      url: '../choice/choice',
    })
  },//点击退出按钮跳转到初始页面
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