var hotData = require('../../datas/hot.js');
const API_INIT_URL = 'http://m.maoyan.com/ajax/movieOnInfoList';
const API_GET_URL = "http://m.maoyan.com/ajax/moreComingList"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieIds: [],
    movieLists: [],
    isShow: false,
    isEnd: false,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  console.log9(2)
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
    console.log('hot')
    setTimeout(() => {
      wx.hideToast();
      wx.stopPullDownRefresh();
      this.setData({
        isShow: false,
        movieIds: hotData.hotData.movieIds,
        movieLists: hotData.hotData.movieList
      })
    }, 1500)
    // wx.request({
    //   url: API_INIT_URL,
    //   data: {
    //     token: ''
    //   },
    //   success: res => {
    //     wx.hideToast();
    //     this.setData({
    //       isShow: false,
    //       movieIds: res.data.movieIds,
    //       movieLists: res.data.movieList
    //     })
    // console.log(this.data)
    //   },
    //   fail: res => {
    //     wx.hideToast();
    //     console.log(res)
    //   }
    // })
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
    if (this.getMovieIdFilter(this.data.page)) {
      this.setData({
        isShow: true
      })
      wx.request({
        url: API_GET_URL,
        data: {
          token: '',
          movieIds: this.getMovieIdFilter(this.data.page)
        },
        success: res => {
          setTimeout(() => {
            this.setData({
              isShow: false,
              movieLists: this.data.movieLists.concat(res.data.coming),
              page: this.data.page += 1
            })
          }, 1500)
        },
        fail: res => {
          wx.hideToast();
          console.log(res)
        }
      })
    } else {
      this.setData({
        isEnd: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  movieDetail(e) {
    let ev = e.currentTarget;
    wx.navigateTo({
      url: `/pages/movieDetail/movieDetail?id=${ev.dataset.id}&title=${ev.dataset.title}`
    })
  },
  // 返回要传递的movieIds
  getMovieIdFilter(page) {
    let filterMovieIds = this.data.movieIds.filter(function (item, index) {
      if (index > page * 10 + 1 && index < (page + 1) * 10 + 2) {
        return item;
      }
    })
    return filterMovieIds.join(',');
  }
})