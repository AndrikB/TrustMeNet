import { Component, OnInit } from '@angular/core';
import {Announcement} from "../../core/models/announcement";
import {AnnouncementService} from "../../core/services/announcement.service";
import {SecurityService} from "../../core/services/security.service";

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})
export class AnnouncementsListComponent implements OnInit {
  announcements: Announcement[] = [];
  role: string;
  isPublished: boolean = true;

  constructor(private announcementService: AnnouncementService,
              private securityService: SecurityService,
  ) {
    this.role = this.securityService.getCurrentRole();
  }

  ngOnInit(): void {
    this.announcementService.getAll(this.isPublished)
      .subscribe(
        announcements => {
          console.log(announcements)
          if (announcements.length == 0) {
            return;
          }
          this.announcements = announcements;
        },
        err => {
          console.log(err);
        })
  }


  getUnpublished() {
    this.announcements = [];
    this.isPublished = false;
    this.announcementService.getAll(this.isPublished)
      .subscribe(
        announcements => {
          console.log(announcements)
          if (announcements.length == 0) {
            return;
          }
          this.announcements = announcements;
        },
        err => {
          console.log(err);
        })
  }

  getPublished() {
    this.announcements = [];
    this.isPublished = true;
    this.announcementService.getAll(this.isPublished)
      .subscribe(
        announcements => {
          console.log(announcements)
          if (announcements.length == 0) {
            return;
          }
          this.announcements = announcements;
        },
        err => {
          console.log(err);
        })
  }
}
