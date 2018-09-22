<?php
include 'config.php';
$db = json_decode(file_get_contents(DATABASE), true);
$addr = md5($_SERVER["REMOTE_ADDR"]);
if(preg_match('#/(?P<filename>.*\.md)#', $_SERVER['PATH_INFO'], $matches)) {
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
        parse_str(file_get_contents("php://input"), $params);
        if(password_verify($_POST['token'], $db[$addr]["token"]) && time() < $db[$addr]["time"]+LIMIT) {
            if(file_exists('data/'.$matches['filename'])) {
                file_put_contents('data/'.$matches['filename'], $_POST['content']);
                echo file_get_contents('data/'.$matches['filename']);
            } else {
                http_response_code(404);
            }
        } else {
            http_response_code(401);
        }
        break;
    }
} else {
    http_response_code(404);
}