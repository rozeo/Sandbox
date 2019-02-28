<?php
require_once 'routeMapper.php';

define('API_ROOT', __DIR__);

$uri = $_SERVER['REQUEST_URI'];
$match = preg_match('/\/api([^?]*)/', $uri, $m);

if(!$match) {
    http_response_code(400);
    exit('Invalid URI');
}

$api_uri = $m[1];
$controller = find_route($api_uri, $_SERVER['REQUEST_METHOD']);
if($controller === '') {
    http_response_code(404);
    exit('Undefined controller.');
}

$controller_info = preg_split('/@/', $controller);
if(count($controller_info) < 2) {
    http_response_code(500);
    exit('Invalid configuration.');
}

if(!file_exists('Controllers/' . $controller_info[0] . '.php')) {
    http_response_code(500);
    exit('Controller not found.');
}

require_once('Controllers/' . $controller_info[0] . '.php');

if(!method_exists($controller_info[0], $controller_info[1])) {
    http_response_code(500);
    exit('Controller method not found.');
}

exit($controller_info($_REQUEST));