package com.trustmenet.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test/{id}")
    public String getTest(@PathVariable int id) {
        return "test" + id;
    }
}
