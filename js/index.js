// 验证本地存的local是否有效
initFingerprintJS(verifyRequest);
var visitorId = '80017177de1cb67cf66ae6c5f1e00008';
function initFingerprintJS(verifyRequest) {
  // Initialize an agent at application startup.
  var fpPromise = FingerprintJS.load(); // Get the visitor identifier when you need it.

  fpPromise.then(function (fp) {
    return fp.get();
  }).then(function (result) {
    // This is the visitor identifier:
    visitorId = result.visitorId;
    // console.log(visitorId);
    // verifyRequest(visitorId);
  });
}
// function checkVerify(verifyRequest){
//   var fingerprint = '';
//   new Fingerprint2().get(function(result, components){
//     fingerprint = result;
//     verifyRequest(fingerprint);
//     console.log(result); //a hash, representing your device fingerprint
//   });
// }
function verifyRequest(fingerprint){
  if(localStorage.getItem("is_sign") === 'true' ){
    return false;
  }
  $.ajax({
    url: 'https://vote.huanqiu.com/api/v1/verify',
    type: 'POST',
    data: {"id":"af96c","fingerprint":fingerprint}
  })
  .done(function(res) {
    // 已经签名
    if(res.code !== 0){
      // $('.sign').removeAttr('onclick').text(checkTip('您已经签名了'));
      localStorage.setItem("is_sign", 'true');
    }
    console.log("success");
  })
  .fail(function(e) {
    console.log(e.statusText);
  })
  .complete(function() {
    btnswitch = true;
    console.log("complete");
  })
}

renders(language);
function renders(t){
  document.title = languageText[t].headTile;
  $('.til').text(languageText[t].title);
  $('#tit1').text(languageText[t].tit1);
  $('#tit2').text(languageText[t].tit2);
  $('.seeMore1').text(languageText[t].tit1More);
  $('.seeMore2').text(languageText[t].tit2More);
  $('p.p1').text(languageText[t].content2);
  $('.moreText').html(languageText[t].content2More);
  $('.til2').html(languageText[t].signNum);
  $('#en-ch').text(languageText[t].btnText);
  $('#buttSign').text(languageText[t].signText1);
  $('.pop-til p').text(languageText[t].signSuccess);
  // 如果英文隐藏一些元素
  if(t === 'en'){
    $('#fable,.pop-content p,#ewmimg,.codes').hide();
  }else{
    $('#fable,.pop-content p,#ewmimg,.codes').show();
  }
  $('.switch').css('opacity',1);
  $('body,html').animate({ scrollTop: 0 }, 100);;
  $('.moreText').hide();
  $('.showAll').show();
  messageOut1();
  // 需要重新获取投票数
  getInfo();
  // 初始化按钮
  initSignBtn();
  // 初始投票成功界面
  checkIs_wx();
}

// 检查不同语言提示语
function checkTip(info){
  var infos = info
  if(language !== 'zh'){
    switch(info){
      case '您已经签名了':
          infos = 'You have signed';
          break;
      case '已经签名过':
          infos = 'You have signed';
          break;
      case '签名失败，请刷新重试':
          infos = 'Failed. Please refresh and retry';
          break;
      case '您已签名，不可重复签名':
          infos = 'You’ve signed. Non-repeatable signature';
          break;
      case '你的网络签名的人太多，请稍后再试':
          infos = 'Too many requests from your intranet. Please retry later';
          break;
      case '签名失败':
          infos = 'Failed.';
          break;
      case '签名成功':
          infos = "You've signed";
          break;
      case '签名失败，您的网络存在频繁操作或作弊行为':
          infos = 'Failed. Frequent attempts or cheating behavior from your intranet';
          break;
      case '签名失败，您的网络或设备存在作弊行为':
          infos = 'Failed. Cheating behavior detected from your intranet or device';
          break;
    }
  }
  return infos;
}

