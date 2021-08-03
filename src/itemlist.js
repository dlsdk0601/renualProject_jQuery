
fetch("data/data_items.json")
.then( (res) => res.json() )
.then( (data) => callback(data) );

const callback = (data)  => {
    
    //Json-data in Array
    const items = data.item.slice();
    let selectedMenu = data.item.slice();
    
    //mainMenu css event
    $("#top .downArrow").on("click", function(e){
        e.preventDefault();
        $(".sort1 .menulist ul").toggleClass("active");
    });
    $("#top .menulist ul li").on("click", function(){
        $(".sort1 .menulist ul").toggleClass("active");
    });
    $("#top .menulist ul li").on("mouseenter", function(){
        $(this).css("background-color", "gray");
    });
    $("#top .menulist ul li").on("mouseleave", function(){
        $(this).css("background-color", "white");
    });

    
    
    
    //items display function
    let itemList = "";
    let subMenuList = new Array();
    let lowPriceItems = new Array();
    let highPriceItems = new Array();
    let bestItems = new Array();
    let tagList = " ";
    let lowerTxt;
    let sortName = "ALL";
    let localSort;
    let elSpan;

    function display(arr, sort){
        if(sort == "ALL"){
            println(arr); 
        }else if(sort == "LOW PRICE"){
            lowPriceItems = arr.slice();
            lowPriceItems.sort(lowSorting);
            println(lowPriceItems);
            lowPriceItems = [];
        }else if(sort == "HIGH PRICE"){
            highPriceItems = arr.slice();
            highPriceItems.sort(highSorting);
            println(highPriceItems);
            highPriceItems = [];
        }else if(sort == "BEST"){
            bestItems = arr.filter(item => item.popular == "best");
            println(bestItems);
            bestItems = [];
        }
        clcikEvent();
        itemList = "";
    }

    
    //다른페이지에서 넘어 왓을 경우
    localType = localStorage.type;
    localSort = localStorage.sort;
    if( localStorage.type != undefined){
        $(".mainlist .items").empty();
        if(localType == "ALL"){
            selectedMenu = items.filter(item => true);
        }else{
            if( localStorage.smallMenu != undefined ){
                selectedMenu = items.filter(item => (item.sort == localStorage.smallMenu.toLowerCase()) && (item.type == localType.toLowerCase()));
                items.map( item => {
                    if( item.type == localType.toLowerCase()) {
                        subMenuList.push(item.sort)
                    }
                });
            }else{
                selectedMenu = items.filter( item => item.type == localType.toLowerCase() );
                selectedMenu.map( item => subMenuList.push(item.sort) );
            }
        }
        
        $("#top .menulist p").text( localType );
        $(".title").text(localType);
        display(selectedMenu, localSort);
        textChange();
        elSpan = $(".sort1 .submenu span");
            elSpan.attr("active", "0");
            for(let i = 0; i < elSpan.length; i++){
                if( elSpan.eq(i).attr("data-sub") == localStorage.smallMenu.toLowerCase() ){
                    elSpan.eq(i).attr("active", "1");
                }
            }
        $("#sort2 p").text(localSort);
        sortName = localSort;
        lowerTxt = localType.toLowerCase();
        localStorage.removeItem('type');
        localStorage.removeItem('sort');
        localStorage.removeItem('smallMenu');
    }else{
        //default Page
        display( items, "ALL" );
    }
    
    

    //create HTML Tag
    function createHTMLString(item){
        return `<li data-id="${item.id}">
                    <figure>
                        <a data-id="${item.id}" href="detail.html"><img src="${item.thum}" alt=""></a>
                        <a data-id="${item.id}" href="detail.html"><p>${item.name}</p><p>${item.price.toLocaleString("ko-KR")}￦</p></a>
                    </figure>
                </li>`;
    }
    //print function
    function println(arr){
        itemList = arr.map(item => createHTMLString(item)).join("");
        $(".mainlist .items").html(itemList);
        
    }

    //메뉴 클릭 이벤트
    $("#top .menulist ul li").on("click", function(){
        //Menu name, title change
        const txt = $(this).text();
        lowerTxt = txt.toLowerCase();
        $("#top .menulist p").text(txt);
        $(".title").text(txt);

        //itemlist change
        $(".mainlist .items").empty();
        if(txt == "ALL"){
            selectedMenu = items.filter(item => true);
            display(selectedMenu, sortName);
            textChange();
        }else{
            selectedMenu = items.filter(item => item.type == lowerTxt );
            selectedMenu.map( item => subMenuList.push(item.sort) );
            textChange();
            display(selectedMenu, sortName);
        }
        

        $(".sort1").removeClass("active");
        
    });

    //서브메뉴 클릭 이벤트
    $(".sort1 .submenu").on("click", function(e){
        const name = e.target.dataset.sub;
        if(name != undefined){
            selectedMenu = items.filter(item => (item.sort == name) && (item.type == lowerTxt));
            display( selectedMenu, sortName );
            elSpan = $(".sort1 .submenu span");
            elSpan.attr("active", "0");
            for(let i = 0; i < elSpan.length; i++){
                if( elSpan.eq(i).attr("data-sub") == name ){
                    elSpan.eq(i).attr("active", "1");
                }
            }
        }
    });
    
    //submenu change function
    function textChange(){
        $("#top .submenu").empty();
        const set = Array.from(new Set(subMenuList));
        for(let i = 0; i < set.length; i++){
            tagList += `<span data-sub="${set[i]}" active="0">${set[i]}</span>`;
        }
        $("#top .submenu").html(tagList);
        tagList =" ";
        subMenuList.splice(0, subMenuList.length);
    }

    //sort2 click event
    $("#sort2 img").on("click", function(){
        $("#sort2 ul").toggleClass("hidden");
    });
    $("#sort2 ul li").on("mouseenter", function(){
        $(this).css("background-color", "gray");
    });
    $("#sort2 ul li").on("mouseleave", function(){
        $(this).css("background-color", "white");
    });
    


    
    //낮은 가격순 함수
    function lowSorting(a, b){
        if(a.price == b.price){
            return 0;
        }
        return a.price > b.price ? 1 : -1
    }
    //높은 가격순 함수 
    function highSorting(a, b){
        if(a.price == b.price){
            return 0;
        }
        return a.price < b.price ? 1 : -1
    }
    

    //sort click event 
    $("#sort2 ul li").on("click", function(){
        $("#sort2 ul").addClass("hidden");
        sortName = $(this).text();
        $("#sort2 p").text(sortName);
        display(selectedMenu, sortName);
        
    });

    //more button
    const elLi = $(".itemlist .mainlist ul li");
    for(let i = 9; i < 100; i++){
        elLi.eq(i).hide();
    }
    $(".more").on("click", function(e){
        e.preventDefault();
        $(".itemlist .mainlist ul li").show();
        $(this).remove();
    })
    
    

    //상세페이지 넘어가기
    function clcikEvent(){
        $(".mainlist .items li").on("click", function(){
            // e.preventDefault();
            console.log( $(this).attr("data-id") );
            localStorage.itemid = $(this).attr("data-id");
        });
    }


    $(window).on("scroll", function(){
        if(scrollY > 120){
            $(".sort1").css( { "position": "sticky", "top": "6%", "z-index": "4", "background": "white" } );
        }else{
            $(".sort1").css( { "position": "relative", "top": "0", "z-index": "1", "background": "none" } );
        }
    });
    


    
    
    



    //end
};
