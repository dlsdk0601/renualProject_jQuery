'use strict';

$("header").load("inc.html header > div", function(){
        
    // burger click
    $("header .trigger > a").on("click", function(){
        $(this).toggleClass("active-7");
        $(this).toggleClass("type7");
        $(".pop").toggleClass("active");
        $("header h1").toggleClass("hidden");
        $("header .topicons").toggleClass("hidden");
    });

    //menu active
    $("#bigMenu .menu").on("click", function(){
        $("#bigMenu .menu section").removeClass("active");
        $("#bigMenu .menu section").eq( $(this).index() ).addClass("active");
        localStorage.type = $(this).find(".active-1").text();
    });
    //small menu click
    $("#bigMenu .menu section p").on("click", function(){
        localStorage.smallMenu = $(this).text();
        localStorage.sort = "ALL";
    });
        
    //login popup
    $("header .topicons > a:nth-of-type(1)").on("click", function(e){
        e.preventDefault();
        $("header .login").toggleClass("active");
    })
    $("header .login .close").on("click", (e) => {
        e.preventDefault();
        $("header .login").toggleClass("active");
    })
});
    
$("footer").load("inc.html footer > div");



