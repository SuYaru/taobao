define(['config'],function(){
    require(['jquery'],function(){
        //1.tab切换
		var $btns=$('.notice_head li');
		var $contents=$('.notice_content ul');
		$btns.on('click',function(){
			$(this).children('a').addClass('selected').parent('li').siblings('li').children('a').removeClass('selected');//链式操作的核心是最开始的元素对象
            $contents.eq($(this).index()).addClass('show').siblings('ul').removeClass('show');
            
		});
    });
});