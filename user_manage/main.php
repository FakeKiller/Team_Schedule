<?php
	session_start();
	if(empty($_COOKIE['name']) or is_null($_COOKIE['name']))
		header('location:http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['SCRIPT_NAME']).'login.html');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>��¼�ɹ�</title>
</head>
<body>
<?php
	echo '�û�����'.$_COOKIE['name']; 
	echo '�ȼ���'.$_COOKIE['level'];
	echo '<a href="logout.php">ע����¼</a> <br />';
?>
</body>
</html>