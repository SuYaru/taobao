define(['config'],function(){
    require(['jquery','jqvalidate'],function(){
        

       // 1、注册表单提交数据库
        $('#login').on('click',function(){
            $.ajax({
                type:'post',
                url:'http://10.31.162.31/1810Step02/taobao/php/login.php',
                data:{
                    username:$('#username').val(),
                    password:$('#password').val()
                },
            }).done(function(data){
                if(!data){
                    $('.submit_content').append('<label id="username-error" class="error" for="username">输入的用户名/ 密码有误</label>');
                    // $('#username').val("");
                    // $('#password').val("");
                }else{
                    location.href="http://10.31.162.31/1810Step02/taobao/src/index.html";
                }
            });    
            
        });

        //3、点击时 外加边框样式
        $('.username,.password').on('click',function(){
            $(this).addClass('out-focus').siblings('div').removeClass('out-focus');
        })

        // 2、登陆表单验证
        $(".loginForm").validate({
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true,
                }
            },
            messages: {
                username: {
                    required: "请输入登录名/用户名/手机号",
                },
                password: {
                    required: "请输入登陆密码",
                }
            },
        });
    });
});