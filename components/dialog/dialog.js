// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        title:{
            type:String,
            value:'提示'
        },
        content:{
            type:String,
            value:'Hello World'
        },
        cancelText:{
            type:String,
            value:'取消'
        },
        confirmText:{
            type:String,
            value:'确定'
        },
        alert:{
            type:Boolean,
            value:false
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleShow(){
        this.setData({isShow:!this.data.isShow});
    },
    _cancelEvent(){
        this.triggerEvent("cancelEvent");
    },
    _confirmEvent(){
        this.triggerEvent("confirmEvent");
    }
  }
})
