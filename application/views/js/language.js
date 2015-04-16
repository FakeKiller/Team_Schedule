/**
 * Created by saki on 2015/2/14.
 */
$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();
    $("#chinese").on("click",chinese);
    $("#english").on("click",english);

});

function chinese(e){
    $(".blog").text("日志");
    $(".time").text("时间管理");
    $(".discuss").text("讨论区");
    $(".login").text("登录");
    $(".home").text("主页");
    $(".shawshank").text("有些鸟是关不住的，因为它的每根羽毛都闪烁着自由的光辉。———《肖申克的救赎》");
    $(".seagull").text("你们必须明白，海鸥是一种自由无限的理想，是伟大的化身。你们的整个身体，从翅膀的一端到另一端，都是你们的思想。———《海鸥乔纳森》")
}

function english(e){
    $(".blog").text("BLOG");
    $(".time").text("TIME");
    $(".discuss").text("DISCUSS");
    $(".login").text("LOGIN");
    $(".home").text("HOME");
    $(".shawshank").text("Some birds aren't meant to be caged,their feathers are just too bright.———The Shawshank Redemption");
    $(".seagull").text("You’ve got to understand that a seagull is an unlimited idea of freedom, an image of the Great Gull, and your whole body, from wingtip to wingtip, is nothing more than your thought itself. ———Jonathan Livingston Seagull")
}
