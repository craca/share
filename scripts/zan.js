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
    isAutoPlay:true,
    timeout:null,
    length:0,
    share_image: Andes.netService+'/andesres/image/andes/andes_icon.png',
    share_title:'我想玩这个，快来帮我一下！',
    share_desc:'BiBi的语音表情超好玩，快帮我解锁，来和我一起玩儿！',
    people_words:["手够快吧，果然是真爱！","我这么善良，你知道吗？","快送我一朵小红花！","点赞功德无量！","送人一赞，手留余香","听说好人都来玩BiBi了","语音表情现在很火啊，你还不知道？"],
    word_num:7,
    url:'http://docker-ws2.cootekservice.com'+"/andes/liker_collect.html",
    getUid:function(){
        return GetQueryString('uid');
    },
    getZanInfo:function(){
        $.ajax({
            type:"POST",
            data:JSON.stringify({'uid':zan.getUid()}),
            async:false,
            dataType:"json",
            url:"http://183.136.223.43:30007/andes/collectlike/liker_info",
            success:zan.getZanInfoCallback
        });
    },
    getZanInfoCallback:function(data){
        if(data.result_code!=2000)
            return;
        var liker_list=data.result;
        zan.length=liker_list.length;
        if(liker_list.length>4) {
            $('.scroll-tip').removeClass('hide');
            $('.people-list').addClass('people-list-scroll');
        }
        //    window.onscroll = function(){
        //        var offset=$('.arrow').position().top-window.innerHeight;
        //        if(document.body.scrollTop>=offset+40) {
        //            setTimeout(function(){
        //                $(".people-detail").removeClass('hide');
        //                $('.scroll-tip').hide();
        //            },300)
        //        }
        //    };
        //}
        $('.num-tip>span').text(liker_list.length);
        liker_list.reverse();
        for(index in liker_list){
            $('.people-list').append(
                "<div class='people-detail'>" +
                "<div class='detail-inside'>" +
                "<div class='photo block fleft'><img src='" + liker_list[index].headimgurl + "'></div>" +
                "<p class='nickname'>" + decodeUTF8(liker_list[index].nickname) + "</p>" +
                "<p class='intro-word'>"+zan.people_words[Math.floor(Math.random()*zan.word_num)]+"</p>" +
                "</div>" +
                "</div>");
            if(liker_list[index].openid==user_info.openid){
                zan.isZan=true;
                $('.zan-btn').text('我也要玩');
                $('.zan-btn').fastClick(zan.downloadClick);
            }
        }
        if(!zan.isZan) {
            $('.zan-btn').text('赞一下');
            $('.zan-btn').fastClick(zan.zanClick);
        }
        $('.white-bg').hide();
        $('body').css("height","inherit");
        $('body').css("overflow","inherit");
    },
    audioPlayClick:function(){
        clearTimeout(zan.timeout);
        $('body').unbind('touchstart');
        var id=$(this).data('id');
        var self=this;
        zan.isAutoPlay=false;
        if($(this).find('audio').get(0).paused) //点击后播放
            zan.audioPlay(id);
        else
            zan.audioStop();
    },
    audioPlay:function(id){
        zan.audioStop();
        $('audio').eq(id).get(0).play();
        if($('audio').eq(id).get(0).paused)
            return;
        $('.audio').find('span').text('2');
        $('.audio').find('span').removeClass('audio-play');
        $('.audio').find('span').addClass('audio-stop');
        $('.audio').find('span').eq(id).text('3');
        $('.audio').find('span').eq(id).removeClass('audio-stop');
        $('.audio').find('span').eq(id).addClass('audio-play');
    },
    audioStop:function(){
        $('audio').get(0).pause();
        $('audio').get(1).pause();
        $('audio').get(2).pause();
        $('.audio').find('span').text('2');
        $('.audio').find('span').removeClass('audio-play');
        $('.audio').find('span').addClass('audio-stop');
    },
    audioAutoPlayLoop:function(){
        $('audio>source').eq(0).attr('src',$('audio>source').eq(0).data('url'));
        zan.audioPlay(0);
        var id=0;alert()
        $('audio').bind('ended', function () {
            zan.audioStop(id);
            if(zan.isAutoPlay){
                if(id>1)
                    id=-1;
                zan.audioPlay(++id);
            }
        });
    },
    zanClick:function(){
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
        //_hmt.push(['_trackEvent', '集赞分享页面', '点赞按钮',  '赞一下']);
        zan.isZan=true;
        $('.num-tip').text(zan.length+1);
        $('.people-list').prepend("<div class='people-detail'>" +
            "<div class='detail-inside'>" +
            "<div class='photo block fleft'><img src='" + user_info.headimgurl + "'></div>" +
            "<p class='nickname'>" + decodeUTF8(user_info.nickname) + "</p>" +
            "<p class='intro-word'>"+zan.people_words[Math.floor(Math.random()*zan.word_num)]+"</p>" +
            "</div>" +
            "</div>");
        if($('.people-list').find('hide').size()>0)
            $('.people-list').find('.people-detail').eq(4).addClass('hide');
        $('.download-panel,.black-opacity').show();
        $('body').css('overflow','hidden');
        $('.zan-btn').text('我也要玩');
        $('.zan-btn').attr('id','zan-download');
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
        //if($(this).attr('id')=='center-download')
        //    _hmt.push(['_trackEvent', '集赞分享页面', '下载按钮', '弹出框下载']);
        //if($(this).attr('id')=='top-download')
        //    _hmt.push(['_trackEvent', '集赞分享页面', '下载按钮', '顶部栏下载']);
        //if($(this).attr('id')=='zan-download')
        //    _hmt.push(['_trackEvent', '集赞分享页面', '下载按钮', '我也要玩']);
    },
    makeWechatUrl:function(){
        //var uri=zan.url+"?uid="+zan.getUid()+"&appid="+INFO.appId;
       // var target="1#1#"+uri;
        //target=base64_encode(target);
        //redirect_url = 'http://touchlife.cootekservice.com/callback/wechat?target='+target;
        //return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+INFO.appId+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    }
};
(function(){
    if(WechatShare.isWeixin()&&location.href.indexOf('appid')<0){
        location.href=zan.makeWechatUrl();
        return;
    }
    window.onload = function() {
        FastClick.attach(document.body);
        if (WechatShare.isWeixin()) {
            WechatShare.config(INFO.appId, INFO.timestamp, INFO.noncestr, INFO.signature, zan.share_title, zan.share_desc, zan.makeWechatUrl(), zan.share_image);
        }
        zan.audioAutoPlayLoop();
        if($('audio').get(0).paused){
            $('body').bind('touchstart',function(){
                zan.timeout=setTimeout(zan.audioAutoPlayLoop,200);
                $('body').unbind('touchstart');
            })
        }
        zan.getZanInfo();
    };
    $('.audio').fastClick(zan.audioPlayClick);
    $('.close').fastClick(zan.closeClick);
    $('.download-btn').fastClick(zan.downloadClick);
})();