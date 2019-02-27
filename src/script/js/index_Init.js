define(['config'],function(){
    require(['jquery'],function(){
		/* 自动填充 "猜你喜欢" 内容 */
        $.ajax({
			url:'//10.31.162.31/1810Step02/taobao/php/guessLike.php',
			dataType:'json'
		}).done(function(data){
			var strhtml='';
			$.each(data,function(index,value){
				strhtml+=`<div class="guessLike_item">
						<a href="details.html?tid=${value.tid}" target="_blank">
							<img src="${value.url}" alt="">
							<p class="guess_descrip">${value.title}</p>
							<p class="guess_price clearFix">
								￥<span class="guess_price_now">${value.price}</span>
								<span class="guess_num ">销量：${value.sellnum}</span>
							</p>
						</a>
						<a href="javascript:;" class="findSimilar">
							<p class="similar">
								<i class="tb-ifont love"></i>
								找相似
							</p>
							<p class="findMore">
								发现更多相似的宝贝
								<span class="tb-ifont"></span>
							</p>
						</a>
					</div>`;
			});
			$('.guessLike_content').html(strhtml);
        });
    });
});