<?php
include 'config.php';
switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
    if(password_verify($_POST['password'], $USERS[$_POST['username']])) {
        $token = uniqid();
        $db = json_decode(file_get_contents(DATABASE));
        $db[md5($_SERVER["REMOTE_ADDR"])] = ["token"=>md5($token), "time"=>time()];
        file_put_contents(DATABASE, json_encode($db));
        echo $token;
    } else {
        http_response_code(401);
        echo '';
    }
    break;

    case 'DELETE':
    parse_str(file_get_contents("php://input"), $params);
    $db = json_decode(file_get_contents(DATABASE));
    if(md5($params["token"])==$db[md5($_SERVER["REMOTE_ADDR"])]) {
        unset($db[md5($_SERVER["REMOTE_ADDR"])]);
        file_put_contents(DATABASE, json_encode($db));
    } else {
        http_response_code(401);
    }
    echo '';
    break;
}