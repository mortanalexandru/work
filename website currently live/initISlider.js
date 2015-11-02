/**
 * Our work section
 * @returns {___anonymous_CustomizedISlider}
 */
CustomizedISlider = (function() {
	/**
	 * The used sliders
	 */
	var sliders;
	/**
	 * Initializes the sliders
	 */
	var initSliders = function() {
		setImageSizes();
		$(window).resize(setImageSizes);
		if(sliders){
			for(var i=0; i< sliders.length; i++){
				sliders[i].reloadSlider();
			}
		}else{
			sliders = [];
			$('.slider').each(function(){
				sliders.push($(this).bxSlider({
					controls: false
				}));
			});
		}
	};
	
	/**
	 * Set the image sizes
	 */
	var setImageSizes = function() {
		var itemImageRatio = 1.787;
		var imgContainer = $(".our-work .item-container .item-img-container");
		if ($(window).width() >= 1200) {
			var imgContainerHeight = imgContainer.height();
			var imgContainerWidth = imgContainerHeight * itemImageRatio;
			imgContainer.width(imgContainerWidth);
			var itemAllWidth = imgContainerWidth;
			imgContainer.parent().width(itemAllWidth);
			imgContainer.parent().parent().width(4 * itemAllWidth + 400);
		} else {
			var imgContainerWidth = imgContainer.width();
			var imgContainerHeight = imgContainerWidth / itemImageRatio;
			imgContainer.height(imgContainerHeight);
			imgContainer.parent().height(imgContainerHeight + 150);
		}
	};

	return {
		initSliders : initSliders
	};
}());

