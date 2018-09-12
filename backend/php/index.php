<?php

$admin = json_decode(file_get_contents("passwords.json"))

preg_match('#(?P<command>\w+)(/(?P<filename>\w+\.\w+))?#',$_SERVER['PATH_INFO'],$matches);
switch($matches['command']) {
    case 'grant':
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
        if(hash_mac('sha256', $_POST['password'], false) == $admin[$_POST['username']]) {
            $sessionToken = uniqid();
            $tokens = json_decode(file_get_contents("tokens.json"));
            array_push($tokens, $sessionToken);
            file_put_contents("tokens.json", json_encode($tokens));
            echo json_encode(['sessionToken'=>$sessionToken]);
        } else {
            echo json_encode([]); // TODO return 401
        }
        break;

        case 'DELETE':
        parse_str(file_get_contents("php://input"), $params);
        $tokens = json_decode(file_get_contents("tokens.json"));
        $tokens = array_diff($tokens, [$params['sessionToken']]);
        file_put_contents("tokens.json", json_encode($tokens));
        echo json_encode(['sessionToken'=>'']);
        break;
    }
    break;

    case 'data':
    switch($_SERVER['REQUEST_METHOD']) {
        case 'GET':
        if(file_exists($matches['filename'])) {
            echo json_encode(['content'=>file_get_contents($matches['filename'])]);
        } else {
            echo json_encode(['content'=>'']); // TODO reutrn 404;
        }
        break;
    
        case 'PUT':
        parse_str(file_get_contents("php://input"), $params);
        $tokens = json_decode(file_get_contents("tokens.json"));
        if(array_search($params['sessionToken'], $tokens)) {
            if(file_exists($matches['filename'])) {
                file_put_contents($matches['filename'], $_POST['content']);
                echo json_encode(['content'=>file_get_contents($matches['filename'])]);
            } else {
                echo json_encode(['content'=>'']); // TODO reutrn 404;
            }
        } else {
            echo json_encode([]); // TODO return 401;
        }
        break;
        
        case 'DELETE':
        parse_str(file_get_contents("php://input"), $params);
        $tokens = json_decode(file_get_contents("tokens.json"));
        if(array_search($params['sessionToken'], $tokens)) {
            if(file_exists($matches['filename'])) {
                unlink($matches['filename']);
                echo json_encode(['content'=>'']);
            } else {
                echo json_encode(['content'=>'']); // TODO reutrn 404;
            }
        } else {
            echo json_encode([]); // TODO return 401;
        }
        break;
    }
    break;

    default:
    switch($_SERVER['REQUEST_METHOD']) {
        case 'GET':
        if(preg_match('/^(?p<filename>index\.html|bundle(\.js(\.map)?|\.css(\.map)?))$/', $matches['command'], $matches)) {
            echo file_get_contents($matches['filename']);
        } else {
            echo ''; // TODO reutrn 404;
        }
        break;
    }
}
