<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model {

        function __construct() {
                parent::__construct();
                $this -> load -> database();
        }
        
        public function name_state_check($name) {
            $sql = "select name,count,active from tb_member where name = '".$name."'";
            $query = $this->db->query($sql);          
            $result = array("name" => "", "count" => '', "active" => '');
            if($query->num_rows()>0) {
                $buffer =  $query->result_array();          //Watch out! This return a 2-dimension array!
                $result = $buffer['0'];
            }
            return $result;
        }

        public function user_check($name, $password, $count) {
        	$sql = "select level from tb_member where name = '".$name."'"." and password = '".$password."'";
        	$query = $this->db->query($sql);
        	$reback = array("re_number" => '0', "level" => '');
        	if($query->num_rows()>0)
        	{
        		$result = $query->result_array();
                $result = $result[0];                   //2 dimension array!
        		if($count != 0){
        			$this->db->where('name', $name);
        			$this->db->update('tb_member',array('count'=>0));
        		}
        		$reback['re_number'] = '-1';
        		$reback['level'] = $result['level'];
        	}else{
        		$this->db->where('name', $name);
        		$this->db->update('tb_member',array('count'=>($count+1)));
        		$reback['re_number'] = ($count+1);
        	}
        	return $reback;
        }
}

/* End of file login_model.php */
/* Location: ./application/models/login_model.php */