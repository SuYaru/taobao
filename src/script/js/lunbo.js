
;(function($) {
	$.fn.extend({
		lunbo: function(options) {	// 此处 tab 是函数名 
			settings = { //默认参数
				activeClassName: 'on',
				btns: '.direct_1 li',		// 下方或上面的 可点击按钮
				box:'.lunBo_1>ul',
				arrow:'.lunBo_1 .direct_2',
				left:'.lunBo_1 .direct_2 .s-prev',
				right:'.lunBo_1 .direct_2 .s-next',
				contents: '.lunBo_1>ul li',
				changeClass: 'show',
				eventtype: 'click',
				num:0,
				autoplay:true
			}
			var timer=null;
			var changeoptions = $.extend(true, settings, options);//配置参数覆盖默认参数

			var childLength=$(changeoptions.contents).length;

			var width=$(changeoptions.contents).get(0).offsetWidth;
			// console.log($(changeoptions.contents)[childLength-1].innerHTML);

			/* 在box 中添加 头 和 尾，头尾重复 */
			$(changeoptions.box).append('<li>'+$(changeoptions.contents)[0].innerHTML+'</li>');
			$(changeoptions.box).prepend('<li>'+$(changeoptions.contents)[childLength-1].innerHTML+'</li>');
			$(changeoptions.box).css({left:-width});	
			
			$(changeoptions.box).css({'width':$(changeoptions.contents).length*width});
			/* 滑入后，取消定时器 */
			$(this).hover(function(){
				$(changeoptions.arrow).show();
				clearInterval(timer);
			},function(){
				$(changeoptions.arrow).hide();
				timer=setInterval(function(){
					$(changeoptions.right).click();
				},1000);
			});
			//  初始启动
			timer=setInterval(function(){
				$(changeoptions.right).click();
			},1000);
			
			$(changeoptions.btns).hover(function(){
				changeoptions.num=$(this).index();//当前的索引
				timer=setTimeout(function(){
					change();
				},400)
			},function(){
				clearTimeout(timer);
			});
			$(changeoptions.right).on('click',function(){
				changeoptions.num++;
				if(changeoptions.num==1 && isLast()){
					changeoptions.num--;
					$(changeoptions.box).css({left:-width});
				}else if(changeoptions.num==$(changeoptions.btns).length){
					$(changeoptions.box).animate({
						left:parseInt($(changeoptions.box).css("left")) - width
					})
					changeoptions.num=0;
				}else{
					$(changeoptions.box).animate({
						left:parseInt($(changeoptions.box).css("left")) - width
					})
				}
				change();

			});
			$(changeoptions.left).on('click',function(){
				changeoptions.num--;
				if(changeoptions.num==-2 && isLast()){
					$(changeoptions.box).css({left:-width*childLength});
					changeoptions.num=childLength-1;					
				}else{
					$(changeoptions.box).animate({
						left:parseInt($(changeoptions.box).css("left"))+width				
					});
				}
				
				change();
			});
			
			function change(){
				$(changeoptions.btns).eq(changeoptions.num).addClass('on').siblings('li').removeClass('on');
			}
			function isLast(){
				var left=Math.abs(parseInt($(changeoptions.box).css("left")));
				if(width*(childLength+1)==left || left ==0 ){
					return true;
				}else{
					// debugger;
					return false;
				}
			}
		}
	});
})(jQuery);


