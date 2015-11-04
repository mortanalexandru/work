/**
 * Main Page Component
 */
var MainPage = (function () {
	
	/**
	 * Initializes the main page
	 */
	var init = function(){
		bindHandlers();
	};
	
	/**
	 * Initializes the address map
	 */
	var initMapAddress = function(){
	    var mapUrl = "https://a.tiles.mapbox.com/v4/pansypanda.ni3da9n0/attribution,zoompan,zoomwheel.html?access_token=pk.eyJ1IjoicGFuc3lwYW5kYSIsImEiOiJEbDNiVnpVIn0.ucVVOgCsE1d8RRo_OJi8Rw#16/51.5280/-0.0373";
	    $("#addressFrame").attr("src",mapUrl);
	};
	
	/**
	 * Binds the handlers
	 */
	var bindHandlers = function(){
		bindNavHandlers();
		bindContactHandler();
		bindNavigationContainer();
	};
	
	/**
	 * Binds the navigation handlers
	 */
	var bindNavHandlers = function(){
		var time = 1000;
		// what we do container
		$(".front-container .tab1, .nav-container .tab3").off("click.navAction").on("click.navAction", function(){
			 $("body .grid-container").fadeIn(time);
			 $("body .our-work").fadeOut(time);
			 $("body .touch-info").fadeOut(time);
			 scrollToContent();
             $(".tab1").removeClass("tab1-normal");
             $(".tab2").removeClass("tab2-active");
             $(".tab3").removeClass("tab3-normal");
             $(".tab4").removeClass("tab4-active");
             $(window).resize();
		});
		// our work container
		$(".front-container .tab2, .nav-container .tab4").off("click.navAction").on("click.navAction", function(){
			 $("body .our-work").fadeIn(time);
			 setTimeout(CustomizedISlider.initSliders(), time);
			 $("body .grid-container").fadeOut(time);
			 $("body .touch-info").fadeOut(time);
			 scrollToContent();
             $(".tab1").addClass("tab1-normal");
             $(".tab2").addClass("tab2-active");
             $(".tab3").addClass("tab3-normal");
             $(".tab4").addClass("tab4-active");
		});
	};
	
	/**
	 * Scrolls to the newly opened tab
	 */
	var scrollToContent = function(){
        var windowElement = $('body>div');
        var tempHeight = windowElement.height();
        windowElement.animate({
            scrollTop:tempHeight
        },1000);
	};

	/**
	 * Binds the contact icon handlers
	 */
	var bindContactHandler = function(){
		var time = 1500;
		$(".front-container .touch, .nav-container .touch-nav").off("click.contactInfo").on("click", function(){
			$(".grid-container .ux-box-layout .ux-box-item").css("z-index", "0");
			$("body .touch-info").fadeIn(time);
			$(".nav-container").slideUp(500);
			$(".invisibleHeader").addClass("hide");
		});
		// x button handler
		$(".touch-info .touch-back").off("click.contactInfo").on("click.contactInfo", function(){
			setTimeout(function(){$(".grid-container .ux-box-layout .ux-box-item").css("z-index", "2")}, time);
			$("body .touch-info").fadeOut(time);
			$('body>div').trigger("scroll.navHeader");
		});
	};
	
	/**
	 *  Binds the navigation container handlers (sticky header)
	 */
	var bindNavigationContainer = function(){
		$(".invisibleHeader").off("mouseenter.navigation").on("mouseenter.navigation",function(){
			$(".nav-container").slideDown(500);
		});
		$(".nav-container").off("mouseleave.navigation").on("mouseleave.navigation",function(){
			setTimeout(function(){
				if(!$(".nav-container").is(":hover")){
					$(".nav-container").slideUp(500);
				}
				},2000);
		});
        $('body>div').off("scroll.navHeader").on("scroll.navHeader", scrollHandler);
	};
	/**
	 * Binds the scroll handler
	 */
	var scrollHandler = function(){
            var windowElement = $(this);
            if(windowElement.width() < 992){
                return;
            }
            var tempTop = windowElement.scrollTop();
            if(tempTop-windowElement.height() >= 0)
            {
            	if($(".invisibleHeader").hasClass("hide")){
            		$(".nav-container").slideDown(500);
                	$(".invisibleHeader").removeClass("hide");
                    if(!$(".nav-container").is(":hover")){
                    	$(".nav-container").trigger("mouseleave.navigation");
                    }
            	}
            }else{
                $(".invisibleHeader").addClass("hide");
                $(".nav-container").slideUp(500);
            }
	};
	
	return {
		init: init,
		initMapAddress: initMapAddress 
	};
}());

$(function() {
	MainPage.init();
});
$(window).load(function(){
	MainPage.initMapAddress();
});

