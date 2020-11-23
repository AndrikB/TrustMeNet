package com.trustmenet.services;


import com.trustmenet.repositories.dao.UserDao;
import com.trustmenet.repositories.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public UserDto getUserById(int id){
        return userDao.get(id);
    }
}
