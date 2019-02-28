<?php

return [
    
    'any' => [
        '/' => 'IndexController@index',
        '/route/' => 'RouteController@index',
    ],

    'get' => [
            
    ],

    'post' => [
        '/route/json' => 'RouteController@json_test',
    ],

];