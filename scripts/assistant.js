/**
 * Created by Tony on 2016/7/4.
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
var assistant = {
    a:'aaa',
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
    helpClick:function(){
        var id = $(this).attr('id');
        $('.back-btn').show();
        switch(id){
            case 'talk':
                assistant.talkAnimation();
                break;
            case 'message':
                assistant.messageAnimation();
                break;
            case 'addFriend':
                assistant.friendTabAnimation();
                break;
            case  'findFriend':
                assistant.findTabAnimation();
                break;
            case 'voiceFace':
                assistant.voiceFaceTabAnimation();
                break;
            case 'group':
                assistant.groupTabAnimation();
                break;
            case 'suggestion':
                assistant.meTabAnimation();
                break;
        }
    },
    backClick:function(){
        assistant.fingerPointReset();
        assistant.connectSpinReset();
        assistant.duijiangOpen();
        var i=0;
        for(i in assistant.timeoutArray)
            clearTimeout(assistant.timeoutArray[i]);
        for(i in assistant.intervalArray)
            clearInterval(assistant.intervalArray[i]);
        $('#centerBlack').css('height','30rem');//find-tab
        $('.tab-panel>div>img').css('top',document.body.offsetHeight+120);
        $('.back-btn').hide();
        $('.tab-panel>div .white-div,.tab-panel>div').hide();
        $('.black-tab').hide();
        $('#qunliao').hide();
        $('.record-tip').hide();
        $('.push-circle,.talk-panel,.black-opacity,.tab-panel').hide();
    },
    talkAnimation:function(){
        $('.push-circle-tosay .microphone-word').text('点击发起对讲');
        $('.red-point').show();
        assistant.duijiangOpen();
        $('.talk-panel-title').text('BiBi小助手').attr('style','');
        $('.talk-panel,.black-opacity,.push-circle-tosay').show();
        $('.finger-point').addClass('finger-point-toCircle');//2s move
        var t=0;
        assistant.talkInterval=setInterval(function(){
            if(t==2200)assistant.circlePushed();
            if(t==2400)assistant.circleConnect();
            if(t==4600)assistant.circleConnected();
            if(t==5000)assistant.circleSay();
            if(t==7000)assistant.circleConnected();
            if(t==9000)assistant.fingerPointToCover();
            t+=200;
        },200);
        assistant.intervalArray.push(assistant.talkInterval);
    },
    messageAnimation:function(){
        assistant.duijiangClose();
        $('.red-point').hide();
        assistant.circleRecord();
        var t=0;
        assistant.messageInterval=setInterval(function(){
            if(t==0)$('.finger-point').addClass('finger-point-toCircle');//2s move
            if(t==2200)assistant.circlePushed();
            if(t==2400)assistant.circleRecording();
            if(t==4000)assistant.circleRecord();
            if(t==4200)$('.record-tip').show();
            t+=200;
        },200);
        assistant.intervalArray.push(assistant.messageInterval);
    },
    friendTabAnimation:function(){
        $('.tab-panel,.friend-tab').show();
        var t=0;
        assistant.friendTabInterval=setInterval(function(){
            t+=500;
            if(t==500)$('.friend-tab>div.black-tab').show();
            if(t==1500)$('#add-friend-div').show();
            if(t==2000)$('#add-friend-img').css('top','5.7rem');
            if(t==3000)$('#choose-friend-div').show();
            if(t==3500)$('#choose-friend-img').css('top','14.4rem');
        },500);
        assistant.intervalArray.push(assistant.friendTabInterval);
    },
    findTabAnimation:function(){
        $('.tab-panel,.find-tab').show();
        var t=0;
        assistant.findTabInterval=setInterval(function(){
            t+=500;
            if(t==500)$('.find-tab>div.black-tab').show();
            if(t==1500)$('#centerBlack').css('height','21.8rem');
            if(t==2000)$('#find-tab-img').css('top','22.2rem');
            if(t==3000){$('#find-div').show();$('#centerBlack').css('height','11.8rem');}
            if(t==3500)$('#find-friend-img').css('top','1.3rem');
            if(t==4500)$('#watch-show-img').css('top','13rem');
        },500);
        assistant.intervalArray.push(assistant.findTabInterval);
    },
    voiceFaceTabAnimation:function(){
        $('.tab-panel,.voiceFace-tab').show();
        var t=0;
        assistant.voiceFaceTabInterval=setInterval(function(){
            t+=500;
            if(t==500)$('.voiceFace-tab>div.black-tab').show();
            if(t==1000)$('#voiceFaceTopBlack').css('height','25.2rem');
            if(t==1500)$('#more-face-img').css('top','22.5rem');
        },500);
        assistant.intervalArray.push(assistant.voiceFaceTabInterval);
    },
    groupTabAnimation:function(){
        assistant.circleConnected();
        assistant.duijiangOpen();
        $('.red-point').hide();
        $('.talk-panel,.black-opacity,.center-icon>span').show();
        var t=0;
        assistant.groupTabInterval=setInterval(function(){
            t+=500;
            if(t==500)assistant.fingerPointToCloseTalk();//2s move
            if(t==2500)assistant.duijiangClose();
            if(t==3000)assistant.fingerPointReset();//2s move
            if(t==5500){$('.talk-panel,.black-opacity').hide();$('.tab-panel,.group-tab').show();}
            if(t==6000)$('.group-tab>div.black-tab').show();
            if(t==6500)$('.white-div').show();
            if(t==7000)$('#delete-group-img').css('top','17.6rem');
        },500);
        assistant.intervalArray.push(assistant.groupTabInterval);
    },
    meTabAnimation:function(){
        $('.tab-panel,.me-tab').show();
        var t=0;
        assistant.groupTabInterval=setInterval(function(){
            t+=500;
            if(t==500)$('.me-tab>div.black-tab').show();
            if(t==1000)$('.white-div').show();
            if(t==1500)$('#suggestion-img').css('top','17rem');
        },500);
        assistant.intervalArray.push(assistant.groupTabInterval);
    },
    duijiangOpen:function(){
        $('.duijiang').removeClass('duijiang-close').addClass('duijiang-open');
        $('.duijiang-word').text('对讲(开)');
    },
    duijiangClose:function(){
        $('.duijiang').removeClass('duijiang-open').addClass('duijiang-close');
        $('.duijiang-word').text('对讲(关)');
    },
    fingerPointReset:function(){
        $('.finger-point').attr('class','finger-point circle-radius');
    },
    circlePushed:function(){
        $('.push-circle').hide();
        $('.talk-panel-title').text('BiBi小助手').attr('style','');
        $('.push-circle-pushed').show();
    },
    circleConnect:function(){
        $('.push-circle').hide();
        $('.push-circle-connect').show();
        $('.talk-panel-title').text('正在呼叫').css('color','#ff8f8a');
        assistant.connectSpinTimeout=setTimeout(function(){$('.push-circle-connect-border-top,.push-circle-connect-border-bottom').addClass('connect-spin')},50);
        assistant.timeoutArray.push(assistant.connectSpinTimeout);
    },
    connectSpinReset:function(){
        $('.push-circle-connect-border-top,.push-circle-connect-border-bottom').removeClass('connect-spin');
    },
    circleConnected:function(){
            $('.push-circle').hide();
            $('.push-circle-tosay>.microphone-word').text('按住说话');
            $('.talk-panel-title').text('BiBi小助手').attr('style','');
            $('.push-circle-tosay').show();
    },
    circleSay:function(){
            $('.push-circle').hide();
            $('.talk-panel-title').text('我正在说').css('color','#7fd43e');
            $('.push-circle-say').show();
            var haveBorder=false;
            assistant.sayBorderInterval=setInterval(function(){
                if(haveBorder)
                    $('.push-circle-say-border').css('transform','translateY(0px)').css('border','0px solid #ddd;');
                else
                    $('.push-circle-say-border').css('border', '8px solid #ddd;').css('transform', 'translateY(-8px)');
                haveBorder=!haveBorder;
            },450);
        assistant.intervalArray.push(assistant.sayBorderInterval);
    },
    circleRecord:function(){
            $('.push-circle').hide();
            $('.talk-panel-title').text('BiBi小助手').css('color','black');
            $('.talk-panel,.black-opacity,.push-circle-record').show();
    },
    circleRecording:function(){
        $('.push-circle').hide();
        $('.push-circle-tosay>.microphone-word').text('按住说话');
        $('.talk-panel-title').text('正在录音，松手发送').css('color','#ff8f8a');
        $('.push-circle-recording').show();
    },
    fingerPointToCover:function(){
        $('.finger-point').addClass('finger-point-toCover');
    },
    fingerPointToCloseTalk:function(){
        $('.finger-point').addClass('finger-point-toClose');
    }
};
(function(){
    window.onload = function(){
        FastClick.attach(document.body);
        $('.tab-panel>div>img').css('top',document.body.offsetHeight+120);
    };
    assistant.init();
})();