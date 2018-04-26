//index.js

var API = require('../../api/api.js');


Page({
    data: {
        hotLists: {},//正在热映
        comingLists: {},//即将上映
        mostExpected: {coming:[],paging:{}},//近期最受期待
        isShow: false,
        isEnd: false,
        current: 1,
        xScrollFlag:true
    },
    onLoad() {
        wx.showLoading();
        wx.request({
            url: API.HOT_INIT_URL,
            data: { token: '' },
            success: res => {
                wx.hideLoading();
                this.setData({
                    isShow: false,
                    hotLists: {
                        movieIds: res.data.movieIds,
                        movieLists: res.data.movieList,
                        totalPage: Math.ceil(res.data.total / 10),
                        page: 1
                    }
                })
            },
            fail: res => {
                wx.hideLoading();
            }
        })
    },
    onReady() {

    },
    onReachBottom() {
        //获取上啦加载更多.
        if (this.data.current == 2) {
            //即将上映
            var tLists = this.data.comingLists,
                totalPage = tLists.totalPage,
                page = tLists.page;
            if (page <= totalPage) {
                this.setData({
                    isShow: true
                })
                wx.request({
                    url: API.GET_COMING_URL,
                    data: {
                        ci: 1,
                        token: '',
                        limit: 10,
                        movieIds: this.getMovieIdFilter(page)
                    },
                    success: res => {
                        var newList = {
                            coming: tLists.coming.concat(res.data.coming),
                            page: ++tLists.page
                        }
                        setTimeout(() => {
                            this.setData({
                                isShow: false,
                                comingLists: Object.assign(tLists, newList)
                            })
                        }, 1500)
                    },
                    fail: res => {
                        wx.hideLoading();
                    }
                })
            } else {
                this.setData({
                    isEnd: true
                })
            }
        } else {
            //正在热映
            var tLists = this.data.hotLists,
                totalPage = tLists.totalPage,
                page = tLists.page;
            if (page <= totalPage) {
                this.setData({
                    isShow: true
                })
                wx.request({
                    url: API.GET_HOT_URL,
                    data: {
                        token: '',
                        movieIds: this.getMovieIdFilter(page)
                    },
                    success: res => {
                        var newList = {
                            movieLists: tLists.movieLists.concat(res.data.coming),
                            page: ++tLists.page
                        }
                        setTimeout(() => {
                            this.setData({
                                isShow: false,
                                hotLists: Object.assign(tLists, newList)
                            })
                        }, 1500)
                    },
                    fail: res => {
                        wx.hideLoading();
                    }
                })
            } else {
                this.setData({
                    isEnd: true
                })
            }
        }
    },
    // switchTab
    switchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        });
        if (Object.keys(this.data.comingLists).length == 0) {
            this.getExpectData();
            this.getComingData();
        }
    },
    //get最受期待
    getExpectData(offset,callback) {
        var expectObj = this.data.mostExpected;
        wx.request({
            url: API.GET_EXPECT_URL,
            data: {
                ci: 1,
                token: '',
                offset: offset || 0,
                limit: 10
            },
            success: res => {
                this.setData({
                    mostExpected:{
                        coming: [...expectObj.coming,...res.data.coming],
                        paging: Object.assign(expectObj.paging, res.data.paging)
                    }
                })
                if (callback && typeof callback === 'function') return callback();
            },
            fail: res => {
            }
        })
        
    },
    // get即将热映
    getComingData() {
        wx.showLoading({
            mask:true
        });
        wx.request({
            url: API.COMING_INIT_URL,
            data: {
                ci: 1,
                token: '',
                limit: 10
            },
            success: res => {
                wx.hideLoading();
                this.setData({
                    isShow: false,
                    comingLists: {
                        movieIds: res.data.movieIds,
                        coming: res.data.coming,
                        totalPage: Math.ceil(res.data.movieIds.length / 10),
                        page: 1
                    }
                })
            },
            fail: res => {
                wx.hideLoading();
            }
        })
    },
    // 
    onPullDownRefresh() {
    },
    // 返回要传递的movieIds
    getMovieIdFilter(page, limit = 10) {
        let movieIds = this.data.current == 1 ? this.data.hotLists.movieIds : this.data.comingLists.movieIds;
        let filterMovieIds = movieIds.filter(function (item, index) {
            if (index > page * limit + 1 && index < (page + 1) * limit + 2) {
                return item;
            }
        })
        return filterMovieIds.join(',');
    },
    //detail
    movieDetail(e) {
        let ev = e.currentTarget;
        wx.navigateTo({
            url: `/pages/movieDetail/movieDetail?id=${ev.dataset.id}&title=${ev.dataset.title}`
        })
    },
    scrolltolower(e){
        var xflag = this.data.xScrollFlag,
            mostExpectLen = this.data.mostExpected;
        if (!mostExpectLen.paging.hasMore){
            this.setData({xScrollFlag:false})
        }
        if (mostExpectLen.paging.hasMore){
            this.setData({
                xScrollFlag: false
            })
            var offsetNum = mostExpectLen.paging.offset+10;
            this.getExpectData(offsetNum,()=>{
                this.setData({
                    xScrollFlag: true
                })
            });
        }
        
    }
})
