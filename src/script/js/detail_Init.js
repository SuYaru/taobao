define(['config'],function(){
    require(['jquery'],function(){
        // 2、首页跳转后，获取地址信息
        //		首页跳转以后，匹配后台传入的数据，渲染页面
        var $tid=location.search.substring(1).split('=')[1];
        $.ajax({
            url:'//10.31.162.31/1810Step02/taobao/php/detail.php',
            data:{
                tid:$tid
            },
            dataType:'json'
        }).done(function(data){
            //console.log(data);
            /* 处理地址，拿到大图片 */
            var bigSize=data.url.replace(/_200/g,'_400').replace(/x200/g,'x400');
            var bkSize=data.url.replace(/_200/g,'_800').replace(/x200/g,'x800');

            $('.now_small img').attr('src',bigSize);
            $('.now_small img').attr('tid',$tid);
            $('.now_big img').attr('src',bkSize);
            $('.section_1_right h3').html(data.title);
            $('.tb_price').html(`￥${data.price}`);

            /* 自定义属性，表明是该类下的 第几个产品 */
            $('.now_small img').attr('kind',0);
            $('.now_big img').attr('kind',0);

            var arrpic=data.urls.split(',');
            var strhtml=''; /* 产品小图 */
            var strhtml01='<span class="title">颜色分类</span>'; /* 颜色分类小图 */
            var strhtml02='';    /* 右侧图 */
            $.each(arrpic,function(index,value){
                strhtml+=
                `<a href="javacript:;">
                    <img src='${value}' alt="" kind=${index}>
                </a>`;
                strhtml01+=
                `<i>
                    <img src='${value.replace(/_50/g,'_30').replace(/x50/g,'x30')}' alt="" kind=${index}>
                </i>`;

                strhtml02+=
                `<li>
                    <a href="javascript:;">
                        <img src="${value.replace(/_50/g,'_300').replace(/x50/g,'x300')}" alt="" kind=${index}>
                    </a>
                    <div class="more_goods">
                        <span>￥</span>
                        <span>${data.price}</span>
                    </div>
                </li>`;

            });
            $('.chooseImg ul').html(strhtml);
            $('.divice_color').html(strhtml01);
            $('.section_2 ul').html(strhtml02);

        });
            
        /* 下方和 颜色选择切换 中间的大图 ； 尺寸选择 */
        $('.chooseImg,.divice_color').on('click',function(ev){
            var ev=ev || window.event;
            var target=ev.target || ev.srcElement;

            if(target.nodeName=='IMG'){
                var newSrc=$(target).attr('src').replace(/_30|_50/g,'_400').replace(/x30|x50/g,'x400');
                var newSrc01=$(target).attr('src').replace(/_30|_50/g,'_800').replace(/x30|x50/g,'x800');
                $('.now_small img').attr('src',newSrc);
                $('.now_small img').attr('kind',$(target).attr('kind'));
                $('.now_big img').attr('src',newSrc01);
                if($(target).parent('a')){
                    $(target).parent().addClass('sizeOn').siblings().removeClass('sizeOn');
                }else{
                    $(target).addClass('sizeOn').siblings().removeClass('sizeOn');
                }
            }
        }); 
        $('.size_item i,.huabeis i').on('click',function(){
            $(this).addClass('sizeOn').siblings().removeClass('sizeOn');
        });
			
        /* 放大镜效果 */
        $('.now_small').on('mouseover',function(){
            var ratio=$('.now_small').width()/800;
            var ratioReverse=800/$('.now_small').width();
            /* 直接设定宽高，左右大图的尺寸都一样 */
            $('.ns').css({width:ratio*$('.now_small').width(),height:ratio*$('.now_small').height()});
            $('.ns').show();
            $('.now_big').show();

            $(document).on('mousemove',function(ev){
                // offsetLeft 适用于 margin 和 padding 
                var l=ev.clientX-$('.nowImg').offset().left-$('.ns').width()/2;
                var t=ev.clientY-$('.nowImg').offset().top-$('.ns').height()/2;
                if(l<=0){
                    l=0;
                }else if(l>=$('.now_small').width()-$('.ns').width()){
                    l=$('.now_small').width()-$('.ns').width();
                }
                if(t<=0){
                    t=0;
                }else if(t>=$('.now_small').height()-$('.ns').height()){
                    t=$('.now_small').height()-$('.ns').height();
                }
                $('.ns').css({left:l});
                $('.ns').css({top:t});
                $('.now_big img').css({left:-l*ratioReverse});
                $('.now_big img').css({top:-t*ratioReverse});
            });
        });
        $('.now_small').on('mouseout',function(){
            $('.ns').hide();
            $('.now_big').hide();
        });
			
            
        /* 点击数量增加：相应改变中间数量的内容 */
        $('.tb-reduce').on('click',function(){
            var temp=parseInt($('.range_num').attr('value'))-1;
            console.log(typeof $('.range_num').attr('value'));
            if(temp>0){
                $('.range_num').attr('value',temp);
            }
        });
		$('.tb-increase').on('click',function(){
            var temp=parseInt($('.range_num').attr('value'))+1;
            console.log(typeof $('.range_num').attr('value'));
            if(temp>0 && temp<999){
                $('.range_num').attr('value',temp);
            }          
        });
    });
});