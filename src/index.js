'use strict';
$(".regular").slick({
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
});
    
//스크롤 이벤트 
$(window).on("scroll", function(){
    const con1 = $(".main2 .con-1").offset().top;
    const windowHeight = $(this).height()
    // console.log("콘텐츠:" + scr);
    // console.log("브라우저 높이값:" + $(this).height());
    // console.log("스크롤값:" + scrollY);

    if((con1 - windowHeight) < scrollY){
        $(".main2 .con-1 .pho").addClass("active");
        $(".main2 .con-1 > p").addClass("active");
    }

    const con2 = $(".main2 .con-2").offset().top;
    if((con2 - windowHeight) < scrollY){
        $(".main2 .con-2 figure").addClass("active");
        $(".main2 .con-2 p").addClass("active");
    }

    const con3 = $(".main2 .con-3").offset().top;
    if((con3 - windowHeight) < scrollY){
        $(".main2 .con-3").addClass("active");
    }

    const con4 = $(".main2 .con-4").offset().top;
    if((con4 - windowHeight) < scrollY){
        $(".main2 .con-4 p").addClass("active");
        $(".main2 .con-4 figure").addClass("active");
    }
});

//best event
$(".best .bestitems li").on("mouseenter", function(){
    $(this).css("animation", "best 1s forwards")
});
$(".best .bestitems li").on("mouseleave", function(){
    $(this).css("animation", "ease")
});

//more button
$(".best .morebtn").on("click", function(e){
    // e.preventDefault();
    localStorage.sort = "BEST";
    localStorage.type = "ALL";
});

$(".main2 .con-1 a").on("click", function(e){
    // e.preventDefault();
    localStorage.sort = "ALL";
    localStorage.type = "DIY";
});
$(".main2 .con-2 a").on("click", function(e){
    // e.preventDefault();
    localStorage.sort = "ALL";
    localStorage.type = "WOOD";
});
$(".main2 .con-3 a").on("click", function(e){
    // e.preventDefault();
    localStorage.sort = "ALL";
    localStorage.type = "METAL";
});
$(".main2 .con-4 a").on("click", function(e){
    // e.preventDefault();
    localStorage.sort = "ALL";
    localStorage.type = "DECO";
});