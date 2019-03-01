define(['config'],function(){
    require(['jquery','jqvalidate'],function(){
        

       
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
                    alert('用户名或者密码错误');
                    $('#username').val("");
                    $('#password').val("");
                }else{
                    location.href="http://10.31.162.31/1810Step02/taobao/src/index.html";
                }
            });    
            
        });

        // $('.footer').load('footer.html');
    });
});