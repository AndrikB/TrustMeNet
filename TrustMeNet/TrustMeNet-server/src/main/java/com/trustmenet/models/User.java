package com.trustmenet.models;

import lombok.Data;

@Data
public class User {
    private int id;
    private String login;
    private String password;
    private String mail;
}
