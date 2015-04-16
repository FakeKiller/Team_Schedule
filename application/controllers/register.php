<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {
        function __construct() {
                parent::__construct();
                $this->load->model('../models/register_model');
        }
        
        public function index() {
            $this->load->view('../views/register_view.html');
        }


        public function vercode_create(){              //create vertify code
            session_start();

            header("Content-type: image/png");
            $str = "1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,y,z";
            $list = explode(",", $str);
            $cmax = count($list) - 1;
            $verifyCode = '';
            for ( $i=0; $i < 5; $i++ ){
                $randnum = mt_rand(0, $cmax);
                $verifyCode .= $list[$randnum];
            }
            $_SESSION['vercode'] =  md5("92y5VhJF3cGfgFK".$verifyCode."h7RfSxj");           //To avoid MD5 decoder, just random prestr and endstr
            $_SESSION['vercode_alive'] = 1;

            $im = imagecreate(58,28);
            $black = imagecolorallocate($im, 0,0,0);
            $white = imagecolorallocate($im, 255,255,255);
            $gray = imagecolorallocate($im, 200,200,200);
            $red = imagecolorallocate($im, 255, 0, 0);
            imagefill($im,0,0,$white);
            imagestring($im, 5, 10, 8, $verifyCode, $black);
            for($i=0;$i<50;$i++)
            {
                $randcolor = ImageColorallocate($im,rand(0,255),rand(0,255),rand(0,255)); 
                imagesetpixel($im, rand()%70 , rand()%30 , $randcolor); 
            }
            imagepng($im);
            imagedestroy($im);
        }

        public function name_exist_check() {
            $reback = $this->register_model->name_exist_check($name);
            echo $reback;
        }

        public function register() {
            session_start();
            $register_info = array();
            $register_info['name'] = $this->input->post('name');
            $register_info['pwd'] = $this->input->post('pwd');
            $register_info['email_add'] = $this->input->post('email');
            $vercode = md5("92y5VhJF3cGfgFK".$this->input->post('vercode')."h7RfSxj");
            $reback = '-4';
            if($_SESSION['vercode_alive'] != 1){
                $reback = '-3';
            }else if($vercode != $_SESSION['vercode']){
                $_SESSION['vercode_alive'] = 0;                     //kill the vercode
                $reback = '-2';
            }else if(!empty($register_info['name']) and !empty($register_info['pwd']) and !empty($register_info['email_add']){
                $_SESSION['vercode_alive'] = 0;                     //kill the vercode

                    //对邮箱地址做正则判断再处理！

                $this->load->helper('string');
                $register_info['acti_code'] = random_string('sha', 1);

                    //加上注册时间戳

                $register_info['neckname'] = $this->input->post('neckname');
                $register_info['realname'] = $this->input->post('realname');
                $register_info['birthday'] = $this->input->post('birthday');
                $register_info['telephone'] = $this->input->post('telephone');
                $register_info['qq'] = $this->input->post('qq');
                $register_info['wechat'] = $this->input->post('wechat');
                $result = $this->register_model->create_new_account($register_info);           //成功返回1，失败返回-1
                if($result == '1') {
                    $this->load->library('email');
                    $this->email->from('fc_secu_noreply@163.com', 'FC注册验证');
                    $this->email->to($register_info['email_add']);
                    $this->email->subject('FC注册帐号邮箱效验');
                    $url = 'http://www.freeclan.net/CIforFC/index.php/activation/active_account';
                    $url .= '/'.$register_info['name'].'/'.$register_info['acti_code'];
                    $mailbody='注册成功。您的激活码是：'.'<a href="'.$url.'" target="_blank">'.$url.'</a><br>'.'请于三日内点击该地址，激活您的用户！';
                    $this->email->message($mailbody);

                    if(!$this->email->send()){
                        $reback = '2';
                    } else {
                        $reback = '1';
                    }
                } else {
                    $reback = $result;
                }
            }
            echo $reback;
        }
}

/* End of file register.php */
/* Location: ./application/controllers/register.php */