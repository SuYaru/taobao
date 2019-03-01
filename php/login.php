<?php
	require "conn.php";
	
	if(isset($_POST['username']) && isset($_POST['password'])){
		$username=$_POST['username'];
		$password=md5($_POST['password']);
		
		$result=mysql_query("select * from user where (username='$username' or loginname='$username') and password='$password'");
		
		if(mysql_fetch_array($result,MYSQL_ASSOC)){
			echo true;
		}else{
			echo false;
		}
		
	}
	
?>