package com.trustmenet.controllers;


import com.trustmenet.repositories.dto.UserDto;
import com.trustmenet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users/{id}")
    public UserDto getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }
}
