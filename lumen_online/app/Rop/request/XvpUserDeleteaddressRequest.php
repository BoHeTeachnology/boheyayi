<?php
class XvpUserDeleteaddressRequest
{
     private $apiParas = array();

     private $id;

     public function getId()
     {
         return $this->$id;
     }

     public function setId($id)
     {
         $this->id = $id;
         $this->apiParas["id"] = $id;
     }

     private $xvp_uid;

     public function getXvpUid()
     {
         return $this->$xvp_uid;
     }

     public function setXvpUid($xvp_uid)
     {
         $this->xvp_uid = $xvp_uid;
         $this->apiParas["xvp_uid"] = $xvp_uid;
     }

     public function getApiParas()
     {
         return $this->apiParas;
     }

     public function getApiMethodName()
     {
         return "ruixue.xvp.user.deleteaddress";
     }
     public function check()     {          }}