// pages/Detail_Page1/Detail_Page1.js
const util = require('../../utils/util.js')
Page({
  data: {
    comment_button_text: "取消",
    new_comment_bool: false,
    bid_text: "出价",
    min_bidAdd: 5,//最小的加价间隔
    commentInput: null,
    commentCount: 0,
    commentInput_list:[{text:""}
      // "defaultComment_00","defaultComment_01","defaultComment_02","defaultComment_03",
      // "defaultComment_04","defaultComment_05","defaultComment_06","defaultComment_07","defaultComment_08","defaultComment_09","defaultComment_10","defaultComment_11",
      // "defaultComment_12","defaultComment_13","defaultComment_14","defaultComment_15",
      // "defaultComment_16","defaultComment_17","defaultComment_18","defaultComment_19",
      // "defaultComment_20","defaultComment_21","defaultComment_22","defaultComment_23","defaultComment_24","defaultComment_25","defaultComment_26","defaultComment_27",
      // "defaultComment_28","defaultComment_29","defaultComment_30","defaultComment_31"
    ],
    commentInput_set: null,
    bid_show: false,
    comment_show: false,
    no_comment_url:'/images/no_comments.png',
    user:{//这个是各个不同身份的用户的全部信息
      seller_name:'我是一个很厉害的用户名',//卖家的名称
      seller_info1:'我不知道我是登陆计时',//卖家提供的信息1
      seller_info2:'还是别的什么东西',//卖家提供的信息2
      seller_url:'/images/head.png',//卖家的头像地址

      user_name:'myUsername',
      user_url:'/images/head.png',//此账户用户的头像地址
      user_role:'visitor',
      //此账户用户的身份，包含：“visitor”出价者、“buyer”竞拍者、“seller”拍卖者、“winner”中标者
      //会自动根据用户的身份来显示不同样式的页面
      user_price:100,//此账户用户的当前出价
      user_old_price:99999,//此账户用户的原本的出价
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
        role:'buyer'}
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
  changeComment:function(e){//出价界面展开/收起切换函数
    this.setData({
      comment_show: !this.data.comment_show
    })
  },
  changeShow:function(e){//出价界面展开/收起切换函数
    this.setData({
      bid_show: !this.data.bid_show
    })
  },
  priceReduce:function(e){//出价减少按钮函数
    if(this.data.user.user_new_price <= this.data.item.current_price){
      console.log("出价不能比商品当前价格更低");
    }
    else{
      var temp = this.data.user.user_new_price - 1;
      var tempp = "user.user_new_price";
      console.log(temp);
      this.setData({
        [tempp]: temp
      })
    }
  },
  priceAdd:function(e){//出价增加按钮函数
    var temp = this.data.user.user_new_price + 1;
    var tempp = "user.user_new_price";
    console.log(temp);
    this.setData({
      [tempp]: temp
    });
  },
  getComment:function(e){//实时地将用户输入的评论记录在一个变量中
    this.data.commentInput = e.detail.value;
    if(e.detail.value!='' && e.detail.value!=null){
      this.setData({
        comment_button_text:'留言'
        //留言没有内容就给出取消的按钮
        //否则就转换为留言按钮
      });
    }
    else{
      this.setData({
        comment_button_text:'取消'
        //留言没有内容就给出取消的按钮
        //否则就转换为留言按钮
      });
    }
    // console.log("输入的评论是："+this.data.commentInput);
  },
  submitComment:function(e){//用来提交用户输入的评论
    //流程是：将下方的固定界面设置为评论输入界面，然后获得输入的评论内容，当前是第几次评论的计数器count
    //和对应的新评论的列表中的对应位置的元素，然后将数组中此元素的值设置为当前评论的内容，再将input输入
    //框commentInput_set置空，把临时存储评论内容的commentInput置空，准备下一次接受评论，最后将计数
    //器加一，移动到数组的下一个位置
    console.log("输入的评论是："+this.data.commentInput);
    this.changeComment();
    var input = this.data.commentInput;
    var count = this.data.commentCount;
    var list = "commentInput_list["+count+"].text";//console.log(list);
    if(input==null || input==''){//留言没有内容九判定为取消此次留言操作
      console.log("没有留言内容，此次判定为取消");
    }
    else{
      this.setData({
        new_comment_bool: true,
        [list]: input,
        commentInput_set: "",//把输入内的文字设置成空
        commentInput: ""//把输入的值设置成空
      });
      console.log("list的是："+this.data.commentInput_list[count].text);
      this.setData({
        commentCount:count + 1
      });
    }
  },
  submitBid:function(e){
    var new_price = this.data.user.user_new_price;
    var old_price = this.data.user.user_old_price;
    var old_price_x = "user.user_old_price";
    var user_price = "user.user_price";
    var current_price ="item.current_price";
    var user_role ="user.user_role";
    var new_role ="buyer";
    if(new_price - old_price < this.data.min_bidAdd){
      this.setData({
        bid_text: "加价小于最小要求"
      });
    }
    else{
      this.changeShow();//更换底部操作栏回出价-回复的界面
      this.setData({
        [user_role]: new_role,
        [user_price]: new_price,
        [old_price_x]: new_price,
        [current_price]: new_price,
        bid_text: "出价"
      });
      console.log("新："+this.data.user.user_new_price+"旧："+this.data.user.user_old_price);
    }
  },
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