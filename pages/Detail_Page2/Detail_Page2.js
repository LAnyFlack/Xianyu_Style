// pages/Detail_Page1/Detail_Page1.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      name:'我是一个很厉害的用户名',
      user_info1:'我不知道我是登陆计时',
      user_info2:'还是别的什么东西',
      user_price:100,
      user_url:'/images/head.png'
    },
    item:{
      current_price:99999,
      item_title:'我是拍卖品的题目，我觉得我这个题目很不错',
      item_description:'我是一个很好看的拍卖品，有多么好看呢，有那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么好看！！！！！'
    },
    
    commentList: [
      { item_id: 1, 
        name:'我是用户1号',
        text:'我好喜欢这个商品啊！！',
        url:'/images/head.png',
        role:'buyer'}, 

      { item_id: 2, 
        name:'我是用户2号',
        text:'我不喜欢但是我我还是要评论',
        url:'/images/head.png',
        role:'seller'}, 

      { item_id: 3, 
        name:'我是用户3号',
        text:'我觉得不行，我也不知道我喜不喜欢',
        url:'/images/head.png',
        role:'buyer'},
    ],
    bidList: [
      { item_id: 1, name:'我是用户1号',price:'100'}, { item_id: 2, name:'我是用户2号',price:'1000' }, { item_id: 3, name:'我是用户3号',price:'10000' },
    ],
    selectedFlag: [false],
    quality:"ninnew",
    list: [{title: 'iphone'},{title: 'apple'},{title: 'huawei'},{title: 'xiaomi'},{title: '罗老师别这样'},{title: '这是一个普通的标签'},{title: '这是一个不普通的标签'},{title: '标'},{title: '签'},{title: '这是一个比上一个更普通的标签'},{title: '标签'}],
    item_image1: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2651866529,447223239&fm=26&gp=0.jpg',
    item_image2: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3393996789,3606006142&fm=26&gp=0.jpg',
    item_image3: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2829549029,1031122743&fm=26&gp=0.jpg',
    item_image4: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1114751058,1476283770&fm=26&gp=0.jpg',
    item_image5: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3609079631,2329147195&fm=26&gp=0.jpg',

    imagewidth: 0,//缩放后的宽
    imageheight: 0,//缩放后的高,
    datetimeTo: "2020/08/01 10:30:00 GMT+0800", 
    //需要输入拍卖结束的时间，可自动显示拍卖是否在进行剩余时间
    //如果不输入目标时间则在页面中不显示倒计时，表示此拍卖永久有效？
    timeLeft: "" ,
    bool:true
    //用来指示目标时间是否大于当前时间，避免产生剩余时间为负的情况
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp0 = Date.parse(new Date());
    var timestamp1 = Date.parse(this.data.datetimeTo);
    if(timestamp1<timestamp0){
      this.data.bool=false;
    }
  },

  changeToggle:function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]){
      this.data.selectedFlag[index] = false;
    }else{
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
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
    if(this.data.bool && this.data.datetimeTo !=""){
      this.data.timer = setInterval(() =>{ //注意箭头函数！！
        this.setData({
          timeLeft: util.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
        });
        if (this.data.timeLeft == "拍卖已结束") {
          clearInterval(this.data.timer);
        }
      }, 1000);
    }
    else if(this.data.datetimeTo ==""){
      this.setData({
        timeLeft: ""
      });
    }
    else{
      this.setData({
        timeLeft: "拍卖已结束"
      });
    }
    
  },
  imageLoad: function (e) {
    var imageSize = util.imageUtil(e);
    this.setData({
    imagewidth: imageSize.imageWidth,
    imageheight: imageSize.imageHeight
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