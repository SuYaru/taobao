//require.config({  })   配置模块

require.config({
	baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//基路径，模块的共有的路径。
	paths:{//引入模块的地址，文件不能添加扩展名
		'jquery':'jquery/1.12.4/jquery',
		'jqcookie':'jquery-cookie/1.4.1/jquery.cookie',
		'jqlazy':'jquery.lazyload/1.9.1/jquery.lazyload.min',
		'jqvalidate':'jquery-validate/1.19.0/jquery.validate.min',
		//'messages_zh':'jquery-validate/1.19.0/localization/messages_zh.min'
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery','jqcookie']//deps 为数组,表示其依赖的库,
	}
});
