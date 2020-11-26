package com.trustmenet.services;

import com.trustmenet.config.JWTUtils;
import com.trustmenet.repositories.dao.UserDao;
import com.trustmenet.repositories.entities.UserDto;
import com.trustmenet.repositories.entities.enums.Role;
import com.trustmenet.repositories.entities.enums.UserAccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:user.properties")
public class RegistrationService {

    @Value("#{${defaultImageId}}")
    private int defaultId;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtUtils;

    public void registerUser(UserDto user){
        if (userDao.getUserByLogin(user.getLogin()) != null || userDao.getUserByMail(user.getMail()) != null) {
            return;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole(Role.USER);
        user.setStatus(UserAccountStatus.UNACTIVATED);
        user.setRating(0);
        user.setProfile("");
        user.setImageId(defaultId);


        int id = userDao.save(user);
        user.setId(id);
    }

    public String login(String login, String password){
        UserDto user = userDao.getUserByLogin(login);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));

        return jwtUtils.generateToken(user.getId(), user.getRole(), user.getLogin());
    }

}
