(function($){
    $.fn.animateCss=function(){
        if(arguments.length===1 && typeof arguments[0]==='object'){
            $(this).stop().animate(arguments[0]);
            return;
        }
        if(arguments.length===2){
            var css={};
            css[arguments[0]]=arguments[1];
            $(this).stop().animate(css);
            return;
        }
    };
})(jQuery);