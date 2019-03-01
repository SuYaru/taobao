
define(['config'],function(){
    require(['jquery','jqvalidate'],function(){
        ;(function($){
            // 页面基本操作
            $('.agreeWith').on('click',function(){  // 同意 后才能进入注册页面
                $('.registAgree').css({'display':'none'});
            });
            $('.footer').load('footer.html');   // 导入头部和尾部
            $('.top').load('top.html');

            // 1、设置用户名
            $(".setUsername").validate({
                rules: {
                    user_mobile:{
                        required: true,
                        minlength:11,
                        maxlength:11,
                        isMobile:true
                    }
                },
                messages: {
                    user_mobile: {
                        required: "请输入正确的手机号",
                        minlength:"请填写11位的手机号",
                        maxlength:"请填写11位的手机号",
                        isMobile:"请填写正确的手机号码"
                    }
                },
                // showErrors 是默认的错误提示方法，这里重写
                showErrors:function(errorMap, errorList){
                    // 遍历错误列表
                    for(var obj in errorMap) {
                        // 判定为错误时，obj 只是验证 Input 框的 id  名
                        // 因此遍历到上级父元素，再返回来拿到 label 标签
                        // 自定义错误提示效果, 成功时添加 success 类
                        // 如果重新修改为错误类时，去掉原有的类标签（确保不冲突）
                        $('#'+obj).parent().find('label.success').remove();
                    }
                    // 此处注意，一定要调用默认方法，这样保证提示消息的默认效果
                    this.defaultShowErrors();
                },
                // 默认成功时的方法
                success: function(succ,element) {
                    if(element.name == "user_mobile") {
                        // 加入 勾选字体
                        succ.text("手机号验证通过").append(' <span class="nc_iconfont mobilePass" class=""></span>');
                        $(succ).addClass('success');
                    }
                }
                
            });

            // 自定义手机号验证方法
            jQuery.validator.addMethod("isMobile", function(value, element) {  
                var length = value.length;  
                var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;  
                return this.optional(element) || (length == 11 && mobile.test(value));  
            }, "请正确填写手机号码");  

            // 2、实现验证框的拖拽
            $('.going').on('mousedown',function(ev){     
                var x=ev.offsetX;
                var y=ev.offsetY;
                $(document).on('mousemove',function(e){
                    var l=e.clientX-x-$('.check').offset().left;
                    if(l<0){
                        l=0;
                    }else if(l>$('.check').width()-$('.going').width()){
                        l=$('.check').width()-$('.going').width();
                        $('.correct').css({'display':'block','top':'0px','left':l});
                        $(this).css({'display':'none'});
                        $('.check_bk').html("验证通过");
                    }
                    $('.check_bk').css({width:l});
                    $('.going').css({left:l});
                });
                $(document).on('mouseup',function(){
                    $(document).off();
                });
            });

            // 3、"设置用户名" 下一步
            $('.nextStep_setUsername').on('click',function(ev){
                $('.setUsername').removeClass('show').siblings('.countMessage').addClass('show');
                $('.registTag li').eq($('.countMessage').index()).addClass('active').siblings().removeClass('active');
                $('.name_target').val($('#user_mobile').val());
                ev.preventDefault();
            })


            // 4、表单2 
             $(".countMessage").validate({
                rules: {
                    first_password: {
                        required: true,
                        passwordCheck:true,
                        minlength: 5
                    },
                    confir_password: {
                        required: true,
                        equalTo: "#first_password"
                    },
                    loginname:{
                        required:true,
                        checkloginname:true,
                        minlength: 5
                    }
                },
                messages: {
                    first_password: {
                        required: "请输入密码",
                        minlength: "密码长度不能小于 5 个数字"
                    },
                    confir_password: {
                        required: "确认密码是必填的",
                        equalTo:"确认密码与密码不同"
                    },
                    loginname:{
                        required:"请输入登录名",
                        //checkloginname:"该用户名已存在",
                        minlength:"登录名长度应大于5"
                    }
                },
                // showErrors 是默认的错误提示方法，这里重写
                showErrors:function(errorMap, errorList){
                    // 遍历错误列表
                    // console.log(element.name);
                    for(var obj in errorMap) {
                        // 判定为错误时，obj 只是验证 Input 框的 id  名
                        // 因此遍历到上级父元素，再返回来拿到 label 标签
                        // 自定义错误提示效果, 成功时添加 success 类
                        // 如果重新修改为错误类时，去掉原有的类标签（确保不冲突）
                        $('#'+obj).parent().find('label.success').remove();
                    }
                    // 此处注意，一定要调用默认方法，这样保证提示消息的默认效果
                    this.defaultShowErrors();
                },
                // 默认成功时的方法
                success: function(succ,element) {
                    if(element.name == "first_password") {
                        // 加入 勾选字体
                        succ.text("密码验证通过").append(' <span class="nc_iconfont mobilePass" class=""></span>');
                        $(succ).addClass('success');
                    }
                    if(element.name == "confir_password") {
                        // 加入 勾选字体
                        succ.text("确认密码验证通过").append(' <span class="nc_iconfont mobilePass" class=""></span>');
                        $(succ).addClass('success');
                    }
                    console.log(element.name);
                    if(element.name == "loginname") {
                        // 加入 勾选字体
                        succ.text("登录名验证通过").append(' <span class="nc_iconfont mobilePass" class=""></span>');
                        $(succ).addClass('success');
                    }
                }
            });
            // 验证密码 由数字组成，长度大于5，若要改成"数字、字母、下划线 "的组合，修改 正则表达式即可
           $.validator.addMethod("passwordCheck",function(value, element){  
                    var returnVal = false;  
                    var chrnum = /^[0-9]*$/;
                    console.log(this.optional(element) || (chrnum.test(value)));
                    return this.optional(element) || (chrnum.test(value));
            },"必须填入数字"); 

            $.validator.addMethod("checkloginname",function(value, element){  
                //return true;
                var flag = true;
                $.ajax({
                    url:"http://10.31.162.31/1810Step02/taobao/php/exist.php",
                    type:"post",
                    data:{
                        loginname:$('#loginname').val()
                    },
                    async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
                    dataType:"json",
                    success:function(result) {
                        if (result == 1) {  // "1" 表示重复的用户名存在
                            flag=false;
                        }
                    }
                });
                return flag;
            },"登录名重复"); 
        })($);
    });
});