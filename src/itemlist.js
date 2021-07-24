
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
    const items = new Array();
    for(let i = 0; i < data.item.length; i++){
        items.push(data.item[i]);
    }

    //items display function
    let itemList = "";
    let selectedMenu = new Array();
    let subMenuList = new Array();
    function display(arr, value){
        if(value == "all"){
            for(let i = 0; i < arr.length; i++){ 
                itemList += `<li>
                            <figure>
                                <a href="detail.html"><img src="${arr[i].thum}" alt=""></a>
                                <a href="detail.html">
                                    <p>${arr[i].name}</p><p>${arr[i].price}￦</p>
                                </a>
                            </figure>
                        </li>`;
            }
        }
        else{
            selectedMenu = arr.filter( item => item.type == value);
            for(let i = 0; i < selectedMenu.length; i++){
                itemList += `<li>
                                <figure>
                                    <a href="detail.html"><img src="${selectedMenu[i].thum}" alt=""></a>
                                    <a href="detail.html">
                                        <p>${selectedMenu[i].name}</p><p>${selectedMenu[i].price}￦</p>
                                    </a>
                                </figure>
                            </li>`;
                subMenuList.push(selectedMenu[i].sort);
            }
        }
        $(".mainlist .items").html(itemList);
        itemList = "";
    }
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
    

    //sort display
    const lowPriceItems = new Array();
    const highPriceItems = new Array();
    const bestItems = new Array();

    //각 배열에 상품 넣기
    for(let i = 0; i < data.item.length; i++){
        lowPriceItems.push(data.item[i]);
    }
    for(let i = 0; i < data.item.length; i++){
        highPriceItems.push(data.item[i]);
    }
    for(let i = 0; i < data.item.length; i++){
        if(data.item[i]["popular"] == "best"){
            bestItems.push(data.item[i]);
        }
    }
    

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
    lowPriceItems.sort(lowSorting);
    highPriceItems.sort(highSorting);
    
    //li click event
    $("#sort2 ul li").on("click", function(){

        //hidden ul and text change
        $("#sort2 ul").addClass("hidden");
        sortName = $(this).text();
        $("#sort2 p").text(sortName);

        if(sortName == "All"){
            display(items, "all");
        }else if(sortName == "Low price"){
            display(lowPriceItems, "all");
        }else if(sortName == "High price"){
            display(highPriceItems, "all");
        }else if(sortName == "Best"){
            display(bestItems, "all");
        }

    });


    //end
};
