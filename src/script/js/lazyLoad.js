define(['config'],function(){
    require(['jquery'],function(){
        require(['jqlazy'],function(){
            $('img').addClass("lazy");
            $('img').attr("data-original",function(){
                return $(this).attr("src");
            });
            $("img.lazy").lazyload({
                effect:"fadeIn"
            });

        });
    });
});