
define(['config'],function(){
    require(['jquery'],function(){
        $('.not_agree').on('click',function(){
            history.back(-1);
        })
        $('.agreeWith').on('click',function(){
            $('.registAgree').css({'display':'none'});
        })
        $('.going').on('click',function(){
            $('.correct').css({'display':'block','top':'0px'});
            $(this).css({'display':'none'});
        });
        $('.footer').load('footer.html');
        $('.top').load('top.html');
    });
});