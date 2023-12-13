<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: application/json; charset=utf-8");


if(!isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
	//End Session if Direct access
	exit('Cheating Huh ?');
}


function Winner($key = false,$winner = ''){
	$data = array();
	if(!$key || $winner === ''){
		$data['stop'] = true;
	}else{
		$data['selector'] = $key;
		$data['winner']   = $winner;
	}
	
	/* Additional Security : ( Nonce data key is required if nonce is enabled in your code ) */
	if( isset($_REQUEST['nonce']) )
		$data['nonce'] = $_REQUEST['nonce'];
	
	return json_encode($data);
}


$spin  = true;
if($spin === true){
	//Change 'id' to item key ( that you want to make a selector )
	//Change 'f' to item value ( that you want to make a winner )
	echo Winner('id','c');
}else{
	echo Winner(false);
}

?>
