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
    iphone_link:'https://itunes.apple.com/app/apple-store/id1090811540?pt=618432&ct=sharepage&mt=8',
    android_link:'http://cootek-walkie-talkie.cdn.cootekservice.com/android/andes/version/andes.apk',
    isZan:false,
    getUser:function(){
        return GetQueryString('uid');
    },
    getZanInfo:function(){
        $.ajax({
            type:"POST",
            data:JSON.stringify({'uid':''}),
            async:false,
            dataType:"json",
            url:"http://andes.cootekservice.com/andes/collectlike/liker_info",
            success:zan.getZanInfoCallback
        });
    },
    getZanInfoCallback:function(data){
        if(data.result_code!=2000)
            return;
        var liker_list=data.result;
        for(index in liker_list){
            if(index<=3) {
                $('.people-list').append(
                    "<div class='people-detail'>" +
                        "<div class='detail-inside'>" +
                            "<div class='photo block fleft'><img src='" + liker_list[index].headimgurl + "'></div>" +
                            "<p class='nickname'>" + liker_list[index].nickname + "</p>" +
                            "<p class='intro-word'>手好快啊，果然是真爱</p>" +
                        "</div>" +
                    "</div>");
            }
            else{
                $('.people-list').append(
                    "<div class='people-detail hide'>" +
                        "<div class='detail-inside'>" +
                            "<div class='photo block fleft'><img src='" + liker_list[index].headimgurl + "'></div>" +
                            "<p class='nickname'>" + liker_list[index].nickname + "</p>" +
                            "<p class='intro-word'>手好快啊，果然是真爱</p>" +
                        "</div>" +
                    "</div>");
            }
            if(liker_list[index].openid==user_info.openid){
                zan.isZan=true;
                $('.zan-btn').text('我也要玩');
                $('.zan-btn').fastClick(zan.downloadClick);
            }
        }
        var offset=$('.arrow').position().top-window.innerHeight;
        window.onscroll = function(){
            if(document.body.scrollTop>=offset+20) {
                for(index in liker_list)
                    $(".people-detail").removeClass('hide');
                $('.scroll-tip').hide();
            }
        };
    },
    audioPlayClick:function(){
        var id=$(this).data('id');
        var self=this;
        if($(this).find('audio').get(0).paused) {//点击后播放
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
        if(!zan.isZan){

        }
        //$.ajax({
        //    type:"POST",
        //    data:JSON.stringify({ 'uid': zan.getUser(),
        //                            'openid': user_info.openid,
        //                            'nickname': user_info.nickname,
        //                            'headimgurl': user_info.headimgurl}),
        //    dataType:"json",
        //    url:"http://andes.cootekservice.com/pushtalk/query_code",
        //    success:zan.getZanInfoCallback
        //});
        $('.download-panel,.black-opacity').show();
        $('body').css('overflow','hidden');
    },
    zanClickCallback:function(data){
        zan.isZan=true;

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
    }
};
(function(){
    window.onload = function() {
        FastClick.attach(document.body);
        zan.getZanInfo();
    };
    //if(typeof(user_info)!="undefined")
        $('.zan-btn').fastClick(zan.zanClick);
    $('.audio').fastClick(zan.audioPlayClick);
    $('.close').fastClick(zan.closeClick);
    $('.download-btn').fastClick(zan.downloadClick);
})();