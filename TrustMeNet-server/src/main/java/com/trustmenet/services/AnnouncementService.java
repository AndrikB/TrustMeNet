package com.trustmenet.services;

import com.trustmenet.repositories.dao.AnnouncementDao;
import com.trustmenet.repositories.entities.Announcement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementDao announcementDao;

    public int createAnnouncement(Announcement announcement) {
        int announcementId = announcementDao.save(announcement);
        if (announcementId == -1) {
            log.info("createAnnouncement: Announcement wasn't saved");
            return -1;
        }
        return announcementId;
    }

    public void updateAnnouncement(Announcement announcement) {
        if (announcement == null) {
            log.info("updateAnnouncement: Announcement is null");
            return;
        }
        announcementDao.update(announcement);
    }

    public void deleteAnnouncement(int announcementId) {
        announcementDao.deleteById(announcementId);
    }

    public Announcement getAnnouncementById(int announcementId) {
        return announcementDao.getById(announcementId);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementDao.getAllInfo();
    }


    public List<Announcement> getAllAnnouncements(boolean isPublished) {
        return announcementDao.getAllInfo(isPublished);
    }


}

