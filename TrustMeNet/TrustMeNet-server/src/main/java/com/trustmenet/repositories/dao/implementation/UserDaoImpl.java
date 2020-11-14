package com.trustmenet.repositories.dao.implementation;


import com.trustmenet.repositories.dao.UserDao;
import com.trustmenet.repositories.dao.mappers.UserMapper;
import com.trustmenet.repositories.entities.User;
import com.trustmenet.repositories.entities.enums.Role;
import com.trustmenet.repositories.entities.enums.UserAccountStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
@PropertySource("classpath:user.properties")
public class UserDaoImpl extends GenericDaoImpl<User> implements UserDao {

    @Value("#{${sql.users}}")
    private Map<String, String> usersQueries;

    @Value("#{${sql.friends}}")
    private Map<String, String> friendsQueries;

    protected UserDaoImpl() {
        super(new UserMapper(), TABLE_NAME);
    }

    @Override
    protected String getInsertQuery() {
        return usersQueries.get("insert");
    }

    @Override
    protected PreparedStatement getInsertPreparedStatement(PreparedStatement preparedStatement, User user) throws SQLException {
        preparedStatement.setString(1, user.getLogin());
        preparedStatement.setString(2, user.getPassword());
        preparedStatement.setString(3, user.getMail());
        preparedStatement.setString(4,
                user.getStatus() != null
                        ? user.getStatus().name().toLowerCase()
                        : UserAccountStatus.UNACTIVATED.name().toLowerCase());
        preparedStatement.setString(5,
                user.getRole() != null
                        ? user.getRole().name().toLowerCase()
                        : Role.USER.name().toLowerCase());
        preparedStatement.setString(6, user.getFirstName());
        preparedStatement.setString(7, user.getSecondName());
        if (user.getProfile() != null) {
            preparedStatement.setString(8, user.getProfile());
        } else {
            preparedStatement.setNull(8, Types.VARCHAR);
        }
        if (user.getRating() != 0) {
            preparedStatement.setInt(9, user.getRating());
        } else {
            preparedStatement.setNull(9, Types.INTEGER);
        }
        preparedStatement.setInt(10, user.getImageId());
        return preparedStatement;
    }

    @Override
    protected String getUpdateQuery() {
        return usersQueries.get("update");
    }

    @Override
    protected Object[] getUpdateParameters(User user) {
        return new Object[]{user.getLogin(), user.getPassword(), user.getMail(),
                user.getStatus().name().toLowerCase(), user.getRole().name().toLowerCase(),
                user.getFirstName(), user.getSecondName(), user.getRegistrationDate(),
                user.getProfile(), user.getRating(), // user.getImageId(),
                user.getId()};
    }

    @Override
    public List<User> getAll() {
        return jdbcTemplate.query(usersQueries.get("getAllUsers"), new UserMapper());
    }

    @Override
    public User get(int id) {
        User user;
        try {
            user = jdbcTemplate.queryForObject(usersQueries.get("getUser"),
                    new Object[]{id}, new UserMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        return user;
    }

    @Override
    public User getUserByLoginAndPassword(String login, String password) {
        User user;
        try {
            user = jdbcTemplate.queryForObject(usersQueries.get("selectByLoginAndPassword"),
                    new Object[]{login, password}, new UserMapper()
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        return user;
    }

    @Override
    public User getUserByMail(String mail) {
        User user;
        try {
            user = jdbcTemplate.queryForObject(usersQueries.get("selectByMail"),
                    new Object[]{mail}, new UserMapper());
        } catch (NullPointerException | EmptyResultDataAccessException e) {
            return null;
        }
        return user;
    }

    @Override
    public User getUserByLogin(String login) {
        User user;
        try {
            user = jdbcTemplate.queryForObject(usersQueries.get("selectByLogin"),
                    new Object[]{login}, new UserMapper()
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
        return user;
    }

    @Override
    public boolean addUserFriend(int userId, int friendId) {
        try {
            jdbcTemplate.update(
                    friendsQueries.get("addUserFriend"),
                    userId, friendId
            );
        } catch (DuplicateKeyException e) {
            return false;
        }
        return true;
    }

    @Override
    public void deleteUserFriend(int userId, int friendId) {
        jdbcTemplate.update(
                friendsQueries.get("deleteUserFriend"),
                userId, friendId
        );
    }

    @Override
    public List<User> getUserFriends(int userId) {
        return jdbcTemplate.query(
                friendsQueries.get("getUserFriends"),
                new Object[]{userId}, new UserMapper()
        );
    }

    @Override
    public List<User> searchUsersByLogin(String login) {
        login = '%' + login + '%';
        return jdbcTemplate.query(
                usersQueries.get("searchUsersByLogin"),
                new Object[]{login}, new UserMapper()
        );
    }

    @Override
    public List<User> searchUsersByLogin(String login, Role role) {
        login = '%' + login + '%';
        return jdbcTemplate.query(
                usersQueries.get("searchUsersByLogin").replace(";", " AND role = cast(? AS user_role);"),
                new Object[]{login, role.name().toLowerCase()}, new UserMapper()
        );
    }

    @Override
    public boolean checkUsersFriendship(int firstUserId, int secondUserId) {
        Integer counter = jdbcTemplate.queryForObject(friendsQueries.get("checkFriendship"),
                new Object[]{firstUserId, secondUserId},
                (resultSet, number) -> resultSet.getInt("row_count"));
        return counter != null && counter > 0;
    }

    @Override
    public void updateUserStatus(int id, UserAccountStatus status) {
        jdbcTemplate.update(usersQueries.get("updateUserStatus"),
                status.name().toLowerCase(), id);
    }

    @Override
    public void updateUserScore(int userId, int score) {
        jdbcTemplate.update(usersQueries.get("updateUserScore"), score, userId);
    }

    @Override
    public void updateUserPhoto(int imageId, int userId) {
        jdbcTemplate.update(usersQueries.get("updateUserPhoto"), imageId, userId);
    }
}
