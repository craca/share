/**
 * Created by Tony on 2016/5/27.
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
remAdjust(20,568,320);

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var zanBefore =  {
    shareTitle: '',
    shareContent: '',
    useShortUrl: 1,
    shareUrl:  Andes.netService + '/andes/liker_collect_before.html?os=android',
    shareIOSUrl: Andes.netService + '/andes/liker_collect_before.html?os=ios',
    shareSMSAndroidUrl: '',
    shareSMSIOSUrl: '',
    shareCopyAndroidUrl: '',
    shareCopyIOSUrl: '',
    contentImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
    shareImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
    bgImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
    init: function() {
        var self = this;
        var uid;
        if(GetQueryString('uid')) {
            uid = GetQueryString('uid');
            self.shareUrl+="&"+"uid="+uid;
            self.shareIOSUrl+="&"+"uid="+uid;
        }
        $.ajax({
            type:"POST",
            data:JSON.stringify({'uid':uid}),
            async:false,
            dataType:"json",
            url:'http://183.136.223.43:30007'+"/andes/collectlike/liker_info",
            success:function(data){
                var liker_list=data.result;
                $('.num-tip>span').text(liker_list.length);
            }
        });
        $('.inviteBtn').fastClick(function() {
            _hmt.push(['_trackEvent', 'APP内集赞分享页面', '点赞按钮', '召唤好友 解锁表情']);
            if (!isIOS) {
                Andes.showShare(self.shareTitle, self.shareContent, self.shareSMSAndroidUrl, self.shareSMSAndroidUrl, self.shareCopyAndroidUrl, self.shareImageUrl, 'ZAN_SHARE', null);
            } else {
                Andes.showShareOnlyWechat(self.shareTitle, self.shareContent, self.useShortUrl, self.contentImageUrl, self.shareIOSUrl, self.shareImageUrl, 'ZAN_SHARE', null);
            }
        });
    }
};
(function(){
    window.onload = function() {
        FastClick.attach(document.body);
        $("body").get(0).addEventListener('touchmove',function(event){event.preventDefault()});
    };
    zanBefore.init();
})();