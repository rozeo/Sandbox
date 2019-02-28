<?php

function find_route($api_uri, $type) {
    $routes = require_once('Config/routes.php');
    $type = strtolower($type);

    if(isset($routes[$type])) {
        foreach($routes[$type] as $uri => $controller) {
            if($api_uri === $uri) {
                return $controller;
            }
        }
    }

    if(isset($routes['any'])) {
        foreach($routes['any'] as $uri => $controller) {
            if($api_uri === $uri) {
                return $controller;
            }
        }
    }

    return '';
}