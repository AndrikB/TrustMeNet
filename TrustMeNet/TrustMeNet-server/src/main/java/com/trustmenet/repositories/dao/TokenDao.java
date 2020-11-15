package com.trustmenet.repositories.dao;

import com.trustmenet.repositories.entities.Token;

public interface TokenDao {
    int getUserId(Token token);
    void deleteOldTokens();
}
