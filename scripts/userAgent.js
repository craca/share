/**
 * Created by Tony on 2016/5/24.
 */
//探测终端类型
var userAgent={
    ua:window.navigator.userAgent,
    isSetup:false,
    timeout:300,
    getHostApp:function () {
        var result =  {
            weixin: userAgent.ua.match(/MicroMessenger/i) || window.WeixinJSBridge != undefined,
            qq: userAgent.ua.indexOf(' QQ') > -1,
            weibo: userAgent.ua.indexOf('weibo') > -1,
        };
        if (result.weixin) return 'weixin';
        if (result.qq) return 'qq';
        if (result.weibo) return 'weibo';
        return "other";
    },
    getHostDevice:function(){
        result =  {
            android: userAgent.ua.indexOf('Android') > -1 || userAgent.ua.indexOf('Linux') > -1,
            iphone: userAgent.ua.indexOf('iPhone') > -1
        };
        if (result.android) return 'android';
        if (result.iphone) return 'iphone';
        return "other";
    },
    isIOS9:function(){
        return userAgent.ua.indexOf('iPhone OS 9') > -1;
    },
    activeDialer:function(code,hostDevice,showDownloadPanel,url) {
        var scheme;
        if(hostDevice=='iphone')
            scheme= "bibi://openbibi?code="+code; //如果要指定内部路径，可以使用touchpal://opendialer/path
        else
            scheme= "bibi://openbibi?code="+code;
        var startTime = Date.now();
        if (userAgent.isIOS9()) {
            showDownloadPanel(url);
        }
        else {
            console.log("iframe");
            var ifr = document.createElement('iframe');
            ifr.src = scheme;
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            location.href=scheme;
            var t = setTimeout(function() {
                var endTime = Date.now();
                if (!startTime || endTime - startTime < userAgent.timeout + 200) {
                    setTimeout(function () {
                        showDownloadPanel(url);
                    },200);

                }
            }, userAgent.timeout);
            window.onblur=function(){
                clearTimeout(t);
                window.location.reload();
            }
        }

    },
    init:function(showBrowserTip,showDownloadPanel,code) {
        var hostApp = userAgent.getHostApp();
        var hostDevice = userAgent.getHostDevice();
        //window.hostCode = getHostCode();

        if (hostApp !='other') {
            //若寄主应用为微信、微博、qq空间浏览器
            showBrowserTip();
        }
        else {
            //若寄主应用为其他，默认适配手机端浏览器
            //showDownloadPanel();
            if (hostDevice == "other") {
                //打开手机端官网
                console.log("other");
            } else {
                url = 'http://cootek-walkie-talkie.cdn.cootekservice.com/android/andes/version/andes.apk'; //默认为 Android 端
                if (hostDevice == "iphone") {
                    url = 'https://itunes.apple.com/app/apple-store/id1090811540?pt=618432&ct=sharepage&mt=8';
                }
                userAgent.activeDialer(code,hostDevice,showDownloadPanel,url);
            }
        }
    }
};

