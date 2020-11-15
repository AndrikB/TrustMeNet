package com.trustmenet.controllers;

import com.trustmenet.models.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @PostMapping("/api/v1/registration")
    public User getTest(@RequestBody User user) {
        System.out.println(user);
        return user;
    }
}
