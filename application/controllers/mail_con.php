<?php
class Mail_con extends CI_Controller {
   public function __construct() {

 parent::__construct();
   }
    public function index() {

 $this->load->view('../views/mail_test.html');//加载mail_view.php视图文件
   }
    public function sendMail() {

  $config['protocol'] = 'smtp';//采用smtp方式

  $config['smtp_host'] = 'smtp.163.com';//简便起见，只支持163邮箱

 $config['smtp_user'] = $_POST['sendfrom'];//你的邮箱帐号

 $config['smtp_pass'] = $_POST['password'];//你的邮箱密码

 $config['charset'] = 'utf-8';

 $config['wordwrap'] = TRUE;

  $config['mailtype'] = "html";

  $this->load->library('email');//加载email类

 $this->email->initialize($config);//参数配置

  $this->email->from($_POST['sendfrom'], '我是发件人');

 $this->email->to($_POST['sendto']);

 $this->email->subject($_POST['topic']);

  $this->email->message($_POST['content']);    //显示发送邮件的结果，加载到res_view.php视图文件中

 if(!$this->email->send()){


 	$data['result']=$this->email->print_debugger();


$this->load->view('../views/res_view',$data);

 }else{


 	$data['result']="<font color='red' size='10px'>邮件发送成功</font>";

     $this->load->view('../views/res_view',$data);

 }
   }     };