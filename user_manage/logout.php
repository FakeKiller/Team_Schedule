<?php
session_start();
session_unset();
session_destroy();
setcookie('name',"",time()-3600,'/');
setcookie('level',"",time()-3600,'/');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注销成功</title>
</head>
<body>
<script type="text/javascript">
	alert("注销成功！");
	open('index.php','_parent','',false);
</script>
</body>
</html>

