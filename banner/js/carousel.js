/* 
* @Author: Marte
* @Date:   2017-06-29 09:50:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-29 14:30:04
*/

;(function($){
    var IndexBanner = 'IndexBanner';
    var config = {
        banner : '.home-banner',
        bannerUl : '.home-banner > ul',
        bannerLi : '.home-banner > ul > li',
        btn : {
            left : '.home-btn > a:first',
            right : '.home-btn > a:last'
        },
        listBtn : '.list-btn',
        listSpan : '.list-btn > span'
    };
    var number = 1;
    window[IndexBanner] = function(setConfig){
        if(typeof(setConfig) == 'object'){
            for(var n in setConfig){
                config[n] = setConfig[n];
            }
        }
        
        var _this = config;
        var banner = $(_this.banner),
            bannerUl = $(_this.bannerUl),
            bannerLi = $(_this.bannerLi),
            left = $(_this.btn.left),
            right = $(_this.btn.right),
            list = $(_this.listBtn),
            span = $(_this.listSpan);
        var index = 0;
        _this.initBanner = function(){
            var first = bannerLi.eq(0).clone(),
                last = bannerLi.eq(bannerLi.length - 1).clone();
            var html = '';
            bannerUl.append(first);
            bannerUl.prepend(last);
            for(var i=0;i<bannerLi.length;i++){
                html += "<span></span>";
            }
            list.append(html);
            span = $(_this.listSpan);
            span.eq(0).addClass('active');
        }();

        /* 监听右边点击按钮 */
        right.on('click',function(){
            number ++;
            index ++;
            _this.run();
            _this.bannerList();
        });

        /* 监听左边点击按钮 */
        left.on('click',function(){
            number --;
            index --;
            _this.run();
            _this.bannerList();
        });

        /* 动画执行 */
        var bannerLen = 0;
        _this.run = function(){
            bannerLen = $(_this.bannerLi).length;
            bannerUl.stop(true,true).animate({ 'marginLeft' : -number+'00%' },350,function(){
                if( number >= bannerLen-1 ){
                    bannerUl.css({'marginLeft': '-100%'});
                    number = 1;
                }else if( number < 1 ){
                    bannerUl.css({'marginLeft': -(bannerLen-2)+'00%'});
                    number = bannerLen-2;
                }
            });
        };

        /* 小圆点列表 */
        _this.bannerList = function(){
            if( number > (bannerLen-2) ){
                index = 0;
            }
            console.log(number, bannerLen);
            span.eq(index).addClass('active').siblings().removeClass('active');
        }
    }
})(jQuery);