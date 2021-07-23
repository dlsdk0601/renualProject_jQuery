'use strict';

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
    const selectedMenu = new Array();
    const display = (value) => {
        if(value == "all"){
            for(let i = 0; i < data.item.length; i++){ 
                itemList += `<li>
                            <figure>
                                <a href="detail.html"><img src="${data.item[i].thum}" alt=""></a>
                                <a href="detail.html">
                                    <p>${data.item[i].name}</p><p>${data.item[i].price}</p>
                                </a>
                            </figure>
                        </li>`;
            }
        }
        else{
            for(let i = 0; i < data.item.length; i++){  
                if(data.item[i].type == value){
                    itemList += `<li>
                                    <figure>
                                        <a href="detail.html"><img src="${data.item[i].thum}" alt=""></a>
                                        <a href="detail.html">
                                            <p>${data.item[i].name}</p><p>${data.item[i].price}</p>
                                        </a>
                                    </figure>
                                </li>`;
                    selectedMenu.push(data.item[i].sort);
                    }
                }
            }
        $(".mainlist .items").html(itemList);
        itemList = "";
    }
    display("all");
    
    //submenu cange function
    let tagList = " ";
    function textChange(){
        $("#top .submenu").empty();
        const set = Array.from(new Set(selectedMenu));

        for(let i = 0; i < set.length; i++){
            tagList += `<span>${set[i]}</span>`;
        }
        $("#top .submenu").html(tagList);
        tagList =" ";
        selectedMenu.splice(0, selectedMenu.length);
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
        display(lowerTxt);
        textChange()
        $(".sort1").removeClass("active");
    });
    
    
    
};
