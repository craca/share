/**
 * Created by Tony on 2016/7/15.
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
function p(num){
    return num>=10?num.toString():('0'+num);
}
var CR={
    messageUrl:'http://cootek-walkie-talkie.oss-cn-hangzhou.aliyuncs.com/external/couple_20160713/data/',
    isReceived:false,
    timeout:null,
    rankDetailDom:$('.rankDetailDom'),
    getDate:function(offset){
        var date=new Date();
        date.setDate(date.getDate()+offset);
        return date;
    },
    getDateFormat:function(offset){
        var date=new Date();
        date.setDate(date.getDate()+offset);
        var year=date.getFullYear().toString();
        return year+p(date.getMonth()+1)+p(date.getDate());
    },
    getData:function(day_offset){
        var url,data;
        if(day_offset<=-2) {
            $('#i').attr('src', CR.messageUrl + 'default.html');
            clearInterval(CR.timeout);
        }
        else
            $('#i').attr('src',CR.messageUrl+CR.getDateFormat(day_offset)+'.html');
        $('#i').get(0).onload=function(){
            window.frames[0].postMessage('',CR.messageUrl);
        };
        if(day_offset>-2){
            var timeout=setTimeout(function(){
                if(!CR.isReceived)
                    CR.getData(--day_offset);
            },1000);
        }
        if(window.addEventListener)
            window.addEventListener('message',CR.messageCallback,false);
        else if(window.attachEvent)
            window.attachEvent('onmessage',CR.messageCallback);
    },
    messageCallback:function(e){
        clearTimeout(CR.timeout);
        if(window.removeEventListener)
            window.removeEventListener('message',CR.messageCallback,false);
        else
            window.detachEvent('onmessage',CR.messageCallback);
        CR.isReceived=true;
        var data= e.data;
        if(typeof(e.data )==='string')
            data=JSON.parse(e.data);
        var phone,index;
        if(Andes.handler)
            phone=Andes.getLoginPhone();
        else
            phone='123';
        function getSortFun(order, sortBy) {
            var ordAlpah = (order == 'asc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            return sortFun;
        }
        data.sort(getSortFun('desc','grade'));
        var isInRank=false;
        for(var i in data) {
            if (data[i].mPhone == phone || data[i].wPhone == phone) {
                $('.nickname1').text(data[i].mNickname);
                $('.nickname2').text(data[i].wNickname);
                $('.my-grade>span').text(data[i].grade);
                $('.my-rank>span').text(parseInt(i)+1);
                isInRank=true;
            }
            if (i <= 2) {
                i=parseInt(i);
                $('#rankDetail' + (i + 1)).find('.nickname').text(data[i].mNickname + '&' + data[i].wNickname);
                $('#rankDetail'+(i+1)).find('.grade').text(data[i].grade);
            }
            else{
                var newDom=CR.rankDetailDom;
                newDom.find('.nickname').text(data[i].mNickname + '&' + data[i].wNickname);
                newDom.find('.grade').text(data[i].grade);
                newDom.find('.rank').text(parseInt(i)+1);
                $('.rank-list').append(newDom.clone());
            }
        }
        if(!isInRank){
            $('.nickname1').text("未设置");
            $('.nickname2').text("未设置");
            $('.my-grade>span').text('-');
            $('.my-rank>span').text('-');
        }
    }
};
function init(){
    $('#i').attr('src',CR.messageUrl+CR.getDateFormat(0)+'.html');
    CR.getData(0);
}