// JavaScript Document
function $(id){
	return document.getElementById(id);
}
window.onload = function(){
	$('foundname').focus();
	var cname='',cpwd1='',cpwd2='';

	//��֤�û���
	$('foundname').onkeyup = function (){
		name = $('foundname').value;
		if(name.match(/^[a-zA-Z_]*/) == ''){
			$('nmtipdiv').innerHTML = '<font color=red>��������ĸ���»��߿�ͷ</font>';
			cname = '';
		}else if(name.length < 4){
			$('nmtipdiv').innerHTML = '<font color=red>ע�����Ʊ�����ڵ���4λ</font>';
			cname = '';
		}else{
			$('nmtipdiv').innerHTML = '<font color=green>ע�����Ʒ��ϱ�׼</font>';
			cname = 'yes';
		}
		chkfnd();
	}
	//��֤����
	$('fdpassword').onkeyup = function(){
		pwd = $('fdpassword').value;
		pwd2 = $('fdpassword2').value;
		if(pwd.length < 6){
			$('pw1tipdiv').innerHTML = '<font color=red>���볤��������Ҫ6λ</font>';
			cpwd1 = '';
		}else if(pwd.length >= 6 && pwd.length < 12){
			$('pw1tipdiv').innerHTML = '<font color=green>�������Ҫ������ǿ�ȣ���</font>';
			cpwd1 = 'yes';
		}else if((pwd.match(/^[0-9]*$/)!=null) || (pwd.match(/^[a-zA-Z]*$/) != null )){
			$('pw1tipdiv').innerHTML = '<font color=green>�������Ҫ������ǿ�ȣ���</font>';
			cpwd1 = 'yes';
		}else{
			$('pw1tipdiv').innerHTML = '<font color=green>�������Ҫ������ǿ�ȣ���</font>';
			cpwd1 = 'yes';
		}
		if(pwd2 != '' && pwd != pwd2){
			$('pw2tipdiv').innerHTML = '<font color=red>�������벻һ��!</font>';
			cpwd2 = '';
		}else if(pwd2 != '' && pwd == pwd2){
			$('pw2tipdiv').innerHTML = '<font color=green>��������һ��</font>';
			cpwd2 = 'yes';
		}
		chkfnd();
	}
	//��֤ȷ������
	$('fdpassword2').onkeyup = function(){
		pwd1 = $('fdpassword').value;
		pwd2 = $('fdpassword2').value;
		if(pwd1 != pwd2){
			$('pw2tipdiv').innerHTML = '<font color=red>�������벻һ��!</font>';
			cpwd2 = '';
		}else{
			$('pw2tipdiv').innerHTML = '<font color=green>��������һ��</font>';
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
						alert('�һ�����ɹ��������µ�½!');
						window.close();
					}else{
						alert('��д��Ϣ����');
					}
				}
				xmlhttp.send(null);
			}
			xmlhttp.open('get',url,true);
		}
	}
}