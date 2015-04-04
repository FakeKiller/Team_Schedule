<?php
	include_once 'conn/conn.php';
	$reback = '0';
	$name = $_GET['foundname'];
	$question = $_GET['question'];
	$answer = $_GET['answer'];
	$password = $_GET['password'];

	$sql = "select * from tb_member where name = '".$name."' and question = '".$question."' and answer = '".$answer."'";
	$num = $conne->getRowsNum($sql);
	if($num != ''){
		$sql = "update tb_member set password = '".md5($password)."' where name = '".$name."' and question = '".$question."' and answer = '".$answer."'";
		$tmpnum = $conne->uidRst($sql);
		if($tmpnum >= 1)
			$reback = '1';
	}
	echo $reback;
?>