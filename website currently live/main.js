(function($){
    $(document).ready(function(){
        initTouchFade();
        initScroll();
        initTabHander();
        initNavHander();
    });
    $(window).load(function(){
        initMapAddress();
    });

    function initMapAddress(){
        var mapUrl = "https://a.tiles.mapbox.com/v4/pansypanda.ni3da9n0/attribution,zoompan,zoomwheel.html?access_token=pk.eyJ1IjoicGFuc3lwYW5kYSIsImEiOiJEbDNiVnpVIn0.ucVVOgCsE1d8RRo_OJi8Rw#16/51.5280/-0.0373";
        $("#addressFrame").attr("src",mapUrl);
    }
    function initTouchFade(){
        var time = 1500;
        $(".front-container .touch").click(function(){
            $("body .touch-info").fadeIn(time);
        });
        $(".touch-info .touch-back").click(function(){
            $("body .touch-info").fadeOut(time);
        });
    }
    function moveHander(event){
        event  = event || window.event;
        if(event.clientY >=0 && event.clientY <= 120){
            $(".nav-container").slideDown(500);
        }
        else{
            $(".nav-container").slideUp(500);
        }
    }
    function initScroll(){
        var lastScrollTop = 0;
        var isFirstBind = true;
        $('body>div').scroll(function(){
            var windowElement = $(this);
            if(windowElement.width() < 992){
                return;
            }

            var tempTop = windowElement.scrollTop();
            if(tempTop-windowElement.height() >= 0)
            {
                if(!isFirstBind)
                {
                    return;
                }
                isFirstBind = false;
                $(".nav-container").slideDown(500);
                setTimeout(function(){
                    $(document).mousemove(moveHander);
                    $(".nav-container").slideUp(500);
                },2500)
            }
            else{
                $(document).unbind("mousemove",moveHander);
                isFirstBind = true;
                $(".nav-container").slideUp(500);
            }
        });
    }
    function frontTabHander(){
        var windowElement = $('body>div');
        var tempHeight = windowElement.height();
        windowElement.animate({
            scrollTop:tempHeight
        },1000);
    }
    function initTabHander(){
        $(".tab1").on("click",frontTabHander);
        $(".tab2").on("click",frontTabHander);
    }

    function initNavHander(){
        function navTabHander(){
            var time = 1000;
            if($(window).width() <= 768){
                if($(this).hasClass("tab1")){
                    $(".tab1").removeClass("tab1-normal");
                    $(".tab2").removeClass("tab2-active");
                }
                else{
                    $(".tab1").addClass("tab1-normal");
                    $(".tab2").addClass("tab2-active");
                }
            }
            if($(this).hasClass("tab3") || $(this).hasClass("tab1")){
                $("body .grid-container").fadeIn(time);
                $(window).resize();
                $("body .our-work").fadeOut(time);
                $(".tab3").removeClass("tab3-normal");
                $(".tab4").removeClass("tab4-active");
                if(window.islider){
                    window.islider.destroy();
                    window.islider = null;
                }
                if(window.islider2){
                    window.islider2.destroy();
                    window.islider2 = null;
                }
                if(window.islider3){
                    window.islider3.destroy();
                    window.islider3 = null;
                }
                if(window.islider4){
                    window.islider4.destroy();
                    window.islider4 = null;
                }
            }
            else{
                $("body .grid-container").fadeOut(time);
                var isInited = false;
                $("body .our-work").fadeIn(time, function () {
                    if(isInited) return;
                    isInited = true;
                    var list1 = [
                        {content: "./images/project101.jpg"},
                        {content: "./images/project102.jpg"},
                        {content: "./images/project103.jpg"}
                    ];
                    window.islider = new iSlider({
                        type: 'pic',
                        data: list1,
                        dom: document.getElementById("item-img-wrapper"),
                        isLooping: true,
                        plugins: ['dot'],
                        animateType: 'default'
                    });
                    var list2 = [
                        {content: "./images/project2.jpg"}
                    ];
                    window.islider2 = new iSlider({
                        type: 'pic',
                        data: list2,
                        dom: document.getElementById("item-img-wrapper2"),
                        isLooping: true,
                        animateType: 'default'
                    });
                    var list3 = [
                        {content: "./images/project301.jpg"},
                        {content: "./images/project302.jpg"}
                    ];
                    window.islider3 = new iSlider({
                        type: 'pic',
                        data: list3,
                        dom: document.getElementById("item-img-wrapper3"),
                        isLooping: true,
                        plugins: ['dot'],
                        animateType: 'default'
                    });
                    var list4 = [
                        {content: "./images/project401.jpg"},
                        {content: "./images/project402.jpg"}
                    ];
                    window.islider4 = new iSlider({
                        type: 'pic',
                        data: list4,
                        dom: document.getElementById("item-img-wrapper4"),
                        isLooping: true,
                        plugins: ['dot'],
                        animateType: 'default'
                    });
                });
                $(".tab3").addClass("tab3-normal");
                $(".tab4").addClass("tab4-active");
            }
            function initItemImage(){
                var itemImageRatio = 1.787;
                var imgContainer = $(".our-work .item-container .item-img-container");
                if($(window).width() >= 1200){
                    var imgContainerHeight = imgContainer.height();
                    var imgContainerWidth = imgContainerHeight*itemImageRatio;
                    imgContainer.width(imgContainerWidth);
                    var itemAllWidth = imgContainerWidth;
                    imgContainer.parent().width(itemAllWidth);
                    imgContainer.parent().parent().width(4*itemAllWidth+400);
                }
                else{
                    var imgContainerWidth = imgContainer.width();
                    var imgContainerHeight = imgContainerWidth/itemImageRatio;
                    imgContainer.height(imgContainerHeight);
                    imgContainer.parent().height(imgContainerHeight+150);
                }
            }
            //initItemImage();
           // $(window).resize(initItemImage);
            frontTabHander();
            setTimeout(function(){
                $(".nav-container").slideUp(500);
            },2000)
        }
        $(".tab1").on("click",navTabHander);
        $(".tab3").on("click",navTabHander);

        $(".tab2").on("click",navTabHander);
        $(".tab4").on("click",navTabHander);
    }
})(jQuery);
