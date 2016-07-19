/**
 * Created by Tony on 2016/7/4.
 */
function remAdjust(defaultFontSize, defaultScreenHeight, defaultScreenWidth) {
    var htmlNode = document.getElementsByTagName('html')[0];

    function resize() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = window.screen.height;console.log(screenHeight+"+"+screenWidth);
        if(screenWidth / defaultScreenWidth * defaultFontSize>28)
            htmlNode.style.fontSize=28+'px';
        else
            htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
    }
    document.addEventListener('DOMContentLoaded', function () {
        resize();
    });
    window.addEventListener('resize', resize);
}
remAdjust(20,568,320);
var assistant = {
    playUrl:'',
    bgUrl:'http://cootek-walkie-talkie.oss-cn-hangzhou.aliyuncs.com/html/music/bibihelper/start.mp3',
    timeoutArray:[],
    intervalArray:[],
    messageInterval:null,
    talkInterval:null,
    sayBorderInterval:null,
    pushedInterval:null,
    connectInterval:null,
    connectSpinTimeout:null,
    connectedInterval:null,
    recordInterval:null,
    recordingInterval:null,
    coverInterval:null,
    friendTabInterval:null,
    findTabInterval:null,
    voiceFaceTabInterval:null,
    groupTabInterval:null,
    init:function(){
        $('.que-panel>div').fastClick(this.helpClick);
        $('.back-btn').fastClick(this.backClick);
    },
    preventDefault:function(e){
        e.preventDefault();
    },
    helpClick:function(){
        var id = $(this).attr('id');
        $('body').get(0).addEventListener('touchmove',assistant.preventDefault);
        switch(id){
            case 'talk':
                //assistant.talkAnimation();
                assistant.audioPlay('#talk-audio',assistant.talkAnimation);
                break;
            case 'message':
                //assistant.messageAnimation();
                assistant.audioPlay('#message-audio',assistant.messageAnimation)
                break;
            case 'addFriend':
                //assistant.friendTabAnimation();
                assistant.audioPlay('#addFriend-audio',assistant.friendTabAnimation)
                break;
            case  'findFriend':
                //assistant.findTabAnimation();
                assistant.audioPlay('#findFriend-audio',assistant.findTabAnimation)
                break;
            case 'voiceFace':
                //assistant.voiceFaceTabAnimation();
                assistant.audioPlay('#voiceFace-audio',assistant.voiceFaceTabAnimation)
                break;
            case 'group':
                //assistant.groupTabAnimation();
                assistant.audioPlay('#group-audio',assistant.groupTabAnimation)
                break;
            case 'suggestion':
                //assistant.meTabAnimation();
                assistant.audioPlay('#suggestion-audio',assistant.meTabAnimation)
                break;
        }
    },
    backClick:function(){
        $('body').get(0).removeEventListener('touchmove',assistant.preventDefault);
        assistant.fingerPointReset();
        assistant.connectSpinReset();
        assistant.duijiangOpen();
        assistant.audioStop();
        var i=0;
        for(i in assistant.timeoutArray)
            clearTimeout(assistant.timeoutArray[i]);
        for(i in assistant.intervalArray)
            clearInterval(assistant.intervalArray[i]);
        assistant.intervalArray=[];
        assistant.timeoutArray=[];
        $('#centerBlack').css('height','30rem');//find-tab
        $('.word-img').css('top',document.body.offsetHeight+200);
        $('.back-btn').hide();
        $('.tab-panel>div .white-div,.tab-panel>div').hide();
        $('.black-tab').hide();
        $('#qunliao').hide();
        $('.record-tip').hide();
        $('.talk-panel>.push-circle,.talk-panel,.zhibo-img,.black-opacity,.tab-panel').hide();
        $('.tab-panel img.hide').hide();
    },
    talkAnimation:function(){
        $('.push-circle-tosay .microphone-word').text('点击发起对讲');
        $('.red-point').show();
        assistant.duijiangOpen();
        $('.talk-panel-title').text('BiBi豆').attr('style','');
        $('.talk-panel,.black-opacity,.push-circle-tosay').show();
        $('.back-btn').show();
        var t=0;
        assistant.talkInterval=setInterval(function(){
            if(t==2800)$('.finger-point').addClass('finger-point-toCircle');//2s move
            if(t==6000)assistant.circlePushed();
            if(t==6200)assistant.circleConnect();
            if(t==7800)assistant.circleConnected();
            if(t==11000)assistant.circleSay();
            if(t==16200){assistant.circleConnected();assistant.fingerPointToRightSpace()}
            if(t==18200)assistant.circleListen();
            if(t==23600){assistant.circleConnected();assistant.fingerPointToCover();}
            if(t==26000)$('.zhibo-img').show();
            if(t>=35000)
                assistant.backClick();
            t+=200;
        },200);
        assistant.intervalArray.push(assistant.talkInterval);
    },
    messageAnimation:function(){
        assistant.duijiangClose();
        $('.red-point').hide();
        assistant.circleRecord();
        $('.back-btn').show();
        var t=0;
        assistant.messageInterval=setInterval(function(){
            if(t==200)assistant.fingerPointToCloseTalk();
            if(t==4000)assistant.fingerPointToCircle();//2s move
            if(t==7000)assistant.circlePushed();
            if(t==7200)assistant.circleRecording();
            if(t==10000)assistant.circleRecord();
            if(t==12000)assistant.fingerPointToHistory();
            if(t==14600)$('.record-tip').show();
            if(t>=21000)
                assistant.backClick();
            t+=200;
        },200);
        assistant.intervalArray.push(assistant.messageInterval);
    },
    friendTabAnimation:function(){
        var img=new Image();
        img.src='/andesres/image/andes/assistant/问题3.1.png';
        img.onload=function(){
            img.onload=null;
            $('.friend-tab').css('background-image','url('+img.src+')');
            $('.tab-panel,.friend-tab').show();
            var t=0;
            var offset=3000;
            assistant.friendTabInterval=setInterval(function(){
                t+=500;
                if(t==4000-offset)$('.friend-tab>div.black-tab,.back-btn,#friend-tab1').show();
                if(t==5000-offset)$('#add-friend-img').css('top','24%');
                if(t==7000-offset)$('#friend-tab2').show();
                if(t==8000-offset)$('#choose-friend-img').css('top','55%');
                if(t>=24000)
                    assistant.backClick();
            },500);
            assistant.intervalArray.push(assistant.friendTabInterval);
        };
        img.onerror=function(){
            Andes.showToast('当前网络不可用，请联网后再重新打开');
        }
    },
    findTabAnimation:function(){
        var img=new Image();
        img.src='/andesres/image/andes/assistant/问题4.1.png';
        img.onload=function() {
            img.onload=null;
            $('.find-tab').css('background-image','url('+img.src+')');
            $('.tab-panel,.find-tab').show();
            var t = 0;
            var offset = 2000;
            assistant.findTabInterval = setInterval(function () {
                t += 500;
                if (t == 3000 - offset)$('.find-tab>div.black-tab,.back-btn,#find-tab1').show();
                if (t == 4000 - offset)$('#find-tab-img').css('top', '81%');
                if (t == 6000 - offset)$('#find-tab2').show();
                if (t == 7000 - offset)$('#find-friend-img').css('top', '7%');
                if (t == 8000 - offset)$('#watch-show-img').css('top', '49%');
                if (t >= 12000)
                    assistant.backClick();
            }, 500);
            assistant.intervalArray.push(assistant.findTabInterval);
        };
        img.onerror=function(){
            Andes.showToast('当前网络不可用，请联网后再重新打开');
        }
    },
    voiceFaceTabAnimation:function(){
        var img=new Image();
        img.src='/andesres/image/andes/assistant/问题5.1.png';
        img.onload=function() {
            img.onload=null;
            $('.voiceFace-tab').css('background-image','url('+img.src+')');
            $('.tab-panel,.voiceFace-tab').show();
            var t = 0;
            var offset = 3000;
            assistant.voiceFaceTabInterval = setInterval(function () {
                t += 1000;
                if (t == 4000 - offset)$('.voiceFace-tab>div.black-tab,.back-btn,#voiceFace-tab1').show();
                if (t == 5000 - offset)$('#more-face-img').css('top', '84%');
                if (t >= 14000)
                    assistant.backClick();
            }, 1000);
            assistant.intervalArray.push(assistant.voiceFaceTabInterval);
        };
        img.onerror=function(){
            Andes.showToast('当前网络不可用，请联网后再重新打开');
        }
    },
    groupTabAnimation:function(){
        var img=new Image();
        img.src='/andesres/image/andes/assistant/问题6.1.png';
        img.onload=function() {
            img.onload = null;
            $('.group-tab').css('background-image','url('+img.src+')');
            assistant.circleConnected();
            assistant.duijiangOpen();
            $('.red-point').hide();
            $('.talk-panel,.black-opacity,.center-icon>span,.back-btn').show();
            var t = 0;
            var offset = 2000;
            assistant.groupTabInterval = setInterval(function () {
                t += 500;
                if (t == 4000)assistant.fingerPointToCloseTalk();//2s move
                if (t == 7000)assistant.duijiangClose();
                if (t == 10000)assistant.fingerPointReset();//2s move
                if (t == 13000) {
                    $('.talk-panel,.black-opacity,.back-btn').hide();
                    $('.tab-panel,.group-tab').show();
                }
                if (t == 16000 - offset)$('.group-tab>div.black-tab,.group-tab .white-div,.back-btn').show();
                if (t == 16500 - offset)$('#delete-group-img').css('top', '64%');
                if (t >= 19000)
                    assistant.backClick();
            }, 500);
            assistant.intervalArray.push(assistant.groupTabInterval);
        }
        img.onerror=function(){
            Andes.showToast('当前网络不可用，请联网后再重新打开');
        }
    },
    meTabAnimation:function(){
        var img=new Image();
        img.src='/andesres/image/andes/assistant/问题7.1.png';
        img.onload=function() {
            img.onload = null;
            $('.me-tab').css('background-image','url('+img.src+')');
            $('.tab-panel,.me-tab').show();
            var t = 0;
            assistant.groupTabInterval = setInterval(function () {
                t += 1000;
                if (t == 3000 - 2000)$('.me-tab>div.black-tab,.white-div,.back-btn').show();
                if (t == 4000 - 2000)$('#suggestion-img').css('top', '59%');
                if (t == 19000)
                    assistant.backClick();
            }, 1000);
            assistant.intervalArray.push(assistant.groupTabInterval);
        }
        img.onerror=function(){
            Andes.showToast('当前网络不可用，请联网后再重新打开');
        }
    },
    duijiangOpen:function(){
       // $('.duijiang').removeClass('duijiang-close').addClass('duijiang-open');
        $('#red').hide();
        $('#green').show();
        $('.duijiang-word').text('对讲(开)');
    },
    duijiangClose:function(){
        $('#green').hide();
        $('#red').show();
        $('.duijiang-word').text('对讲(关)');
    },
    fingerPointReset:function(){
        $('.finger-point').attr('class','finger-point circle-radius');
    },
    circlePushed:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.talk-panel-title').text('BiBi豆').attr('style','');
        $('.push-circle-pushed').show();
    },
    circleConnect:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.push-circle-connect-notspin').show();
        $('.push-circle-connect').show();
        $('.talk-panel-title').text('正在呼叫').css('color','#ff8f8a');
        assistant.connectSpinTimeout=setTimeout(function(){$('.push-circle-connect').addClass('connect-spin')},50);
        assistant.timeoutArray.push(assistant.connectSpinTimeout);
    },
    connectSpinReset:function(){
        $('.push-circle-connect').removeClass('connect-spin');
    },
    circleConnected:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.push-circle-tosay>.microphone-word').text('按住说话');
        $('.talk-panel-title').text('BiBi豆').attr('style','');
        $('.push-circle-tosay').show();
    },
    circleSay:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.talk-panel-title').text('我正在说').css('color','#7fd43e');
        $('.push-circle-say').show();
        var haveBorder=false;
        assistant.sayBorderInterval=setInterval(function(){
            if(haveBorder){
                $('.push-circle-say-border').removeClass('say-border-bigger');
                $('.push-circle-say-border').addClass('say-border-origin');
            }
            else{
                $('.push-circle-say-border').removeClass('say-border-origin');
                $('.push-circle-say-border').addClass('say-border-bigger');
            }
            haveBorder=!haveBorder;
        },450);
        assistant.intervalArray.push(assistant.sayBorderInterval);
    },
    circleListen:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.talk-panel-title').text('对方正在说').css('color','#7fd43e');
        $('.push-circle-listen-border').show();
        var haveBorder=false;
    },
    circleRecord:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.talk-panel-title').text('BiBi豆').css('color','black');
        $('.talk-panel,.black-opacity,.push-circle-record').show();
    },
    circleRecording:function(){
        $('.talk-panel>.push-circle,.push-circle-connect-notspin').hide();
        $('.push-circle-tosay>.microphone-word').text('按住说话');
        $('.talk-panel-title').text('正在录音，松手发送').css('color','#ff8f8a');
        $('.push-circle-recording').show();
    },
    fingerPointToCircle:function(){
        assistant.fingerPointReset();
        $('.finger-point').addClass('finger-point-toCircle');
    },
    fingerPointToCover:function(){
        assistant.fingerPointReset();
        $('.finger-point').addClass('finger-point-toCover');
    },
    fingerPointToCloseTalk:function(){
        assistant.fingerPointReset();
        $('.finger-point').addClass('finger-point-toClose');
    },
    fingerPointToRightSpace:function(){
        assistant.fingerPointReset();
        $('.finger-point').addClass('finger-point-toRightSpace');
    },
    fingerPointToHistory:function(){
        assistant.fingerPointReset();
        $('.finger-point').addClass('finger-point-toHistory');
    },
    audioPlay:function(id,callback){
        assistant.audioStop();
        var src=$(id).data('src');
        assistant.playUrl=src
        if(Andes.handler) {
            Andes.startPlayUrl(src);
            callback();
        }
        else{
            $(id).attr('src',src);
            $(id).get(0).onloadedmetadata=function(){
                $(id).get(0).play();
                callback();
            }
        }
    },
    audioStop:function(){
        if(Andes.handler)
            Andes.stopPlayUrl(assistant.playUrl);
        $('audio').attr('src','');
    }
};
(function(){
    window.onload = function(){
        FastClick.attach(document.body);
        $('.word-img').css('top',document.body.offsetHeight+200);
    };
    window.onblur=function(){
        assistant.backClick();
    };
    assistant.audioPlay('#bg-audio',function(){});
    $('.back-icon').fastClick(function(){
        Andes.finish();
    });
    assistant.init();
})();