// components/loadMore/loadMore.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            value: false
        },
        isEnd: {
            type: Boolean,
            value: false
        },
        loadText: {
            type: String,
            value: '加载中...'
        },
        endText: {
            type: String,
            value: '到底了~'
        }
    },

})
