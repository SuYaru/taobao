;(function($) {
	$.fn.extend({
		tab: function(options) {	// 此处 tab 是函数名 
			settings = { //默认参数
				activeClassName: 'on',
                btns: '.direct_1 li',
                arrow:'.lunBo_1 .direct_2',
                left:'.lunBo_1 .direct_2 direct_2_left',
                right:'.lunBo_1 .direct_2 direct_2_right',
				contents: '.lunBo_1>ul>li',
				changeClass: 'show',
				eventtype: 'click',
				autoplay:true
			}

			
			var changeoptions = $.extend(true, settings, options);//配置参数覆盖默认参数
			$(this).each(function() {
				var _this = $(this);
				var timer = null;
				if(changeoptions.eventtype == 'mouseover' || changeoptions.eventtype != 'click') {
					_this.find(changeoptions.btns).on('mouseover', function() {
						timer = setTimeout(() => {
							$(this).addClass(changeoptions.activeClassName).siblings().removeClass(changeoptions.activeClassName);
							_this.find(changeoptions.contents).eq($(this).index()).addClass(changeoptions.changeClass).siblings().removeClass(changeoptions.changeClass);
						}, 500);
					});
					_this.find(changeoptions.btns).on('mouseout', function() {
						clearTimeout(timer);
					});
				} else {
					_this.find(changeoptions.btns).on(changeoptions.eventtype, function() {
						$(this).addClass(changeoptions.activeClassName).siblings().removeClass(changeoptions.activeClassName);
						_this.find(changeoptions.contents).eq($(this).index()).addClass(changeoptions.changeClass).siblings().removeClass(changeoptions.changeClass);
					});
				}
			});
		}
	});
})(jQuery);