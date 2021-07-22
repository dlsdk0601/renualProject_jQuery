$(function(){
    $(".regular").slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    });
    
    $(window).on("scroll", function(){
        const scr = $(".main2 .con-1").offset().top;
        console.log("콘텐츠:" + scr);
        console.log("브라우저 높이값:" + $(window).height());
        console.log("스크롤값:" + scrollY);

        // if(scr )
    });
});
