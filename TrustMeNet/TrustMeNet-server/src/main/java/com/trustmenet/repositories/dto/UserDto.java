package com.trustmenet.repositories.dto;

import com.trustmenet.repositories.entities.enums.Role;
import com.trustmenet.repositories.entities.enums.UserAccountStatus;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class UserDto {

    private int id;

    private String firstName;

    private String secondName;

    private String login;

    private String mail;

    private String password;

    private String profile;

    private Date registrationDate;

    private int rating;

    private UserAccountStatus status;

    private Role role;

    private int imageId;

    // private Image image;

}

