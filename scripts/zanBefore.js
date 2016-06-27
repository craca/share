///**
// * Created by Tony on 2016/5/27.
// */
//function remAdjust(defaultFontSize, defaultScreenHeight) {
//    var htmlNode = document.getElementsByTagName('html')[0];
//
//    function resize() {
//        var screenWidth = document.body.offsetWidth;
//        var screenHeight = document.body.offsetHeight;
//        htmlNode.style.fontSize = screenHeight / defaultScreenHeight * defaultFontSize + 'px';
//    }
//
//    document.addEventListener('DOMContentLoaded', function () {
//        resize();
//    });
//    window.addEventListener('resize', resize);
//}
//remAdjust(20, 568);
//
//function GetQueryString(name)
//{
//    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//    var r = window.location.search.substr(1).match(reg);
//    if(r!=null)return  unescape(r[2]); return null;
//}
//var zanBefore =  {
//    shareTitle: '',
//    shareContent: '',
//    useShortUrl: 1,
//    shareUrl:  Andes.netService + '/andes/liker_collect_before.html?os=android',
//    shareIOSUrl: Andes.netService + '/andes/liker_collect_before.html?os=ios',
//    shareSMSAndroidUrl: '',
//    shareSMSIOSUrl: '',
//    shareCopyAndroidUrl: '',
//    shareCopyIOSUrl: '',
//    contentImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
//    shareImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
//    bgImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
//    init: function() {
//        var self = this;
//        if(GetQueryString('uid')) {
//            var code = GetQueryString('uid');
//            self.shareUrl+="&"+"uid="+code;
//            self.shareIOSUrl+="&"+"uid="+code;
//        }
//        $('.inviteBtn').fastClick(function() {
//            if (!isIOS) {
//                Andes.showShare(self.shareTitle, self.shareContent, self.shareSMSAndroidUrl, self.shareSMSAndroidUrl, self.shareCopyAndroidUrl, self.shareImageUrl, 'ZAN_SHARE', null);
//            } else {
//                Andes.showShareWithResult(self.shareTitle, self.shareContent, self.useShortUrl, self.contentImageUrl, self.shareIOSUrl, self.shareImageUrl, 'ZAN_SHARE', null);
//            }
//        });
//    }
//};
//
//function init() {
//    window.onload = function() {
//        FastClick.attach(document.body);
//    };
//    zanBefore.init();
//}