<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
        function __construct() {
                parent::__construct();
                $this->load->model('../models/login_model');
        }
        
        public function index() {
            $this->load->view('../views/login_view.html');
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
            $_SESSION['vercode'] =  md5("SxF2y5VhfgGJK".$verifyCode."h7Rf95Fj");           //To avoid MD5 decoder, just random prestr and endstr
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

        public function login_check() {
            session_start();
        	$name = $this->input->post('name');
			$pwd = $this->input->post('pwd');
            $vercode = md5("SxF2y5VhfgGJK".$this->input->post('vercode')."h7Rf95Fj");
            $reback = '-4';
            if($_SESSION['vercode_alive'] != 1){
                $reback = '-3';
            }else if($vercode != $_SESSION['vercode']){
                $_SESSION['vercode_alive'] = 0;                     //kill the vercode
                $reback = '-2';
            }else if(!empty($name) and !empty($pwd)){
                $_SESSION['vercode_alive'] = 0;
                $result = $this->login_model->name_state_check($name);
                $active = $result['active'];
                $count = $result['count'];
                if($active == ''){
                    if(is_null($_COOKIE['count']) or $_COOKIE['count'] == 0){
                        setcookie('count',1,time()+3600*6);
                    }else{
                        setcookie('count',$_COOKIE['count']+1);
                    }
                    $reback = ($_COOKIE['count'] > 5) ? 5 : $_COOKIE['count'];
                }else if($active == 0){
                    $reback = '0';
                }else if($count >= 5){
                    $reback = '6';
                }else{
                    $password = md5($pwd);
                    $result = $this->login_model->user_check($name, $password, $count);
                    if($result['re_number'] == '-1'){
                        if(isset($_COOKIE['count']) and $_COOKIE['count'] != 0){
                            setcookie('count',0);
                        }
                        setcookie('name',$name,time()+60*10,'/');
                        setcookie('level',$result['level'],time()+60*10,'/');
                        $_SESSION['name'] = $name;
                        $_SESSION['level'] = $result['level'];
                        $reback = '-1';
                    } else {
                        $reback = ($count+1);
                    }
                }
            }
            echo $reback;    
        }
}

/* End of file login.php */
/* Location: ./application/controllers/login.php */