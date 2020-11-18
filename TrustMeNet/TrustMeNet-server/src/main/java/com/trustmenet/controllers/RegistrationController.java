package com.trustmenet.controllers;

import com.trustmenet.repositories.dto.UserDto;
import com.trustmenet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/v1/registration")
    public UserDto registration(@RequestBody UserDto user) {
        System.out.println(user);
        userService.registerUser(user);
        return user;
    }

    @PostMapping("/api/v1/login")
    public Object login(@RequestBody UserDto user) {
        return new Object() {
            final String token = userService.login(user.getLogin(), user.getPassword());
        };
    }

}
