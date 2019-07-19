<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

error_reporting(E_ALL);

function upimg($img,$imglocate){  
            if($img['name']!=''){  
            $fileupload1=$img['tmp_name'];  
            $g_img=explode(".",$img['name']);  
            $file_up=time().".".$g_img[1];  // เปลี่ยนชื่อไฟล์ไหม่ เป็นตัวเลข  
                if($fileupload1){  
                    $array_last=explode(".",$file_up);  
                    $c=count($array_last)-1;  
                    $lastname=strtolower($array_last[$c]);  
                        @copy($fileupload1,$imglocate.$file_up);              
                          
                }                 
            }  
            return $file_up; // ส่งกลับชื่อไฟล์  
}  


if ( !empty( $_FILES ) ) {

	$name = upimg($_FILES['file'],"images/");  
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = '../assets/images/uploads/source/'.$name;

    $move =  move_uploaded_file( $tempPath, $uploadPath );
    if( $move ) {
	    $answer = array( 'answer' => 'File transfer completed' , 'file_name' => $name);
	    $json = json_encode( $answer );
	    echo $json;
	} else {
    	header('HTTP/1.1 401 Unauthorized');
    }

} else {

    echo 'No files';

}


?>