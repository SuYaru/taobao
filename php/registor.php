<?php
	require "conn.php";

	//验证手机号是否在数据库中存在。
	if(isset($_POST['loginname']) || isset($_POST['submit'])){
		$loginname=$_POST['loginname'];
		$result=mysql_query("select * from user where loginname='$loginname'");
		if(mysql_fetch_array($result)){// 登录名存在
			echo true;
		}else{
			echo false;
		}
	}else{
		exit('非法操作');
	}

	if(isset($_POST['submit'])){
		
		$user=$_POST['username'];
		$password=md5($_POST['first_password']);
		$loginname=$_POST['loginname'];
		
		$query="insert user(username,password,loginname) values('$user','$password','$loginname')";
		mysql_query($query);
		header('location:http://10.31.162.31/1810Step02/taobao/src/login.html');
	}
	
		
?>