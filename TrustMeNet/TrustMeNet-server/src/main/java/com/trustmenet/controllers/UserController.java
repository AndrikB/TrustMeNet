package com.trustmenet.controllers;


import com.trustmenet.repositories.entities.UserDto;
import com.trustmenet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users/{id}")
    public UserDto getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PutMapping("users")
    public void updateUser(@RequestBody @Valid UserDto editedUser) {
        userService.updateUserProfile(editedUser);
    }

    @PutMapping("/users/password/{login}")
    public void changePassword(@PathVariable String login,
                               @RequestBody String newPassword) {
        userService.changeUserPassword(login, newPassword);
    }

    @GetMapping("/users/password/check")
    public boolean checkPasswords(@RequestParam(value = "login") String login,
                                  @RequestParam(value = "password") String password) {
        return userService.checkPasswords(login, password);
    }
}
