/**
 * koujp
 * 盒子布局
 */
(function($){
    var instanceCache={};
    $(window).resize(function () {
        var instance;
        for(var instanceId in instanceCache){
            if(!instanceCache.hasOwnProperty(instanceId)){
                continue;
            }
            instance=instanceCache[instanceId];
            instance.resize();


        }
    });

    var defaultLayoutRule={
        widthRule:{
            normal:{
                deaultRule:{
                    cols:3
                },
                rules:[
                    {
                        maxWidth:768,
                        cols:1
                    },
                    {
                        maxWidth:3000,
                        cols:3
                    }
                ]
            },
            preview:{
                deaultRule:{
                    css:{
                        width:'10%'
                    }
                },
                rules:[
                    {
                        maxWidth:768,
                        css:{
                            width:'0'
                        }
                    },
                    {
                        maxWidth:992,
                        css:{
                            width:'20%'
                        }
                    }
                ]
            }

        },
        heightRule:{
            deaultRule:{},
            rules:[]
        }
    };
    function BoxItemPreview(){
        this.container=null;
    }
    BoxItemPreview.prototype.setTitle= function (title) {
        var titleDom=this.container.find('>header .ux-box-title');
        titleDom.text(title);
    };
    BoxItemPreview.prototype.setContent= function (content) {
        var contentDom=this.container.find('>div.ux-box-content');
        contentDom.html(content);
    };
    BoxItemPreview.prototype.setCurrentItemId= function (itemId) {
        this.container.attr('itemid',itemId);
    };
    BoxItemPreview.prototype.getCurrentItemId= function () {
        return this.container.attr('itemid');
    };
    BoxItemPreview.prototype.isCurrentItemId= function (itemId) {
        return this.container.attr('itemid')===itemId;
    };
    BoxItemPreview.prototype.css= function () {
        var css={};
        if(arguments.length===2){
            css[arguments[0]]=arguments[1];
        }
        if($.fn.animateCss){
            this.container.animateCss(css);
        }else{
            this.container.css(css);
        }
    };
    BoxItemPreview.prototype.show= function () {
       this.css('opacity',1);

    };
    BoxItemPreview.prototype.hide= function () {
        this.css('opacity',0);
    };
    var boxItemPreview=new BoxItemPreview();
    function getBoxItemPreview(dom){
        var container=dom;
        if(container.size()===0){
            boxItemPreview.isNew=true;
            var container=$('<div/>').addClass('ux-box-item-preview');

            var header=$('<header/>');
            var title=$('<div/>').addClass('ux-box-title');
            var closeBtn=$('<div/>').addClass('ux-box-closebtn');
            header.append(title).append(closeBtn);

            var content=$('<div/>').addClass('ux-box-content');

            container.append(header).append(content);
        }else{
            boxItemPreview.isNew=false;
        }
        boxItemPreview.container=container;
        return boxItemPreview;
    }
    $.fn.boxlayout= function (options) {

        var ele=$(this);
        ele.bind('mouseover mousemove touchmove', function (event) {
            if($(this).is('.full-screen')){
                event.stopPropagation();
            }
        })
        var id=ele.attr('instance');
        if(id) {
            return instanceCache[id];
        }
        if(!options){
            return null;
        }
        id='box-layout_'+(new Date()).getTime();
        ele.attr('instance',id);
        ele.empty();
        var layoutRule=option.layoutRule;
        if(!layoutRule){
            layoutRule=defaultLayoutRule;
        }
        var obj=instanceCache[id]={
            state:'normal'
        };
        var items=option.items;
        if(!items){
            items=[];
        }
        if(Object.prototype.toString.call(items)!=='[object Array]'){
            throw new Error('items of options must be array');
        }
        obj.element=ele;
        obj.items=items;
        obj.getItemById= function (id) {
            var items=this.items;
            for(var i=0;i<items.length;i++){
                if(items[i].id===id){
                    return items[i];
                }
            }
            return null;
        };
        obj.resize= function () {
            var state=this.state;

            var ele=this.element.find('.ux-box-layout-content');
            var eleWidth=ele.width();

            var maxHeight=this.element.height();
            var winW=$(window).width();

            var widthRule=layoutRule.widthRule[state];
            var rule;
            for(var i=0;i<widthRule.rules.length;i++){
                rule=widthRule.rules[i];
                if(winW<rule.maxWidth){
                    break;
                }
            }
            if(!rule){
                rule=widthRule.deaultRule;
            }

            var itemEles=ele.find('.ux-box-item');
            if(state!=='normal'){
                if(!ele.attr('oritop')){
                    ele.attr('oritop',ele.css('top'));
                }
                ele.css('top',0);
                var itemHeight=maxHeight/itemEles.size();
                var ruleCss=rule.css;
                var itemWidth=ruleCss.width;
                var oriItemWidth=itemWidth;
                itemEles.each(function (index) {
                    if(typeof itemWidth==='string' && itemWidth.indexOf('%')!=-1){
                        itemWidth=eleWidth*parseFloat(itemWidth.replace('%',''))/100;
                    }else{
                        itemWidth=parseFloat(itemWidth);
                    }
                    var css={
                        top:index*itemHeight+'px',
                        left:eleWidth-itemWidth,
                        height:itemHeight+'px',
                        width:oriItemWidth
                    };
                    if($.fn.animateCss){
                        $(this).animateCss(css);
                    }else{
                        $(this).css(css);
                    }

                });
                ele.find('.ux-box-item-preview').css('right',itemWidth+'px');
                return;
            }
            ele.css('top',ele.attr('oritop'));
            var eleHeight=ele.height();
            var cols=rule.cols;
            var itemWidth=parseInt(eleWidth/cols);
            var itemHeight=eleHeight/Math.ceil(items.length/cols);
            var actWidth=itemWidth;

            itemEles.each(function (index) {
                var itemE=$(this);
                actWidth=itemWidth;
                if(index!==0 && (index+1)%cols===0){
                    actWidth=eleWidth-(cols-1)*actWidth;
                }
                var css={
                    left:index%cols*itemWidth+'px',
                    top:parseInt(index/cols)*itemHeight+'px',
                    width:actWidth+'px',
                    height:itemHeight+'px'
                };
                if($.fn.animateCss){
                    itemE.animateCss(css);
                }else{
                    itemE.css(css);
                }
            });
        };

        var itemsConatiner=$('<div/>').addClass('ux-box-layout');
        var titleContainer=$('<div/>').addClass('ux-box-layout-title');
        titleContainer.text(option.title);
        var contentContainer=$('<div/>').addClass('ux-box-layout-content');

        var itemE,item;
        for(var i=0;i<items.length;i++){
            item=items[i];
            if(!item.id){
                item.id='item_'+i;
            }
            var html='<table><tr><td>'+(item.name || item.summary)+'</td></tr></table>';
            itemE=$('<div/>').attr('itemid',item.id).addClass('ux-box-item').html(html);
            var itemEPreview=$('<div/>').addClass('ux-box-item-detail');
            var itemPreviewHeader=$('<header/>');
            var closeBtn=$('<div/>').addClass('ux-box-closebtn');

            var txt=$('<span/>').text(item.name || item.summary);
            itemPreviewHeader.append(closeBtn).append(txt);

            var itemPreviewContent=$('<div/>');
            itemPreviewContent.html(item.content);
            itemEPreview.append(itemPreviewHeader).append(itemPreviewContent);
            itemE.append(itemEPreview);
            contentContainer.append(itemE);

            itemEPreview.bind('touchmove mousemove',function(event){
                event.stopPropagation();
            });
        }
        itemsConatiner.append(titleContainer).append(contentContainer);
        ele.append(itemsConatiner);
        contentContainer.bind('click', function (e) {
            var target= $(e.target);
            var selector='.ux-box-item';
            var closeSelector='.ux-box-closebtn';
            var enableSelector='.ux-box-item-sel';
            var enableSelectorShow='.ux-box-item-sel-show';
            while(!target.is(closeSelector) && !target.is(selector) && !target.is('.ux-box-layout')){
                target=target.parent();
            }
            var boxPreview=getBoxItemPreview($(this).find('.ux-box-item-preview'));

            if(target.is(closeSelector)) {
                if(obj.state!=='normal'){


                    obj.state = 'normal';
                    var scrolltop=obj.element.attr('scrolltop');
                    obj.element.removeClass('full-screen');
                    if(scrolltop){
                        obj.element.parent()[0].scrollTop=scrolltop;
                    }
                    boxPreview.hide();
                    obj.resize();
                    $(this).find(selector+enableSelector).removeClass(enableSelector.replace('.',''))
                        .removeClass(enableSelectorShow.replace('.',''));
                }

                return;
            }
            if(target.is(selector)){
                var itemId=target.attr('itemid');
                var item;

                if(obj.state==='preview'){
                    if($(this).attr('itemid')===itemId){
                        return;
                    }
                    item=obj.getItemById(itemId);
                    if(!item){
                        return;
                    }
                    $(this).attr('itemid',itemId);
                    boxPreview.setTitle(item.summary || item.name);
                    boxPreview.setContent(item.content);
                    target.parent().find(selector+enableSelector).removeClass(enableSelector.replace('.',''))
                        .removeClass(enableSelectorShow.replace('.',''));
                    target.addClass(enableSelector.replace('.','')).addClass(enableSelector.replace('.',''));;
                    return;

                }

                item=obj.getItemById(itemId);
                if(!item){
                    return;
                }
                if(boxPreview.isNew){
                    $(this).append(boxPreview.container);
                }
                boxPreview.setTitle(item.summary || item.name);
                boxPreview.setContent(item.content);
                $(this).attr('itemid',itemId);
                setTimeout(function(){
                    boxPreview.show();
                },800);

                var scrolltop=obj.element.parent()[0].scrollTop;
                obj.element.attr('scrolltop',scrolltop);
                obj.element.addClass('full-screen');

                obj.state='preview';
                obj.resize();

                target.parent().find(selector+enableSelector).removeClass(enableSelector.replace('.',''))
                    .removeClass(enableSelectorShow.replace('.',''));
                target.addClass(enableSelector.replace('.',''));
                setTimeout(function () {
                    target.addClass(enableSelectorShow.replace('.',''));
                },100);

            }

        });
        obj.resize();
        return obj;
    };
})(jQuery);