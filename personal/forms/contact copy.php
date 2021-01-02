<?php

// session_start();
if( isset($_POST['submitcomment']) ){
$from = $_POST['email'];
$to = "girdhar.yashsvi@gmail.com";
$subject = $_POST['subject'];


$message = $_POST['message'];

// Always set content-type when sending HTML email
//$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

//// More headers
$headers .= 'From: $_POST["email"]' . "\r\n";
mail($to,$subject,$message,$headers);
}
?>