// 初始化签名按钮
function initSignBtn(){
  var issign = localStorage.getItem("is_sign") ? localStorage.getItem("is_sign") :true ;
  issign = issign === 'true' ? true :true;
  if(issign) {
    localStorage.setItem("is_sign", true);
    // $('.sign').removeAttr('onclick').text(checkTip('您已经签名了'));
  }
}

// 点击我要签名按钮
var btnswitch = true;
function clickButt1(){
  var issign = localStorage.getItem("is_sign") ? localStorage.getItem("is_sign") :false ;
  issign = (issign === 'true') ? true : true;
  if(issign) {
    message1(checkTip("您已经签名了"));
    localStorage.setItem("is_sign", false);
    // $('.sign').removeAttr('onclick').text(checkTip('您已经签名了'));
    return false;
  }
  postRequest(visitorId);
}

// for(var i = 0;i<10;i++){
//   var finger = '80017177de1cb67cf66ae6c5f1e0000'+i;
//   // setInterval(function(){
//     postRequest(finger);
//   // },300)
// }

// 签名-指纹


// 判断是否微信，显示不同成功界面
function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  var reg = new RegExp("MicroMessenger","i");
  if(reg.test(ua)){
    return true;
  }else{
    return false;
  }
}
function checkIs_wx(){
  $('.pop-content .inner').html('');
  if(language !== 'en'){
    if(is_weixn()){
      //微信
      var popcbtn = '<a class="butt iconcs" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MDk1NzQzMQ==#wechat_redirect">关注</a>';
      $('.pop-content .inner').html(popcbtn);
    }else{
      //其他浏览器
      var popewmimg = '<p>扫描二维码或搜索公众号环球时报</p><div id="ewmimg" class="iconcs" style="margin-top: 0.4rem;"></div>';
      $('.pop-content .inner').html(popewmimg);
    }
  }
}

// 成功关闭按钮
function clickButt2(){
  document.querySelector(".popup").style.display = 'none';
}

$('.seeMore').click(function(event) {
  $('.moreText').show();
  $('.showAll').hide();
});

$('#en-ch').click(function(){
  if($(this).text() === 'English'){
      language = 'en';
  }else{
      language = 'zh';
  }
  localStorage.setItem("language", language);
  renders(language);
})

var timerId0;
if(timerId0){
  clearTimeout(timerId0);
}
// timerId0 = setInterval(startMarqueue,60000);
// funcCX(400,100)

// getInfo
var flagInfo = $('#fable').html();
function getInfo(){
  $.ajax({
    url: 'https://vote.huanqiu.com/api/v1/info',
    type: 'get'
  })
  .done(function(res) {
    if(res.code == 0){
      res.data = res.data ? res.data: {total: null};
      res.num = res.data.total == null ? 0 : res.data.total;
      // $('#num').text(res.num);

      if(!res.data.cities){
        return false;
      }
      var data = res.data.cities;


      var arr = data;
      function compare(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value2 - value1;
          }
      }
      // console.log(arr.sort(compare('time')))
      data = arr.sort(compare('time'));

      //var data = res.data;
      var html = '';
      var current_stamp = Date.parse(new Date())/1000;
      for(var i=0; i<data.length;i++  ){
          var diff = parseInt(current_stamp-data[i].time);
          var timestr = '';
          if(diff<60) timestr = diff+'秒前';
          if(diff>=60 && diff<3600) timestr = Math.floor(diff/60) +'分钟前';
          if(diff>=3600 && diff<86400) timestr = Math.floor(diff/3600)+'小时前';
          if(diff>=86400 && diff<2592000) timestr = Math.floor(diff/86400)+'天前';
          if(diff>=2592000 && diff<31104000) timestr = Math.floor(diff/2592000)+'月前';
          if(diff>=31104000) timestr = Math.floor(diff/31104000)+'年前';
          html+="<h4><i class='iconcs'></i><p><span class='textspan'>来自"+data[i].city+"的网友参加了签名</span><span class='minutespan' >"+timestr+"</span></p></h4>";
      }
      $('#fable').html(flagInfo);
      $('#box').empty().append(html);
      marque(175,148,'fable','box');
      // funcCX(res.num,180);
    }
  })
  .fail(function(e) {
    console.log(e.statusText);
  })
}

