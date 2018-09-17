<?php
include 'config.php';
$addr=md5($_SERVER["REMOTE_ADDR"]);
switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
    if(password_verify($_POST['password'], USERS[$_POST['username']])) {
        $token = uniqid('', true);
        $db = json_decode(file_get_contents(DATABASE), true);
        $db[$addr] = ["token"=>md5($token), "time"=>time()];
        file_put_contents(DATABASE, json_encode($db));
        echo $token;
    } else {
        http_response_code(401);
    }
    break;
}