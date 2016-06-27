/**
 * Created by Tony on 2016/5/27.
 */
function remAdjust(defaultFontSize, defaultScreenHeight) {
    var htmlNode = document.getElementsByTagName('html')[0];

    function resize() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        htmlNode.style.fontSize = screenHeight / defaultScreenHeight * defaultFontSize + 'px';
    }

    document.addEventListener('DOMContentLoaded', function () {
        resize();
    });
    window.addEventListener('resize', resize);
}
remAdjust(20, 568);

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var shareBefore =  {
    shareTitle: '电话要被颠覆了，你还不知道？',
    shareContent: '同时支持20人的群对讲通话！远离垃圾信息，纯净高效沟通。',
    shareUrl:  Andes.netService + '/andes/new_share.html?os=android',
    shareIOSUrl: Andes.netService + '/andes/new_share.html?os=ios',
    shareSMSAndroidUrl: '',
    shareSMSIOSUrl: '',
    shareCopyAndroidUrl: '',
    shareCopyIOSUrl: '',
    shareImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
    bgImageUrl: Andes.netService + '/andesres/image/andes/andes_icon.png',
    init: function() {
        var self = this;
        if(GetQueryString('redeem')) {
            var code = GetQueryString('redeem');
            self.shareUrl+="&"+"redeem="+code;
            self.shareIOSUrl+="&"+"redeem="+code;
        }
        else{
            var code = GetQueryString('code');
            self.shareUrl+="&"+"code="+code;
            self.shareIOSUrl+="&"+"code="+code;
        }
        $('.inviteBtn').fastClick(function() {
            if (!isIOS) {
                Andes.showShare(self.shareTitle, self.shareContent, self.shareSMSAndroidUrl, self.shareSMSAndroidUrl, self.shareCopyAndroidUrl, self.shareImageUrl, 'INVITE_SHARE', null);
            } else {
                Andes.showShareWithResult(self.shareTitle, self.shareContent, self.useShortUrl, self.contentImageUrl, self.shareIOSUrl, self.shareImageUrl, 'INVITE_SHARE', null);
            }
        });
    }
};

function init() {
    window.onload = function() {
        FastClick.attach(document.body);
    };
    var type=GetQueryString('type');
    $('.bg img').hide();
    switch(type){
        case '1':
            $('#bg1').show();
            break;
        case '2':
            $('#bg2').show();
            break;
        case '3':
            $('#bg3').show();
            break;
        case '4':
            $('#bg4').show();
            break;
        case '5':
            $('#bg5').show();
            break;
        case '6':
            $('#bg6').show();
            break;
        default:
            $('#bg1').show();
            break;
    }
    shareBefore.init();
}
init();