//点击加入购物车按钮。
define(['config'],function(){
    require(['jquery','jqcookie'],function($){
        class initCart{
            constructor(){
                this.$addTocart=$('.buy_02');
                this.$buyNow=$('.buy_01');
                this.$num=$('.range_num');
                this.$subId=$('.now_small img');
            }
            init(){
                var _this=this;
                var sidarr=[];//商品的编号
                var numarr=[];//商品的数量
                function cookieArray(){
                    if($.cookie('cooktid') && $.cookie('cookienum')){
                        sidarr=$.cookie('cooktid').split(',');
                        numarr=$.cookie('cookienum').split(',');
                    }
                }
                // console.log($(this.$addTocart));
                $(this.$addTocart).on('click',function(){
                    cookieArray();  // 将cookie 中的数据存入数组
                    var $tid=parseInt($(_this.$subId).attr('tid'));   // 商品编号
                    var $kind=parseInt($(_this.$subId).attr('kind')); // 细分种类编号

                    $tid=$tid<100?'0'+$tid:$tid;        // 作为编码
                    $kind=$kind<100?'0'+$kind:$kind;

                    if($.inArray($tid+$kind,sidarr)==-1){//不存在
                        sidarr.push($tid+$kind);
                        numarr.push($(_this.$num).val());
                        $.cookie('cooktid',sidarr.toString(),7);
                        $.cookie('cookienum',numarr.toString(),7);
                    }else{//存在
                        var newnum=parseInt($(_this.$num).val())+parseInt(numarr[$.inArray($tid+$kind,sidarr)]);
                        numarr[$.inArray($tid+$kind,sidarr)]=newnum;
                        $.cookie('cookienum',numarr.toString(),7);
                    }
                });
            }
        }
        new initCart().init();
    });
});