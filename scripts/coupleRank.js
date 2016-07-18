/**
 * Created by Tony on 2016/7/15.
 */
var data=[
    {
        'mPhone':'13546487945',
        'wPhone':'18948649784',
        'grade':'5000',
    },
    {
        'mPhone':'13546487945',
        'wPhone':'18948649784',
        'grade':'600',
    },
    {
        'mPhone':'13546487945',
        'wPhone':'18948649784',
        'grade':'3000',
    }
];
function p(num){
    return num>=10?num.toString():('0'+num);
}
var CR={
    getDate:function(offset){
        var date=new Date();
        return date.setDate(date.getDate()+offset);
    },
    getDateFormat:function(offset){
        var date=CR.getDate(offset);
        var year=date.getFullYear().toString();
        return year+p(date.getMonth())+p(date.getDate());
    },
    getData:function(){

    }
};
$(document).ready(function(){

});