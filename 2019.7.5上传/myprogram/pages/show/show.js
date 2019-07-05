// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infor:[],       //临时存取集合信息
    selColor: '#999',
    selList: [],
    iconStatu: false,
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
    var _this = this;
    const db = wx.cloud.database()
    db.collection('person').get({
      success: res => {
        this.setData({
          infor: res.data
        })
      }//在person集合中检索到结果时将数据拷贝到infor中
    })
    let dataList = this.data.infor;
    dataList.map(function (value) {
      value.selStatu = false;
    })
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