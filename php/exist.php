<?php  
	
	include "conn.php";

    $loginname=$_POST['loginname'];
	$result=mysql_query("select * from user where loginname='$loginname'");
	
	if(mysql_fetch_array($result)){
        echo true;
    }else{
        echo false;
    }

?>