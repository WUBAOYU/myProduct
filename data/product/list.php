<?php
header("Content-Type:application/json");
require_once("../init.php");
$output=[
  "count"=>0,
  "pageSize"=>9,
  "pageCount"=>0,
  "pageNo"=>0,
  "data"=>[]
];
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
if(!$pno) $pno=0;
$sql="SELECT lid, title, price, (select md from xz_laptop_pic where laptop_id=lid limit 1) as md FROM xz_laptop";
if($kw){
  $kws=explode(" ",$kw);
  for($i=0;$i<count($kws);$i++){
	$kws[$i]=" title like '%".$kws[$i]."%'";
  }
  $where=" where ".implode(" and ",$kws);
  $sql=$sql.$where;
}
$output["count"]=count(sql_execute($sql));
$sql=$sql." limit ".($pno*$output["pageSize"])." ,".$output["pageSize"];
$result=sql_execute($sql);
$output["pageCount"]=
  ceil($output["count"]/$output["pageSize"]);
$output["pageNo"]=$pno;
$output["data"]=$result;
echo json_encode($output);