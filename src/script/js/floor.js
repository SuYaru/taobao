define(['config'],function(){
    require(['jquery'],function(){
        $(window).on('scroll',function(){
            // 获取滚动距离
            var $top=$(window).scrollTop();
            $('.louceng').each(function(index,value){
                var $loucengTop=$(value).offset().top+$(value).height()/2;
                if($loucengTop>$top){
                    $(".fixed_left li").removeClass('bk_color');
                    $('.fixed_left li').eq(index).addClass('bk_color');
                    $('.fixed_left li').eq(index).children('a').removeClass('fixed_'+($(this).index()+1));
                    recover(index);
                    return false;
                }
            });

        });

        $('.fixed_left li').not('.last').on('click',function(){
            $(this).addClass('bk_color').siblings('li').removeClass('bk_color');
            $(this).children('a').removeClass('fixed_'+$(this).index());
            recover($(this).index);
            var $top=$('.louceng').eq($(this).index()).offset().top;
            $('html,body').animate({
                scrollTop:$top
            });
        });
        $('.last').on('click',function(){
            $('html,body').animate({
                scrollTop:0
            });
        });

        function recover(ind){
            var $target=$('.fixed_left li').eq(ind);
            $('.fixed_left li').not($target).siblings().each(function(index,value){
                $('.fixed_left li').eq(index).children('a').addClass('fixed_'+(index+1));
            });
            
        }
    });
})