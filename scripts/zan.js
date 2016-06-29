/**
 * Created by Tony on 2016/6/21.
 */
function remAdjust(defaultFontSize, defaultScreenHeight, defaultScreenWidth) {
    var htmlNode = document.getElementsByTagName('html')[0];

    function resize() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = window.screen.height;console.log(screenHeight+"+"+screenWidth);
        htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
    }
    document.addEventListener('DOMContentLoaded', function () {
        resize();
    });
    window.addEventListener('resize', resize);
}
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function base64_encode(str){
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0, len= str.length, string = '';

    while (i < len){
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len){
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len){
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
}

function encodeUTF8(str){
    var temp = "",rs = "";
    for( var i=0 , len = str.length; i < len; i++ ){
        temp = str.charCodeAt(i).toString(16);
        rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
    }
    return rs;
}
function decodeUTF8(str){
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
        return String.fromCharCode(parseInt($2,16));
    });
}

function getHostDevice(){
    var result =  {
        android: window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Linux') > -1,
        iphone: window.navigator.userAgent.indexOf('iPhone') > -1
    };
    if (result.android) return 'android';
    if (result.iphone) return 'iphone';
    return "other";
}
remAdjust(20,568,320);

var zan = {
    audio:[],
    iphone_link:'http://a.app.qq.com/o/simple.jsp?pkgname=com.cootek.walkietalkie',
    android_link:'http://a.app.qq.com/o/simple.jsp?pkgname=com.cootek.walkietalkie',
    isZan:false,
    share_image: Andes.netService+'/andesres/image/andes/andes_icon.png',
    share_title:'电话要被颠覆了，你还不知道？',
    share_desc:'邀请你成为我的BiBi好友，体验纯净高效的新沟通方式！',
    url:Andes.netService+"/andes/liker_collect.html",
    getUid:function(){
        return GetQueryString('uid');
    },
    getZanInfo:function(){
        if(WechatShare.isWeixin()&&location.href.indexOf('appid')<0){
            location.href=zan.makeWechatUrl();
            return;
        }
        $.ajax({
            type:"POST",
            data:JSON.stringify({'uid':zan.getUid()}),
            dataType:"json",
            url:"http://183.136.223.43:30007/andes/collectlike/liker_info",
            success:zan.getZanInfoCallback
        });
    },
    getZanInfoCallback:function(data){
        if(data.result_code!=2000)
            return;
        var liker_list=data.result;
        if(liker_list.length>4)
            $('.scroll-tip').removeClass('hide');
        if(liker_list.length<10)
            $('.num-tip>span').text("0"+liker_list.length);
        else
            $('.num-tip>span').text(liker_list.length);
        liker_list.reverse();
        for(index in liker_list){
            if(index<=3) {
                $('.people-list').append(
                    "<div class='people-detail'>" +
                    "<div class='detail-inside'>" +
                    "<div class='photo block fleft'><img src='" + liker_list[index].headimgurl + "'></div>" +
                    "<p class='nickname'>" + decodeUTF8(liker_list[index].nickname) + "</p>" +
                    "<p class='intro-word'>手好快啊，果然是真爱</p>" +
                    "</div>" +
                    "</div>");
            }
            else{
                $('.people-list').append(
                    "<div class='people-detail hide'>" +
                    "<div class='detail-inside'>" +
                    "<div class='photo block fleft'><img src='" + liker_list[index].headimgurl + "'></div>" +
                    "<p class='nickname'>" + decodeUTF8(liker_list[index].nickname) + "</p>" +
                    "<p class='intro-word'>手好快啊，果然是真爱</p>" +
                    "</div>" +
                    "</div>");
            }
            var user_info={
                headimgurl:"http://wx.qlogo.cn/mmopen/2YqpZlI0wpGRM0v4iae9kryC8U6FElzibvAUoI5ia1BHbZcEamrBXvB6sRnI7hcHrz7O9SS1pGegicLfChf4kq4rzoM00QOlzeGo/0",
                nickname:"我是Tony老师",
                openid:"oePrfvlIi-soJ-NifSA6uxN3koJc2"
            };
            if(liker_list[index].openid==user_info.openid){
                zan.isZan=true;
                $('.zan-btn').text('我也要玩');
                $('.zan-btn').fastClick(zan.downloadClick);
            }
        }
        if(zan.isZan){
            $('.zan-btn').text('我也要玩');
            $('.zan-btn').fastClick(zan.downloadClick);
        }
        else
            $('.zan-btn').fastClick(zan.zanClick);
        var offset=$('.arrow').position().top-window.innerHeight;
        window.onscroll = function(){
            if(document.body.scrollTop>=offset+40) {
                setTimeout(function(){
                    $(".people-detail").removeClass('hide');
                    $('.scroll-tip').hide();
                },300)
            }
        };
        $('.white-bg').hide();
        $('body').css("height","inherit");
        $('body').css("overflow","inherit");
    },
    audioPlayClick:function(){
        var id=$(this).data('id');
        var self=this;
        if($(this).find('audio').get(0).paused) {//点击后播放
            $('.audio').find('audio').get(0).pause();
            $('.audio').find('audio').get(1).pause();
            $('.audio').find('audio').get(2).pause();
            $('.audio').find('span').text('2');
            $('.audio').find('span').removeClass('audio-play');
            $('.audio').find('span').addClass('audio-stop');
            $(this).find('audio').get(0).play();
            $(this).find('span').text('3');
            $(this).find('span').removeClass('audio-stop');
            $(this).find('span').addClass('audio-play');
            $(this).find('audio').get(0).addEventListener('ended', function () {
                $(self).find('audio').get(0).pause();
                $(self).find('span').text('2');
                $(self).find('span').removeClass('audio-play');
                $(self).find('span').addClass('audio-stop');
            }, false);
        }
        else {
            $(this).find('audio').get(0).pause();
            $(this).find('span').text('2');
            $(this).find('span').removeClass('audio-play');
            $(this).find('span').addClass('audio-stop');
        }
    },
    zanClick:function(){
        var user_info={
            headimgurl:"http://wx.qlogo.cn/mmopen/2YqpZlI0wpGRM0v4iae9kryC8U6FElzibvAUoI5ia1BHbZcEamrBXvB6sRnI7hcHrz7O9SS1pGegicLfChf4kq4rzoM00QOlzeGo/0",
            nickname:"\u6211\u662f\u0054\u006f\u006e\u0079\u8001\u5e08\ud83e\udd17",
            openid:"oePrfvlIi-soJ-NifSA6uxN3koJc"
        };
        $.ajax({
            type:"POST",
            async:"false",
            data:JSON.stringify({ 'uid': zan.getUid(),
                'openid': user_info.openid,
                'nickname': encodeUTF8(user_info.nickname),
                'headimgurl': user_info.headimgurl
            }),
            dataType:"json",
            url:"http://183.136.223.43:30007/andes/collectlike/upload_liker_info",
            success:zan.zanClickCallback
        });
    },
    zanClickCallback:function(data){
        if(data.result_code!=2000)
            return;
        zan.isZan=true;
        $('.download-panel,.black-opacity').show();
        $('body').css('overflow','hidden');
        $('.zan-btn').text('我也要玩');
        $('.zan-btn').fastClick(zan.downloadClick);
    },
    closeClick:function(){
        $('.download-panel,.black-opacity').hide();
        $('body').css('overflow','initial');
    },
    downloadClick:function(){
        if(getHostDevice()=='iphone')
            window.open(zan.iphone_link);
        else
            window.open(zan.android_link);
    },
    makeWechatUrl:function(){
        var uri=zan.url+"?uid="+zan.getUid()+"&appid="+INFO.appId;
        var target="1#1#"+uri;
        target=base64_encode(target);
        redirect_url = 'http://touchlife.cootekservice.com/callback/wechat?target='+target;
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+INFO.appId+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    }
};
(function(){
    window.onload = function() {
        FastClick.attach(document.body);
        if (WechatShare.isWeixin()) {
            WechatShare.config(INFO.appId, INFO.timestamp, INFO.noncestr, INFO.signature, zan.share_title, zan.share_desc, zan.makeWechatUrl(), zan.share_image);
        }
        zan.getZanInfo();
    };
    $('.audio').fastClick(zan.audioPlayClick);
    $('.close').fastClick(zan.closeClick);
    $('.download-btn').fastClick(zan.downloadClick);zan.zanClick();
})();