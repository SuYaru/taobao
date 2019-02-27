define(['config'],function(){
    require(['jquery','jqcookie'],function(){
        //1.封装函数实现商品列表的创建
            // 拿到 cookie 中的信息，添加到
        function goodslist(tid,num){//tid：商品的编号，num:商品的数量
            $.ajax({
                url:"//10.31.162.31/1810Step02/taobao/php/guessLike.php",  // 拿到所有信息
                dataType:'json'
            }).done(function(data){
                $.each(data,function(index,value){
                    // console.log(parseInt(tid.substring(0,2)));
                    var tag=parseInt(tid.substring(2));
                    var arrpic=value.urls.split(',');
                    console.log(arrpic[tag]);
                    if(parseInt(tid.substring(0,2))==value.tid){//比较当前传入的sid和数据里面的sid比较，相同获取当前的整条数据
                        var clonegoodslist=$('.cart_line:hidden').clone(true,true);//深度克隆被隐藏的商品列表。
                        clonegoodslist.find('.cart-pic img').attr('src',arrpic[tag].replace(/_50/g,'_80').replace(/x50/g,'x80'));
                        clonegoodslist.find('.cart-title').html(value.title);
                        clonegoodslist.find('.cart-price').html(value.price);
                        clonegoodslist.find('.range_num').val(num);
                        clonegoodslist.find('.total_price').html((num*value.price).toFixed(2));
                        clonegoodslist.css('display','block');
                        $('.cartContent').append(clonegoodslist);//追加
                        // totalprice();
                    }
                })
            });
        }
        
        
        //2.通过cookie渲染商品列表
        if($.cookie('cooktid') && $.cookie('cookienum')){
            var tid=$.cookie('cooktid').split(',');//[2,1,3,4]
            var num=$.cookie('cookienum').split(',');//[2,1,3,4]
            
            $.each(tid,function(index,value){
                goodslist(tid[index],num[index]);
            });
            
        }

        //4.计算总的数量和总价
        /* function totalprice(){
            var allprice=0;
            var allcount=0;
            $('.goods-item:visible').each(function(){
                //console.log($('.goods-item:visible').length); // 2

                if($(this).find('input:checkbox').prop('checked')){
                    allprice+=parseFloat($(this).find('.b-sum strong').html());
                    allcount+=parseInt($(this).find('.quantity-form input').val());
                }
            });
            // debugger;
            $('.totalprice').html('￥' + allprice);
            $('.amount-sum em').html(allcount);
        } */
    });
});