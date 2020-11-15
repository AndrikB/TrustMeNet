package com.trustmenet.repositories.entities;

import com.trustmenet.repositories.entities.enums.Role;
import com.trustmenet.repositories.entities.enums.UserAccountStatus;

import java.util.Date;

public class User {
    private int id;

    private String firstName;

    private String secondName;

    private String login;

    private String profile;

    private Date registrationDate;

    private int rating;

    private UserAccountStatus status;

    private Role role;

    private int imageId;

    // private Image image;
}
