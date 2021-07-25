
fetch("data/data_items.json")
.then( (res) => res.json() )
.then( (data) => callback(data) );

const callback = (data)  => {
    
    //mainMenu event
    $("#top .downArrow").on("click", function(e){
        e.preventDefault();
        $(".sort1").toggleClass("active");
    });
    $("#top .menulist ul li").on("mouseenter", function(){
        $(this).css("background-color", "gray");
    });
    $("#top .menulist ul li").on("mouseleave", function(){
        $(this).css("background-color", "white");
    });

    //Json-data in Array
    const items = data.item.slice();
    let selectedMenu = data.item.slice();
    // data.item.map(item => items.push(item));
    // data.item.map(item => selectedMenu.push(item));
    
    
    //items display function
    let itemList = "";
    let subMenuList = new Array();

    function display(arr, value){
        if(value == "all"){
            itemList = arr.map(item => createHTMLString(item)).join("");
            $(".mainlist .items").html(itemList);   
        }
        else{
            selectedMenu = [];
            selectedMenu = arr.filter( item => item.type == value);
            itemList = selectedMenu.map(item => createHTMLString(item)).join("");
            $(".mainlist .items").html(itemList); 
            selectedMenu.map( item => subMenuList.push( item.sort ) );
        }
        itemList = "";
    }

    //li tag return.
    function createHTMLString(item){
        return `<li>
                    <figure>
                        <a href="detail.html"><img src="${item.thum}" alt=""></a>
                        <a href="detail.html">
                            <p>${item.name}</p><p>${item.price}￦</p>
                        </a>
                    </figure>
                </li>`;
    }

    //default Page
    display( items, "all");
    
    //submenu cange function
    let tagList = " ";
    function textChange(){
        $("#top .submenu").empty();
        const set = Array.from(new Set(subMenuList));

        for(let i = 0; i < set.length; i++){
            tagList += `<span>${set[i]}</span>`;
        }
        $("#top .submenu").html(tagList);
        tagList =" ";
        subMenuList.splice(0, subMenuList.length);
    }

    //메뉴 클릭 이벤트
    $("#top .menulist ul li").on("click", function(){
        //Menu name, title change
        const txt = $(this).text();
        const lowerTxt = txt.toLowerCase();
        $("#top .menulist p").text(txt);
        $(".title").text(txt);

        //itemlist change
        $(".mainlist .items").empty();
        display( items, lowerTxt);
        textChange()
        $(".sort1").removeClass("active");
    });
    
    //sort2 click event
    let sortName = "";
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
    //해당하는 분류로 재분류
    // lowPriceItems.sort(lowSorting);
    // highPriceItems.sort(highSorting);
    
    //분류하는 함수
    //sort display
    let lowPriceItems = new Array();
    let highPriceItems = new Array();
    let bestItems = new Array();
    $("#sort2 ul li").on("click", function(){

        //hidden ul and text change
        $("#sort2 ul").addClass("hidden");
        sortName = $(this).text();
        $("#sort2 p").text(sortName);
        
        console.log(selectedMenu);
        if(sortName == "All"){
            display(selectedMenu, "all");
        }else if(sortName == "Low price"){
            lowPriceItems = selectedMenu.slice();
            lowPriceItems.sort(lowSorting);
            display(lowPriceItems, "all");
        }else if(sortName == "High price"){
            highPriceItems = selectedMenu.slice();
            highPriceItems.sort(highSorting);
            display(highPriceItems, "all");
        }else if(sortName == "Best"){
            selectedMenu.map(item => {
                if(item["popular"] == "best"){
                    bestItems.push(item);
                }
            });
            display(bestItems, "all");
            bestItems = [];
        }
    });


    //end
};
