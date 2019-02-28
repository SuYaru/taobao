define(['config'],function(){
    require(['jquery','jqcookie'],function(){
        ;(function($){
            $('.top').load('top.html'); // 主页填充
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
                        if(parseInt(tid.substring(0,2))==value.tid){//比较当前传入的sid和数据里面的sid比较，相同获取当前的整条数据
                            var clonegoodslist=$('.cart_line:hidden').clone(true,true);//深度克隆被隐藏的商品列表。
                            clonegoodslist.find('.cart-pic img').attr('src',arrpic[tag].replace(/_50/g,'_80').replace(/x50/g,'x80'));
                            clonegoodslist.find('.cart-title').html(value.title);
                            clonegoodslist.find('.cart-price').html(value.price);
                            clonegoodslist.find('.range_num').val(num);
                            clonegoodslist.find('.itemNum').html((num*value.price).toFixed(2));
                            clonegoodslist.css('display','block');
                            clonegoodslist.attr('index',tid);
                            $('.cartContent').append(clonegoodslist);//追加
                            totalprice();
                        }
                    })
                    countAllnum();
                });
            }
            // 计算当前购物车里有多少商品
            function countAllnum(){
                var count=$('.cart_line:visible').length;
                $('.all_num').html(count);
                if(count==0){
                    $('.empty_content').show();
                    $('.cart_content').hide();
                }else{
                    $('.empty_content').hide();
                    $('.cart_content').show();
                }
            }

            //2.通过cookie渲染商品列表
            if($.cookie('cooktid') && $.cookie('cookienum')){
                var tid=$.cookie('cooktid').split(',');//[2,1,3,4]
                var num=$.cookie('cookienum').split(',');//[2,1,3,4]
                
                $.each(tid,function(index,value){
                    goodslist(tid[index],num[index]);
                });
                
            }
            // 3、+ - 改变商品的数量
            $('.tb-reduce').on('click',function(){
                // 找到当前商品的 数量
                var currentValue=parseInt($(this).parents('.cart_item').find('.range_num').val());
                currentValue--;

                $(this).parents('.cart_item').find('.range_num').val(currentValue>0?currentValue:1);
                $(this).parents('.cart_line').find('.itemNum').html(currentValue*parseInt($(this).parents('.cart_line').find('.cart-price').html()));
                totalprice();
            });
            $('.tb-increase').on('click',function(){
                // 找到当前商品的 数量
                var currentValue=parseInt($(this).parents('.cart_item').find('.range_num').val());
                currentValue++;

                $(this).parents('.cart_item').find('.range_num').val(currentValue>99?99:currentValue);
                $(this).parents('.cart_line').find('.itemNum').html(currentValue*parseInt($(this).parents('.cart_line').find('.cart-price').html()));
                totalprice();
            });
            //4.计算总的数量和总价
            function totalprice(){
                var allprice=0;
                var allcount=0;
                $('.cart_line:visible').each(function(){
                    if($(this).find('input:checkbox').prop('checked')){
                        allprice+=parseFloat($(this).find('.itemNum').html());
                        allcount+=parseInt($(this).find('.range_num').val());
                    }
                });
                $('.total_price').html(allprice);
                $('.select_num').html(allcount);
            }

                //5.全选按钮
            $('.select_all').on('change',function(){
                // 当某一个 “全选”按钮 选中时，勾选下面所有 box 中的勾选按钮
                $('.cart_line:visible').find('input:checkbox').prop('checked',$(this).prop('checked'));
                // 有其他全选按钮，也被选中
                $('.select_all').prop('checked',$(this).prop('checked'));
                totalprice();
            });
            
            var $inputs=$('.cart_line:visible').find('input:checkbox');
            $('.cart_line').on('input',$inputs,function(){//事件委托
                // input : 后可跟 type 类型和 状态: 选中/ 可见 
                if($('.cart_line:visible').find('input:checkbox').size()==$('.cart_line:visible').find('input:checked').length){
                    $('.select_all').prop('checked',true);
                }else{
                    $('.select_all').prop('checked',false);
                }
                totalprice();
            });

            //6、删除
            $('.delete_item').on('click',function(){
                $('.confirmTab').show();
                $('.sure').attr('tag',$(this).parents('.cart_line').attr('index'));
            });

            // 选中删除的内容
            $('.delete_items').on('click',function(){
                var $tags=[];
                var $elements=$('.cart_line:visible').find('input:checked');
                if($elements.length==0){
                    $('.pleaseChoose').show();
                }else{
                    $('.confirmTab').show();
                    $elements.each(function(index,value){
                        $tags.push($(value).parents('.cart_line').attr('index'));
                    });
                }
                $('.sure').attr('tag',$tags.toString());

            });

            /* 7、弹框操作 */
            $('.close,.close_head').on('click',function(){
                $(this).parents('.confirmTab').hide();
            });
            $('.close_choose').on('click',function(){
                $(this).parents('.pleaseChoose').hide();
            })
            // 确认删除商品
            $('.sure').on('click',function(){
                var $tags=$(this).attr('tag').split(',');
                $($tags).each(function(index,value){
                    $('.cartContent').children('.cart_line:visible').each(function(ind,val){
                        if($(val).attr('index')==value){
                            deleteCookie($(val).attr('index'));    // 删除cookie 
                            $(val).remove();                       // 删除当前商品内容
                        }
                    });
                });
                $('.confirmTab').hide();  
                countAllnum();
            });

            // 清除选中的cookie
            function deleteCookie(index){
                //将cookie值取出，转换成数组。
                var tidarr=[];//商品的编号
                var numarr=[];//商品的数量
                var tidarr=$.cookie('cooktid').split(',');
                var numarr=$.cookie('cookienum').split(',');
                
                var $ind=$.inArray(index,tidarr);
                tidarr.splice($ind,1);
                numarr.splice($ind,1);
                $.cookie('cooktid',tidarr.toString(),7);
                $.cookie('cookienum',numarr.toString(),7);
            }

        })($);
    });
});