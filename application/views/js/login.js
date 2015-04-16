// JavaScript Document
function $(id){
	return document.getElementById(id);
}



window.onload = function(){
	var nmbox = $('login-username');
	var nmwarn = $('login-warn-name');
	var pwbox = $('login-password');
	var pwwarn = $('login-warn-pw');
	var chkbox = $('login-yzm');
	var chkwarn = $('login-warn-yzm');
	var lgbtn = $('lgbtn');
	var rgbtn = $('rgbtn');
	//var fdbtn = $('fdbtn');
	var chkid = $("chkid");



	show_vercode();



	nmbox.onkeydown = function(){
		if(event.keyCode == 13){
			pwbox.select();
		}
	};
	pwbox.onkeydown = function(){
		if(event.keyCode == 13){
			chkbox.select();
		}
	};
	chkbox.onkeydown = function(){
		if(event.keyCode == 13){
			 chklgall();
		}
	};



	lgbtn.onclick = chklgall;

	nmbox.onblur = chkname;
	pwbox.onblur = chkpw;
	chkbox.onblur = chkyzm;

	$('changea').onclick = show_vercode;


	function chkname(){				//check username
		if(nmbox.value == ''){
			nmwarn.innerHTML="请输入用户名!";
		}else if(nmbox.value.match(/^[a-zA-Z_]\w*$/) == null){
			nmwarn.innerHTML="请输入合法名称";
		}else{
			nmwarn.innerHTML="";
		}
	}
	function chkpw(){				//check password
		if(pwbox.value == ''){
			pwwarn.innerHTML="请输入密码!";
		}else{
			pwwarn.innerHTML="";
		}
	}
	function chkyzm(){				//check vercode
		if(chkbox.value == ''){
			chkwarn.innerHTML="请输入验证码";
		}else{
			chkwarn.innerHTML="";
		}
	}

	function show_vercode(){
		chkid.src='login/vercode_create';
	}



	function getCookie(c_name){
　　　　if (document.cookie.length>0){　　
　　　　　　c_start=document.cookie.indexOf(c_name + "=");
　　　　　　if (c_start!=-1){ 
　　　　　　　　c_start=c_start + c_name.length+1;
　　　　　　　　c_end=document.cookie.indexOf(";",c_start);
　　　　　　　　if (c_end==-1) c_end=document.cookie.length;
　　　　　　　　return unescape(document.cookie.substring(c_start,c_end));
　　　　　　} 
　　　　}
　　　　return ""
　　}


	function chklgall(){				//check all for the login buttun
		if(nmbox.value == ''){
			nmwarn.innerHTML="请输入用户名!";
		}else if(nmbox.value.match(/^[a-zA-Z_]\w*$/) == null){
			nmwarn.innerHTML="请输入合法名称";
		}else{
			nmwarn.innerHTML="";
		}
		if(pwbox.value == ''){
			pwwarn.innerHTML="请输入密码!";
		}else{
			pwwarn.innerHTML="";
		}
		if(chkbox.value == ''){
			chkwarn.innerHTML="请输入验证码";
		}else{
			chkwarn.innerHTML="";
		}

		if(nmbox.value == ''||nmbox.value.match(/^[a-zA-Z_]\w*$/) == null||pwbox.value == ''||chkbox.value == '')
			return false;

		if(getCookie("count") >= 5) {
			chkwarn.innerHTML="因为多次登陆失败，请6小时后再尝试登陆。";
			return false;
		}

		count = document.cookie.split(';')[0];
		if(count.split('=')[1] >= 3){
			chkwarn.innerHTML="因为您的非法操作，您将无法再执行登录操作";
		}
		$('regimg').style.visibility = "visible";
		var url = 'login/login_check';
		var data = '&name='+nmbox.value+'&pwd='+pwbox.value+'&vercode='+chkbox.value;
		xmlhttp.open("post", url, true);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4){
				if(xmlhttp.status == 200){
					return_msg = xmlhttp.responseText;
					if(return_msg == '-4'){
						chkwarn.innerHTML="输入非法，请正确填写。";
						nmbox.select();
					}else if(return_msg == '-3'){
						chkwarn.innerHTML="验证码已失效。";
					}else if(return_msg == '-2'){
						chkwarn.innerHTML="验证码错误，请重新输入验证码。";
					}else if(return_msg == '0'){
						chkwarn.innerHTML="您还没有激活，请先登录邮箱进行激活操作。";
					}else if(return_msg == '1'){
						chkwarn.innerHTML="用户名或密码输入错误，您还有4次机会";
						pwbox.select();
					}else if(return_msg == '2'){
						chkwarn.innerHTML="用户名或密码输入错误，您还有3次机会";
						pwbox.select();
					}else if(return_msg == '3'){
						chkwarn.innerHTML="用户名或密码输入错误，您还有2次机会";
						pwbox.select();
					}else if(return_msg == '4'){
						chkwarn.innerHTML="用户名或密码输入错误，您还有1次机会";
						pwbox.select();
					}else if(return_msg == '5'){
						chkwarn.innerHTML="因为多次登陆失败，请6小时后再尝试登陆。";    //re-vertify
						nmbox.select();
					}else if(return_msg == '6'){
						chkwarn.innerHTML="因为登录次数过多，您的帐号已被冻结，请联系管理员";
						nmbox.select();
					}else if(return_msg == '-1'){
						chkwarn.innerHTML="登录成功";
						location = 'main.php';
					}else{
//						$('login-warn-yzm').innerText(return_msg);    //Often go wrong with this code
					}
					$('regimg').style.visibility = "hidden";
					show_vercode();
				}
			}
		};
		xmlhttp.send(data);
	}


	//fdbtn.onclick = function(){
	//	fd  = window.open('found.html','found','width=300,height=200');
	//	fd.moveTo(screen.width/2,200);
	//};
	rgbtn.onclick = function(){
		open('register1.html','_parent','',false);
	}
};