// components/banner/banner.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerArr: [
      { id: 1, img: 'http://gw.alicdn.com/tfs/TB1iBbBm49YBuNjy0FfXXXIsVXa-1280-520.jpg_720x720Q30s100.jpg' },
      { id: 1, img: 'http://gw.alicdn.com/tfs/TB1K4aymCtYBeNjSspaXXaOOFXa-1280-520.jpg_720x720Q30s100.jpg' },
      { id: 1, img: 'http://gw.alicdn.com/tfs/TB1ql2dmVGWBuNjy0FbXXb4sXXa-1280-520.jpg_720x720Q30s100.jpg' },
      { id: 1, img: 'http://gw.alicdn.com/tfs/TB1Jgplm7yWBuNjy0FpXXassXXa-1280-520.jpg_720x720Q30s100.jpg' }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
