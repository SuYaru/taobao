<?php  
	
	include "conn.php";
	
	$tid=$_GET['tid'];
	
	$result=mysql_query("select * from picdata where tid=$tid ");
	
	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($wronglist);

?>