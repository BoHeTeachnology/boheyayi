<?php
class HfiveTravelProjectFrozenRequest
{
     private $apiParas = array();

     private $item_no;

     public function getItemNo()
     {
         return $this->$item_no;
     }

     public function setItemNo($item_no)
     {
         $this->item_no = $item_no;
         $this->apiParas["item_no"] = $item_no;
     }

     private $company_key;

     public function getCompanyKey()
     {
         return $this->$company_key;
     }

     public function setCompanyKey($company_key)
     {
         $this->company_key = $company_key;
         $this->apiParas["company_key"] = $company_key;
     }

     public function getApiParas()
     {
         return $this->apiParas;
     }

     public function getApiMethodName()
     {
         return "ruixue.hfive.travel.project.frozen";
     }
     public function check()     {          }}