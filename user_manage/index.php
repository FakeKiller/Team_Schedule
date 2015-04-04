<?php
	session_start();
	header('Content-Type:text/html;charset=gb2312');
	if(!empty($_SESSION['name']) and !is_null($_SESSION['name'])){
		header('location:http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['SCRIPT_NAME']).'main.php');
	}else{
		header('location:http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['SCRIPT_NAME']).'login.html');
	}
?>