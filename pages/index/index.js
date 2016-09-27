//index.js

var util = require("../../utils/util.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    userInfo: {},
    buttonLoading: false, 
    accountData:[],
    accountTotal:0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.caculateTotal(tempAccountData);
    this.setData({
        accountData: tempAccountData
    });

  },
  // 计算总额
  caculateTotal:function(data){
      var tempTotal = 0;
      for(var x in data){
          tempTotal += parseFloat(data[x].amount);
      }
      this.setData({
        accountTotal: tempTotal
      });
  },
  //表单提交
  formSubmit:function(e){
      this.setData({
        buttonLoading: true
      });

      var that = this;
      setTimeout(function(){
          var inDetail = e.detail.value.inputdetail;
          var inAmount = e.detail.value.inputamount;
          if(inDetail.toString().length <= 0 || inAmount.toString().length <= 0){
              console.log("can not empty");
              that.setData({
                buttonLoading: false
              });
              return false;
          }
          
          //新增记录
          var tempAccountData = wx.getStorageSync("accountData") || [];
          tempAccountData.unshift({detail:inDetail,amount:inAmount});
          wx.setStorageSync("accountData",tempAccountData);
          that.caculateTotal(tempAccountData);
          that.setData({
              accountData: tempAccountData,
              buttonLoading: false
          });

      },1000);
  },
  //删除行
  deleteRow: function(e){
     var that = this;
     var index = e.target.dataset.indexKey;
     var tempAccountData = wx.getStorageSync("accountData") || [];
     tempAccountData.splice(index,1);
     wx.setStorageSync("accountData",tempAccountData);
     that.caculateTotal(tempAccountData);
     that.setData({
        accountData: tempAccountData,
     });
  }
})
