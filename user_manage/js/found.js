// JavaScript Document
function $(id){
	return document.getElementById(id);
}
window.onload = function(){
	$('foundname').focus();
	var cname='',cpwd1='',cpwd2='';

	//验证用户名
	$('foundname').onkeyup = function (){
		name = $('foundname').value;
		if(name.match(/^[a-zA-Z_]*/) == ''){
			$('nmtipdiv').innerHTML = '<font color=red>必须以字母或下划线开头</font>';
			cname = '';
		}else if(name.length < 4){
			$('nmtipdiv').innerHTML = '<font color=red>注册名称必须大于等于4位</font>';
			cname = '';
		}else{
			$('nmtipdiv').innerHTML = '<font color=green>注册名称符合标准</font>';
			cname = 'yes';
		}
		chkfnd();
	}
	//验证密码
	$('fdpassword').onkeyup = function(){
		pwd = $('fdpassword').value;
		pwd2 = $('fdpassword2').value;
		if(pwd.length < 6){
			$('pw1tipdiv').innerHTML = '<font color=red>密码长度最少需要6位</font>';
			cpwd1 = '';
		}else if(pwd.length >= 6 && pwd.length < 12){
			$('pw1tipdiv').innerHTML = '<font color=green>密码符合要求。密码强度：弱</font>';
			cpwd1 = 'yes';
		}else if((pwd.match(/^[0-9]*$/)!=null) || (pwd.match(/^[a-zA-Z]*$/) != null )){
			$('pw1tipdiv').innerHTML = '<font color=green>密码符合要求。密码强度：中</font>';
			cpwd1 = 'yes';
		}else{
			$('pw1tipdiv').innerHTML = '<font color=green>密码符合要求。密码强度：高</font>';
			cpwd1 = 'yes';
		}
		if(pwd2 != '' && pwd != pwd2){
			$('pw2tipdiv').innerHTML = '<font color=red>两次密码不一致!</font>';
			cpwd2 = '';
		}else if(pwd2 != '' && pwd == pwd2){
			$('pw2tipdiv').innerHTML = '<font color=green>两次密码一致</font>';
			cpwd2 = 'yes';
		}
		chkfnd();
	}
	//验证确认密码
	$('fdpassword2').onkeyup = function(){
		pwd1 = $('fdpassword').value;
		pwd2 = $('fdpassword2').value;
		if(pwd1 != pwd2){
			$('pw2tipdiv').innerHTML = '<font color=red>两次密码不一致!</font>';
			cpwd2 = '';
		}else{
			$('pw2tipdiv').innerHTML = '<font color=green>两次密码一致</font>';
			cpwd2 = 'yes';
			chkfnd();
		}
	}

	$('fndpwd').onclick = function(){
		if((cname == 'yes') && (cpwd1 == 'yes') && (cpwd2 == 'yes')){
			url = 'found_chk.php?foundname='+$('foundname').value+'&question='+$('fdquestion').value+'&answer='+$('fdanswer').value+'&password='+$('fdpassword').value;
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					msg = xmlhttp.responseText;
					if(msg == '1'){
						alert('找回密码成功，请重新登陆!');
						window.close();
					}else{
						alert('填写信息错误！');
					}
				}
				xmlhttp.send(null);
			}
			xmlhttp.open('get',url,true);
		}
	}
}