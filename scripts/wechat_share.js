var WechatShare = {
    config: function(appId, timestamp, nonceStr, signature, title, desc, link, imgUrl) {
        console.log('wechat share config');
        wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage', 'onMenuShareQQ']
        });
        wx.ready(function() {
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function() {
                    console.log('share to wechat friend success');
                },
                cancel: function() {
                    console.log('share to wechat friend cancel');
                }
            });
            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                success: function() {
                    console.log('share to wechat timeline success');
                },
                cancel: function() {
                    console.log('share to wechat friend cancel');
                }
            });
            wx.onMenuShareQQ({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function() {
                    console.log('share to wechat friend success');
                },
                cancel: function() {
                    console.log('share to wechat friend cancel');
                }
            });
        });
        wx.error(function(res) {
            console.log(res);
        });
    },
    isWeixin: function() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }
};
