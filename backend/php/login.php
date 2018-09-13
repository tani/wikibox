<?php
$passwords = json_decode(file_get_contents('passwords.json'), true);
switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
    if(hash_hmac('sha256', $_POST['password'], false) == $passwords[$_POST['username']]) {
        $sessionToken = uniqid();
        $tokens = json_decode(file_get_contents("tokens.json"));
        array_push($tokens, $sessionToken);
        file_put_contents("tokens.json", json_encode($tokens));
        echo $sessionToken;
    } else {
        http_response_code(401);
        echo '';
    }
    break;

    case 'DELETE':
    parse_str(file_get_contents("php://input"), $params);
    $tokens = json_decode(file_get_contents("tokens.json"));
    $tokens = array_diff($tokens, [$params['sessionToken']]);
    file_put_contents("tokens.json", json_encode($tokens));
    echo '';
    break;
}