<?php

class RouteController {
    public function index($request) {
    }

    public function json_test() {
        return json_encode(['key' => 2]);
    }
}