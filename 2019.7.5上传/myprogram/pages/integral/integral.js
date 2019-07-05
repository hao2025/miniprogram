// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    counter:0
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  counterInput: function (e) {
    this.setData({
      counter: e.detail.value
    })
  },
  searchCounter: function (e) {
    let uname = this.data.userName
    let id = ''
    let strcount = ''
    if (uname == '') {
      wx.showToast({
        title: '顾客栏为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else{
      const db = wx.cloud.database();
      db.collection('person').where({
        username: uname
      })
        .get().then(res => {
          if (res.data.length != 0) {
            id = res.data[0]._id
            strcount = String(res.data[0].count)
            wx.showModal({
              title: '查询成功',
              content: '剩余积分：' + strcount,
              showCancel: false,
            })
          }
          else {
            const db = wx.cloud.database();
            db.collection('personvip').where({
              username: uname
            })
              .get().then(res => {
                if (res.data.length != 0) {
                  id = res.data[0]._id
                  strcount = String(res.data[0].count)
                  wx.showModal({
                    title: '查询成功',
                    content: '剩余积分：' + strcount,
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
  },
  addCounter:function(e){
    let uname = this.data.userName
    let ucounter = parseFloat(this.data.counter)
    let id=''
    let strcount=this.data.counter
    if (uname == '') {
      wx.showToast({
        title: '顾客栏为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if(strcount==''){
      wx.showToast({
        title: '积分栏为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if(ucounter<0){
      wx.showToast({
        title: '积分值错误',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if (ucounter > 100000) {
      wx.showToast({
        title: '积分大于100W',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else{
      if (!(/^-?\d*\.?\d*$/.test(strcount))) {
        wx.showToast({
          title: '积分值非法',
          image: '../../photo/wrong.png',
          duration: 2000,
        })
        return false;
      }//利用正则表达式对字符进行判断，看其是否为整数或浮点数
      const db=wx.cloud.database();
      db.collection('person').where({
        username:uname
      })
        .get().then(res=>{
          if (res.data.length != 0) {
            id = res.data[0]._id
            ucounter = ucounter + parseFloat(res.data[0].count)
            ucounter=ucounter.toFixed(2)
            console.log(ucounter)
            const db = wx.cloud.database()
            db.collection('person').doc(id).update({
              // data 传入需要局部更新的数据
              data: {
                count:ucounter     //更新数据
              },
              success: function (res) {
                wx.showModal({
                  title: '积分成功',
                  content: '剩余积分：'+ucounter,
                  showCancel: false,
                })//修改成功时进行提示
              }
            })
          }
          else{
            const db=wx.cloud.database();
            db.collection('personvip').where({
              username:uname
            })
              .get().then(res=>{
                if(res.data.length!=0){
                  id = res.data[0]._id
                  ucounter = ucounter + parseFloat(res.data[0].count)
                  ucounter = ucounter.toFixed(2)
                  const db = wx.cloud.database()
                  db.collection('personvip').doc(id).update({
                    // data 传入需要局部更新的数据
                    data: {
                      count: ucounter     //更新数据
                    },
                    success: function (res) {
                      wx.showModal({
                        title: '积分成功',
                        content: '剩余积分：' + ucounter,
                        showCancel: false,
                      })//修改成功时进行提示
                    }
                  })
                }
                else{
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
  },
  delCounter: function (e) {
    let uname = this.data.userName
    let ucounter = parseFloat(this.data.counter)
    let id = ''
    let strcount=this.data.counter
    if (uname == '') {
      wx.showToast({
        title: '顾客栏为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if (strcount == '') {
      wx.showToast({
        title: '积分栏为空',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if (ucounter < 0) {
      wx.showToast({
        title: '积分值错误',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else if(ucounter>100000){
      wx.showToast({
        title: '积分值>100W',
        image: '../../photo/wrong.png',
        duration: 2000,
      })
      return false;
    }
    else {
      if (!(/^-?\d*\.?\d*$/.test(strcount))) {
        wx.showToast({
          title: '积分值非法',
          image: '../../photo/wrong.png',
          duration: 2000,
        })
        return false;
      }//利用正则表达式对字符进行判断，看其是否为整数或浮点数
      const db = wx.cloud.database();
      db.collection('person').where({
        username: uname
      })
        .get().then(res => {
          if (res.data.length != 0) {
            if(res.data[0].count<ucounter){
              wx.showToast({
                title: '积分不足',
                image: '../../photo/wrong.png',
                duration: 2000,
              })
              return false;
            }
            id = res.data[0]._id
            ucounter = parseFloat(res.data[0].count)-ucounter
            ucounter=ucounter.toFixed(2)
            if (typeof (ucounter) == Number) {
              console.log('number')
            } else {
              console.log('string')
            }
            const db = wx.cloud.database()
            db.collection('person').doc(id).update({
              // data 传入需要局部更新的数据
              data: {
                count: ucounter     //更新数据
              },
              success: function (res) {
                wx.showModal({
                  title: '扣除成功',
                  content: '剩余积分：' + ucounter,
                  showCancel: false,
                })//修改成功时进行提示
              }
            })
          }
          else {
            const db = wx.cloud.database();
            db.collection('personvip').where({
              username: uname
            })
              .get().then(res => {
                if (res.data.length != 0) {
                  if (res.data[0].count < ucounter) {
                    wx.showToast({
                      title: '积分不足',
                      image: '../../photo/wrong.png',
                      duration: 2000,
                    })
                    return false;
                  }
                  id = res.data[0]._id
                  ucounter = parseFloat(res.data[0].count) - ucounter
                  ucounter = ucounter.toFixed(2)//结果保留两位小数
                  const db = wx.cloud.database()
                  db.collection('personvip').doc(id).update({
                    // data 传入需要局部更新的数据
                    data: {
                      count: ucounter     //更新数据
                    },
                    success: function (res) {
                      wx.showModal({
                        title: '扣除成功',
                        content: '剩余积分：' + ucounter,
                        showCancel: false,
                      })//修改成功时进行提示
                    }
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