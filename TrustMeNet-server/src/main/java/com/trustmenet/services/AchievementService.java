package com.trustmenet.services;


import com.trustmenet.repositories.dao.AchievementCharacteristicDao;
import com.trustmenet.repositories.dao.AchievementConditionDao;
import com.trustmenet.repositories.dao.AchievementDao;
import com.trustmenet.repositories.dao.UserAchievementsDao;
import com.trustmenet.repositories.dao.implementation.UserAchievementsDaoImpl;
import com.trustmenet.repositories.entities.Achievement;
import com.trustmenet.repositories.entities.AchievementCharacteristic;
import com.trustmenet.repositories.entities.AchievementCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {

    @Autowired
    private UserAchievementsDao userAchievementsDao;

    @Autowired
    private AchievementCharacteristicDao achievementCharacteristicDao;

    @Autowired
    private AchievementDao achievementDao;

    @Autowired
    private AchievementConditionDao achievementConditionDao;


    public List<Achievement> getAchievementsByUserId(int id) {
        return userAchievementsDao.getAchievementsByUserId(id);
    }

    public List<AchievementCharacteristic> getAllAchievementCharacteristics() {
        return achievementCharacteristicDao.getAll();
    }

    public boolean createAchievement(Achievement achievement) {
        if (achievement.getAchievementConditions().isEmpty()) {
            return false;
        }

        int achievementId = achievementDao.save(achievement);

        for (AchievementCondition achievementCondition : achievement.getAchievementConditions()) {
            achievementCondition.setAchievementId(achievementId);
        }

        achievementConditionDao.insert(achievement.getAchievementConditions());

        return true;
    }

    public void recalculateAchievements() {
        //TODO
    }
}
