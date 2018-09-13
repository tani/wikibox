<?php
preg_match('#/(?P<filename>.*)', $_SERVER['PATH_INFO'], $matches);
switch($_SERVER['REQUEST_METHOD']) {
    case 'PUT':
    parse_str(file_get_contents("php://input"), $params);
    $tokens = json_decode(file_get_contents("tokens.json"));
    if(array_search($params['sessionToken'], $tokens)) {
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
    $tokens = json_decode(file_get_contents("tokens.json"));
    if(array_search($params['sessionToken'], $tokens)) {
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