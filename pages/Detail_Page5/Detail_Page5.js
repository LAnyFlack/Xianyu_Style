// pages/Detail_Page1/Detail_Page1.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bid_show: false,
    user:{//这个是各个不同身份的用户的全部信息
      seller_name:'我是一个很厉害的用户名',//卖家的名称
      seller_info1:'我不知道我是登陆计时',//卖家提供的信息1
      seller_info2:'还是别的什么东西',//卖家提供的信息2
      seller_url:'/images/head.png',//卖家的头像地址

      user_role:'visitor',
      //此账户用户的身份，包含：“visitor”出价者、“buyer”竞拍者、“seller”拍卖者、“winner”中标者
      //会自动根据用户的身份来显示不同样式的页面
      user_price:100,//此账户用户的当前出价
      user_new_price:99999//此账户用户的新的出价
    },
    item:{//包含了此商品的基本信息
      current_price:99999,//当前此商品的最高出价
      item_title:'我是拍卖品的题目，我觉得我这个题目很不错',//商品的标题
      item_quality:"ninnew",//商品的成色，包含：“brdnew”全新、“ninnew”九成新、“notnew”磨损、“NULL”未登记
      item_description:'我是一个很好看的拍卖品，有多么好看呢，有那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么那么好看！！！！！'
      //商品的简介
    },
    commentList: [//评论的相关信息，seller角色的用户会出现卖家的提示tag
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
    bidList: [//出价记录列表
      { item_id: 1, name:'我是用户1号',price:'100'}, 
      { item_id: 2, name:'我是用户2号',price:'1000' }, 
      { item_id: 3, name:'我是用户3号',price:'10000' },
    ],
    selectedFlag: [false],//用来指示出价记录是否展开

    list: [//标签列表，由卖家登陆商品可能涉及的标签
      {title: 'iphone'},
      {title: 'apple'},
      {title: 'huawei'},
      {title: 'xiaomi'},
      {title: '罗老师别这样'},
      {title: '这是一个普通的标签'},
      {title: '这是一个不普通的标签'},
      {title: '标'},
      {title: '签'},
      {title: '这是一个比上一个更普通的标签'},
      {title: '标签'}
    ],
      
    //五张实物展示图，可以自动调整尺寸已适应不同设备和不同尺寸的照片
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
    timeLeft: "",//预备储存剩余时间用来显示
    bool:true//用来指示目标时间是否大于当前时间，避免产生剩余时间为负的情况
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
  changeToggle:function(e){//初见记录展开/收起切换函数
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
  changeShow:function(e){//出价界面展开/收起切换函数
    this.setData({
      bid_show: !this.data.bid_show
    })
  },
  priceReduce:function(e){//出价减少按钮函数
    var temp = this.data.user.user_new_price - 1;
    var tempp = "user.user_new_price";
    console.log(temp);
    this.setData({
      [tempp]: temp
    })
  },
  priceAdd:function(e){//出价增加按钮函数
    var temp = this.data.user.user_new_price + 1;
    var tempp = "user.user_new_price";
    console.log(temp);
    this.setData({
      [tempp]: temp
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {//处理倒计时的函数
    if(this.data.bool && this.data.datetimeTo !=""){
      this.data.timer = setInterval(() =>{ 
        this.setData({
          timeLeft: util.getTimeLeft(this.data.datetimeTo)
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
  imageLoad: function (e) {//图片自动调整大小的函数
    var imageSize = util.imageUtil(e);
    this.setData({
    imagewidth: imageSize.imageWidth,
    imageheight: imageSize.imageHeight
    })
  }
})