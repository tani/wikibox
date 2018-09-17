<?php
include 'config.php';
if(preg_match('#/(?P<filename>.*.md)', $_SERVER['PATH_INFO'], $matches)) {
    switch($_SERVER['REQUEST_METHOD']) {
        case 'PUT':
        parse_str(file_get_contents("php://input"), $params);
        $db = json_decode(file_get_contents(DATABASE));
        if(md5($params['token']) == $db[$_SERVER["REMOTE_ADDR"]]["token"] && time() < $db[$_SERVER["REMOTE_ADDR"]]["time"]+LIMIT) {
            if(file_exists($matches['filename'])) {
                file_put_contents($matches['filename'], $params['content']);
                echo file_get_contents($matches['filename']);
            } else {
                http_response_code(404);
                echo '';
            }
        } else {
            http_response_code(401);
            echo '';
        }
        break;

        case 'DELETE':
        parse_str(file_get_contents("php://input"), $params);
        $db = json_decode(file_get_contents(DATABASE));
        if(md5($params['token']) == $db[$_SERVER["REMOTE_ADDR"]]["token"] && time() < $db[$_SERVER["REMOTE_ADDR"]]["time"]+LIMIT) {
            if(file_exists($matches['filename'])) {
                unlink($matches['filename']);
                echo '';
            } else {
                http_response_code(404);
                echo '';
            }
        } else {
            http_response_code(401);
            echo '';
        }
        break;
    }
} else {
    http_response_code(404);
    echo '';
}