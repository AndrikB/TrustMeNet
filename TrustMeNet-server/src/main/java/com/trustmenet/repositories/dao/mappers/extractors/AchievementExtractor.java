package com.trustmenet.repositories.dao.mappers.extractors;


import com.trustmenet.repositories.entities.Achievement;
import com.trustmenet.repositories.entities.AchievementCharacteristic;
import com.trustmenet.repositories.entities.AchievementCondition;
import com.trustmenet.repositories.entities.ConditionOperator;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class AchievementExtractor implements ResultSetExtractor<List<Achievement>> {

    @Override
    public List<Achievement> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<Integer, Achievement> achievementMap = new HashMap<>();
        Map<Integer, AchievementCharacteristic> achievementCharacteristicMap = new HashMap<>();

        while (rs.next()) {
            int achievementId = rs.getInt("achievement_id");
            Achievement achievement = achievementMap.get(achievementId);

            if (achievement == null) {
                achievement = Achievement.builder()
                        .id(achievementId)
                        .name(rs.getString("achievement_name"))
                        .description(rs.getString("description"))
                        .achievementConditions(new ArrayList<>())
                        .build();
                achievementMap.put(achievementId, achievement);
            }

            int characteristicId = rs.getInt("achievement_characteristic_id");
            AchievementCharacteristic characteristic = achievementCharacteristicMap.get(characteristicId);

            if (characteristic == null) {
                characteristic = AchievementCharacteristic.builder()
                        .id(characteristicId)
                        .name(rs.getString("achievement_characteristic_name"))
                        .sqlScript(rs.getString("script"))
                        .build();
                achievementCharacteristicMap.put(characteristicId, characteristic);
            }

            int conditionId = rs.getInt("achievement_condition_id");
            AchievementCondition condition = AchievementCondition.builder()
                    .achievementId(achievementId)
                    .id(conditionId)
                    .operator(ConditionOperator.valueOf(rs.getString("operator").toUpperCase()))
                    .characteristicId(characteristicId)
                    .value(rs.getInt("value"))
                    .characteristic(characteristic)
                    .build();

            achievement.getAchievementConditions().add(condition);
        }

        return new ArrayList<>(achievementMap.values());
    }

}

