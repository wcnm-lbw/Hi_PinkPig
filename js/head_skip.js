// 中英文案
var languageText = {
  en: {
    headTile: "Let's sign to call on the PinkPig to open the keepInventory! ",
    title: 'The Fallen Moom people invite you to sign  the joint letter',
    tit1: '【Joint letter by The Fallen Moon Minecraft Server netizens to the PinkPig openning the keepInventory】',
    tit1More: 'See the content',

    tit2: "【Let's sign to call on the PinkPig to open the keepInventory】",
    tit2More: 'See the content',
    content2: "In early 2021, Pink Pig's The Fallen Moon (TFM) Minecraft server mysteriously shut down due to academic issues. In July, the server mysteriously opened, the server not only more the EliteMobs plug-in, and install a InventoryKeeper plug-in .Pink Pig delusional to use the cemetery plug-in to keepInventory, but this cemetery plug-in is full of bugs .causing TFM people's strong dissatisfaction.",
    // 需要html
    content2More: "<p> It is doubtful that the PinkPig is so secretive. A group of TFM people sent an open letter to PinkPig in August, calling for openning the keepInventory. These comrades said that only when the PinkPig realized the popular will and thoroughly investigated and realized her mistake, could she start to die and be responsible for the life and safety of all the people. </p><p>But the US media has dodged the call and distorted the Chinese netizens' suspicion as a &quot;conspiracy theory,&quot; and at the same time, used untenable and flawed rumors to attack the Wuhan Institute of Virology, which had been investigated by Western experts and Western media.</p><p>Therefore, these Chinese netizens have entrusted the Global Times to launch an online public opinion campaign, hoping that more Chinese internet users will join in calling on the WHO to let more virologists, lab security experts and biological weapons experts from China and other countries to investigate the US Fort Detrick lab.</p><p>Together to the PinkPig organization issued an appeal, so that the PinkPig completely open all wear death do not fall. </p>",
    signNum: '<b id="num">114514</b></br>people have signed',
    signText1: 'I sign',
    signSuccess: "You've signed",
    signText2: 'You have signed',
    btnText: '中文'
  },
  zh: {
    headTile: '【来联署吧！一起呼吁粉猪开启死亡不掉落！】',
    title: '月落乌啼人民邀你来签名',
    tit1: '【月落乌啼服务器人民要求粉猪开启死亡不掉落联署公开信】',
    tit1More: '查看详情',
    tit2: '【来联署吧！一起呼吁粉猪开启死亡不掉落！】',
    tit2More: '展开全部',
    content2: '2021年年初，月落乌啼服务器（简称TFM）因为粉猪的学业问题神秘关闭。7月，服务器又神秘地开启，服务器不仅多了阴间的精英怪插件，还启用了一款墓地插件。粉猪妄想使用墓地插件来替代死亡不掉落，可这墓地插件Bug百出，引起了TFM人民的强烈不满。',
    // 需要html
    content2More: '<p>粉猪如此遮遮掩掩很值得怀疑。一批TFM人民于今年8月向粉猪发出一封公开信，呼吁粉猪开启死亡不掉落。这些同志表示，只有粉猪意识到民心所向，去彻查认识到自己的错误，才能让她开启死亡不掉落，也才是对全服人民的生命安全负责。</p><p>可粉猪一直在回避此事，还将TFM人民的建议说成是“阴谋论”，群内同志多次@Hi_PinkPig，但粉猪多次以东京奥运会回避话题</p><p>因此，那批同志决定委托TFM共产党在网上发起民意征集活动，希望更多中国网民加入进来，一起向粉猪组织发出呼吁，让粉猪彻底打开全服死亡不掉落。</p><p>快来一起签名吧！</p>',
    signNum: '已有<b id="num">114514 </b>人签名',
    signText1: '我要签名',
    signSuccess: "签名成功",
    signText2: '您已经签名了',
    btnText: 'English'
  }
};
// 判断浏览器语言
var language;
if(navigator.appName == 'Netscape'){
  language = navigator.language;
}else{
  language = navigator.browserLanguage;
}
initTile();
// 重置head-title
function initTile(){
  // 本地存不是中文
  if(localStorage.getItem("language") === 'zh'){
    language = 'zh';
    document.title = languageText.zh.headTile;
    return false;
  }else if(localStorage.getItem("language") === 'en'){
    language = 'en';
    document.title = languageText.en.headTile;
    return false;
  }
  if(language.indexOf('zh') > -1){
    language = 'zh';
    document.title = languageText.zh.headTile;
  }else{
    language = 'en';
    document.title = languageText.en.headTile;
  }
}

check();
function check(){
    localStorage.setItem("check_isStorage", 'true');
    // 判断是否能读到localstorage-读不到
    if(!localStorage.getItem("check_isStorage")){
      if(language === 'zh'){
        alert('请使用主流App访问');
      }else{
        alert('Please use mainstream app to access');
      }
      return false;
    }
    
}

function getURL(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
