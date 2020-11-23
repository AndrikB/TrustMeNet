package com.trustmenet.controllers;

import com.trustmenet.repositories.dto.UserDto;
import com.trustmenet.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/api/v1/registration")
    public UserDto registration(@RequestBody UserDto user) {
        System.out.println(user);
        registrationService.registerUser(user);
        return user;
    }

    @PostMapping("/api/v1/login")
    public Object login(@RequestBody UserDto user) {
        return new Object() {
            public String getToken() {
                return registrationService.login(user.getLogin(), user.getPassword());
            }
        };
    }

}
