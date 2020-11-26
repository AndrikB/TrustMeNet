package com.trustmenet.services;


import com.trustmenet.repositories.dao.UserDao;
import com.trustmenet.repositories.entities.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto getUserById(int id){
        return userDao.get(id);
    }

    public void updateUserProfile(UserDto editedUser) {
        UserDto currentUser = userDao.getUserByLogin(editedUser.getLogin());

        currentUser.setFirstName(editedUser.getFirstName());
        currentUser.setSecondName(editedUser.getSecondName());
        currentUser.setProfile(editedUser.getProfile());
        currentUser.setMail(editedUser.getMail());

        userDao.update(currentUser);
    }

    public void changeUserPassword(String login, String newPassword) {
        userDao.changePassword(passwordEncoder.encode(newPassword), login);
    }

    public boolean checkPasswords(String login, String password) {
        UserDto currentUser = userDao.getUserByLogin(login);
        return passwordEncoder.matches(password, currentUser.getPassword());
    }
}