// 滚动
var scrollElem;
var stopscroll;
var stoptime;
var preTop;
var leftElem;
var currentTop;
var marqueesHeight;
var timerId1;
var timerId2;
function marque(width,height,marqueName,marqueCName){
  try{
    marqueesHeight = height;
    stopscroll     = true;
    scrollElem = document.getElementById(marqueName);
    with(scrollElem)
    {
      style.width     = width;
      style.height    = marqueesHeight;
      style.overflow  = 'hidden';
      noWrap          = true;
      align           = 'left';
    }
    preTop     = 0;
    currentTop = 0;
    stoptime   = 0;
    leftElem = document.getElementById(marqueCName);
    scrollElem.appendChild(leftElem.cloneNode(true));
    if(timerId1){
      clearTimeout(timerId1);
    }
    timerId1 = setTimeout("init_srolltext();",1000);
  }catch(e) {}
}
function init_srolltext(){
  scrollElem.scrollTop = 0;
  if(timerId2){
    clearTimeout(timerId2);
  }
  timerId2 = setInterval('scrollUp()', 19);
}
function scrollUp(){
  if(stopscroll) return;
  currentTop += 1;
  if(currentTop == marqueesHeight+1){
    stoptime += 1;
    currentTop -= 1;
    if(stoptime == 1) {
      currentTop = 0;
      stoptime = 0;
    }
  }else{
    preTop = scrollElem.scrollTop;
    scrollElem.scrollTop += 2;
    if(preTop == scrollElem.scrollTop){
      scrollElem.scrollTop = marqueesHeight;
      scrollElem.scrollTop += 2;
    }
  }
}

// 每隔一分钟取一次num数据 
function startMarqueue(){
  $.ajax({
    url: 'https://vote.huanqiu.com/api/v1/num',
    type: 'get'
  })
  .done(function(res) {
    if(res.code == 0){
      old_num = parseInt($('#num').text());
      res.data = res.data ? res.data: {total: null};
      res.num = res.data.total == null ? 0 : res.data.total;
      //$('#num').text(res.num);
      d_value = parseInt(res.num) - old_num;
      if(d_value>0){
        funcCX(res.num,d_value);
      }
    }
  })
  .fail(function(e) {
    console.log(e.statusText);
  });
}

// 数字跳动
function funcCX(newnum,num){
    $('#num').each(function(){
        id=$(this).attr('id');
        newstart = parseInt(newnum)-num;
        decimals = $(this).attr('data-decimals'),
            startVal = newstart,
            endVal = newnum,
            duration = 59;
        new CountUp(id, startVal, endVal, decimals, duration, {
            useEasing: true,//效果
            separator: ''//数字分隔符
        }).start();// target：目标元素id, startVal：你想要开始的值, endVal：你想要到达的值, decimals：小数位数，默认值为0, duration：动画持续时间为秒，默认值为2, options：选项的可选对象
        isplay = true;
    });
}

// 弹框封装
function messageShow1() {
    var w = $('.message1');
    w.addClass('messageShow');
};
function messageHide1() {
    var w = $('.message1');
    w.removeClass('messageShow').removeClass('messageShowNavFix');
};
function messageOut1() {
    var w = $('.message1');
    w.css('display', 'none');
    w.html('');
};
var t1, t2, t3;
function message1(str) {
    var w = $('.message1');
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    w.html(str);
    w.css('display', 'block');
    t1 = setTimeout("messageShow1()", 80);
    t2 = setTimeout("messageHide1()", 2500);
    t3 = setTimeout("messageOut1()", 3000);
};







