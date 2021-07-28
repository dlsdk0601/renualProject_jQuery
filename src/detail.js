'use strict';
fetch("data/data_items.json")
.then( res => res.json() )
.then( data => loadItem(data) );

function loadItem(data){
    //start

    //데이터 배열에 넣기
    const items = [];
    for(let i = 0; i < data.item.length; i++){
        items.push( data.item[i] );
    }


    //로컬스토리지에 클릭된 아이템의 id값 불러오기
    const id = localStorage.itemid;
    
    
    const selectedItem = [];
    for(let i = 0; i < items.length; i++){
        if(id === items[i].id){
            selectedItem.push(items[i]);  //해당 상품만 들어있음
        }
    }

   
    //서브 사진 값 들고와서, 배열로 저장(모든 주소가 한 문자열로 가져와짐)
    const photoString = selectedItem[0].detailphoto;
    const photoArray = photoString.split(", ");
    
    const tagList = `<figure class="bigphto">
                        <img src="${selectedItem[0].thum}" alt="">
                    </figure>
                    <p class="exp1">
                        ${selectedItem[0].detailtext1}
                    </p>
                    <p class="exp2">
                        ${selectedItem[0].detailtext2}
                    </p>
                    <p class="size">
                        전체조립된 사이즈 : ${selectedItem[0].size}
                    </p>
                    <figure class="ex">
                        <img src="${photoArray[0]}" alt="">
                    </figure>
                    <figure class="ex">
                        <img src="${photoArray[1]}" alt="">
                    </figure>
                    <figure class="ex">
                        <img src="${photoArray[2]}" alt="">
                    </figure>
                    <figure class="ex">
                        <img src="${photoArray[3]}" alt="">
                    </figure>`;

    $(".info .explain").html(tagList);


    
    //구매창 태그 만들어 넣기
    const buyTagList = `<p class="mininame"><img src="img/arrowleft.svg" alt=""></p>
                        <p class="name"> ${selectedItem[0].name}</p>
                        <div class="price">
                            <p>Price</p>
                            <p>${selectedItem[0].price}￦</p>
                        </div>
                        <div class="material">
                            <p>material</p>
                            <p>${selectedItem[0].name}</p>
                        </div>
                        <div class="color">
                            <p>Color</p>
                            <section>
                                <input id="chk1" type="radio" name="cl1" checked>
                                <label for="chk1" class="chk1"></label>
                                <input id="chk2" type="radio" name="cl1">
                                <label for="chk2" class="chk2"></label>
                                <input id="chk3" type="radio" name="cl1">
                                <label for="chk3" class="chk3"></label>
                            </section>
                        </div>
                        <div class="size">
                            <p>Size</p>
                            <p>${selectedItem[0].size}</p>
                        </div>
                        <div class="point">
                            <p>Membership point</p>
                            <p>10%</p>
                        </div>
                        <div class="many">
                            <p>How many</p>
                            <input type="number" value="1" min="1">
                        </div>
                        <div class="buycart">
                            <a href="#">Buy</a>
                            <a href="#">Cart</a>
                        </div>`;
    $(".container .side").html(buyTagList);

    //구매창 이벤트
    $(".container .side .mininame").on("click", function(){
        $(".container .side").toggleClass("active");
        if( $(".container .side").hasClass("active") ){
            $(".container .side .mininame img").attr("src", "img/arrowright.svg");
        }else{
            $(".container .side .mininame img").attr("src", "img/arrowleft.svg");
        }
        
    });



    //메뉴 이벤트
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

    //메뉴 클릭 이벤트
    let lowerTxt;
    $("#top .menulist ul li").on("click", function(){
        //Menu name, title change
        const txt = $(this).text();
        lowerTxt = txt.toLowerCase();
        $("#top .menulist p").text(txt);
        $(".title").text(txt);
    });

    
    //end
}
