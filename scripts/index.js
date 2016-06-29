/**
 * Created by Tony on 2016/5/16.
 */
function remAdjust(defaultFontSize, defaultScreenHeight, defaultScreenWidth) {
    var htmlNode = document.getElementsByTagName('html')[0];

    function resize() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        if(screenWidth/screenHeight<0.6)
            htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
        else
            htmlNode.style.fontSize = screenHeight / defaultScreenHeight * defaultFontSize*1.1 + 'px';
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
remAdjust(20, 568,320);

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

var share={
    inviteCode:null,
    isIOS9:userAgent.isIOS9(),
    scheme:'bibi://openbibi',
    inviteInfo:{},
    groupInfo:{},
    chatRecord:{},
    downloadLink:"",
    url:Andes.netService+'/andes/oauth_share.html',
    test_num_f:2,//好友分享文案数量
    test_num_g:2,//群分享文案数量
    share_title_f: ['电话要被颠覆了，你还不知道？'],
    share_desc_f: ['邀请你成为我的BiBi好友，体验纯净高效的新沟通方式！'],
    share_title_g: ['邀请你加入BiBi群'],
    share_desc_g: ['我正在这儿和大家BiBi，同时支持20人的群对讲通话，想嗨你就来！'],
    share_image: Andes.netService+'/andesres/image/andes/andes_icon.png',
    inviteFriendClick:function(){
        //if(this.id=='inviteFriendBtn')
        //    _hmt.push(['_trackEvent', '邀请页面', '接收邀请', '同意加为好友']);
        //else
        //    _hmt.push(['_trackEvent', '邀请页面', '接收邀请', '同意入群']);
        userAgent.init(share.showBrowserTip,share.showDownloadPanel,share.getInviteCode(),share.hideDownloadPanel);
    },
    showBrowserTip:function(){
        $('#browser-tip,#black-opacity').show();
    },
    showDownloadPanel:function(url){
        share.downloadLink=url;
        $('#invite-panel,#black-opacity,#invite-under-panel').show();
        $('#black-opacity').fastClick(function(){
            $('#invite-panel,#black-opacity,#invite-under-panel').hide();
            $('.top-tip').css('border-radius','0');
            $('.top-tip').css('-webkit-border-radius','0');
            $('.top-tip').css('-moz-border-radius','0');
            $('.top-tip').css('text-align','left');
            $('.top-tip>h2').css('left','1rem');
            $('.top-tip>p').css('left','1rem');
            $('.download-btn-sm').show();
        });
    },
    getInviteCode:function(){
        if(GetQueryString("redeem"))
            share.inviteCode=GetQueryString("redeem");
        else
            share.inviteCode=GetQueryString("code");
        return share.inviteCode;
    },
    getInviteInfo:function(code){
        $.ajax({
            type:"POST",
            data:JSON.stringify({'invite_code':code}),
            dataType:"json",
            url:"http://andes.cootekservice.com/pushtalk/query_code",
            success:share.getInviteInfoCallback
        });
    },
    getInviteInfoCallback:function(data){
        share.inviteInfo= data;
        console.log(share.inviteInfo);
        var info =share.inviteInfo;
        if(info.result_code!=2000) {
            $('#inviteFriendBtn').hide();
            $('#codeInvalid').show();
            $('.photo-panel').css('top','6rem');
            $('.top-tip').css('border-radius','0');
            $('.top-tip').css('-webkit-border-radius','0');
            $('.top-tip').css('-moz-border-radius','0');
            $('.top-tip').css('text-align','left');
            $('.top-tip>h2').css('left','1rem');
            $('.top-tip>p').css('left','1rem');
            $('.download-btn-sm').show();
            $('.bg-white').hide();
            return;
        }
        if(info.result.user.head_image_url) {
            if(info.result.user.head_image_url.indexOf('local://')>-1)
                $('.head-photo>img').attr('src', '/andesres/image/andes/'+info.result.user.head_image_url.substr(8)+'.png');
            else
                $('.head-photo>img').attr('src', info.result.user.head_image_url);
        }
        if(info.result.type=='user') {
            $('#inviteFriendBtn').show();
            $('.invite-word').text('邀请你成为TA的好友');
            if(info.result.user.name.indexOf('****')<0&&info.result.user.name)
                $('.nickname').text(info.result.user.name);
            else {
                $('.nickname').text('[我]');
                $('.invite-word').text('邀请你成为我的好友');
            }
            var current_num_f=parseInt(Math.random()*share.test_num_f);//当前好友分享文案编号
            var current_num_g=parseInt(Math.random()*share.test_num_g);//当前群分享文案编号
            if (WechatShare.isWeixin())
                WechatShare.config(INFO.appId, INFO.timestamp, INFO.noncestr, INFO.signature, share.share_title_f[current_num_f], share.share_desc_f[current_num_f], share.makeUrl(current_num_f,current_num_g), share.share_image, share.makeWechatUrl());
            $('.bg-white').hide();
        }
        else{
            share.share_desc='';
            share.getGroupInfo(info.result.gid);
        }
    },
    getGroupInfo:function(groupId){
        $.ajax({
            type:"POST",
            data:JSON.stringify({'group_id':groupId}),
            dataType:"json",
            url:"http://andes.cootekservice.com/pushtalk/query_group",
            success:share.getGroupInfoCallback
        });
    },
    getGroupInfoCallback:function(data){
        var info=data;
        console.log(info);
        if(info.result_code!=2000) {
            $('#inviteFriendBtn').hide();
            $('#codeInvalid').show();
            $('.photo-panel').css('top','6rem');
            $('.bg-white').hide();
            $('.top-tip').css('border-radius','0');
            $('.top-tip').css('-webkit-border-radius','0');
            $('.top-tip').css('-moz-border-radius','0');
            $('.top-tip').css('text-align','left');
            $('.top-tip>h2').css('left','1rem');
            $('.top-tip>p').css('left','1rem');
            $('.download-btn-sm').show();
            return;
        }
        $('.top-tip>p').text('你收到了一个群组邀请');
        $('#member-num').text(info.result.members.length+"人正在聊");
        $('#member-num').show();
        $('#inviteGroupBtn').show();
        $('.invite-word').text('邀请你加入');
        if(info.result.group_name) {
            share.share_title_group='邀请你加入BiBi群【'+info.result.group_name+'】，速来围观！'
            $('.nickname').text('BiBi群"' + info.result.group_name + '"');
            $('#hide-nickname').text('BiBi群："' + info.result.group_name + '"');
            if($('#hide-nickname').width()>$('.nickname').width())
                $('#ellipsis').show();
            $('#hide-nickname').hide();
        }
        else {
            $('.nickname').text('BiBi群"群聊(' + info.result.members.length + '人)"');
            share.share_title='群聊(' +info.result.members.length + '人)';
        }
        var i=1;
        for(member in info.result.members){
            if(i<=3&&info.result.members[member].user_id!=share.inviteInfo.result.user.user_id){
                if(info.result.members[member].head_image_url) {
                    if (info.result.members[member].head_image_url.indexOf("local")>-1) {
                        $('.other-photo' + i + '>img').attr('src', '/andesres/image/andes/'+info.result.members[member].head_image_url.substr(8) + ".png");
                    }
                    else
                        $('.other-photo' + i + '>img').attr('src', info.result.members[member].head_image_url);
                }
                $('.other-photo'+i).show();
                i++;
            }
        }
        $('.other-photo').show();
        $('#step2').html("<b>2.</b>打开BiBi，即可加入群聊");
        var current_num_f=parseInt(Math.random()*share.test_num_f);//当前好友分享文案编号
        var current_num_g=parseInt(Math.random()*share.test_num_g);//当前群分享文案编号
        if (WechatShare.isWeixin())
            WechatShare.config(INFO.appId, INFO.timestamp, INFO.noncestr, INFO.signature, share.share_title_g[current_num_g], share.share_desc_g[current_num_g], share.makeUrl(current_num_f,current_num_g), share.share_image, share.makeWechatUrl());
        $('.bg-white').hide();
    },
    downloadClick:function(){
        var id=$(this).attr('id');
        //if(id=="downloadCenter")
        //    _hmt.push(['_trackEvent', '邀请页面', '下载', '弹出框下载']);
        //else
        //    _hmt.push(['_trackEvent', '邀请页面', '下载', '顶部下载']);
        location.href=share.downloadLink;
    },
    openClick:function(){
        var scheme= "bibi://openbibi?code="+share.getInviteCode();
        location.href=scheme;
        var ifr = document.createElement('iframe');
        ifr.src = scheme;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    },
    makeUrl:function(current_num_f,current_num_g){
        var url=location.href.split('#')[0].replace(/test_f=[1-9]/,"test_f="+current_num_f);
        url=url.replace(/test_g=[1-9]/,"test_g="+current_num_g);
        return url;
    },
    makeWechatUrl:function(){
        var code=share.getInviteCode();
        var uri=share.url+"?redeem="+code+"&test_f="+share.current_num_f+"&test_g="+share.current_num_g+"&appid="+INFO.appId;
        var target="1#1#"+uri;
        target=base64_encode(target);
        redirect_url = 'http://touchlife.cootekservice.com/callback/wechat?target='+target;
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+INFO.appId+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    }
};
(function(){
    console.log($('#description').attr('content'));
    if(typeof(user_info) != "undefined")
        $('.top-tip>h2').text(user_info.nickname);
    var code=share.getInviteCode();
    share.getInviteInfo(code);
    $('.invite-code').text(code);
    $('.invite-btn').fastClick(share.inviteFriendClick);
    $('.open-link').fastClick(share.openClick);
    $("#downloadCenter").fastClick(share.downloadClick);
    $("#downloadTop").fastClick(share.downloadClick);
    if(!$('.top-tip>h2').text())
        $('.top-tip>p').css('top','0.95rem');
    if(userAgent.getHostDevice()!='iphone') {
        $("#browser-tip>img").attr('src', '/andesres/image/andes/tip2.png');
        $("#step1").text("先长按复制好友邀请码");
    }
    $("body").get(0).addEventListener('touchmove',function(event){event.preventDefault()});
    //判断邀请码是否长按
    var start_time,end_time;
    $('#code').get(0).addEventListener('touchstart',function(){
        start_time=Date.now();
    })
    $('#code').get(0).addEventListener('touchend',function(){
        end_time=Date.now();
        if(end_time-start_time<400)
            return;
        //_hmt.push(['_trackEvent', '邀请页面', '邀请码', '复制邀请码']);
        setTimeout(function(){
            $('.invite-code').css('background-color','white');
            $('.invite-code').css('color','#ff653c');
            $('.invite-code').css('border','1px solid #ff653c');
            $('#downloadCenter').css('background-color','#ff653c');
            $('#downloadCenter').css('color','white');
        },1000);
    });
})();
$(document).ready(function(){
    FastClick.attach(document.body);
    var t=[['邀请你加入BiBi群【','】，速来围观！'],['我是群分享文案2title']];
});
