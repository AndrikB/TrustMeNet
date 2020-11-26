import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Announcement} from "../../core/models/announcement";
import {Image} from "../../core/models/image";
import {AnnouncementService} from "../../core/services/announcement.service";
import {SecurityService} from "../../core/services/security.service";

@Component({
  selector: 'app-create-update-announcement',
  templateUrl: './create-update-announcement.component.html',
  styleUrls: ['./create-update-announcement.component.css']
})
export class CreateUpdateAnnouncementComponent implements OnInit {

  announcement: Announcement;
  updated: boolean = false;
  isInvalid: boolean = false;

  constructor(private announcementService: AnnouncementService,
              private route: ActivatedRoute,
              private securityService: SecurityService,
              private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('announcementId');
    if (id) {
      this.announcementService.getById(id).subscribe(
        data => {
          this.announcement = data;
        }, err => {
          console.log(err);
          this.announcement = new Announcement();
        });
    } else {
      this.announcement = new Announcement();
      this.announcement.image = new Image();
      this.announcement.authorId = this.securityService.getCurrentId();
    }

  }

  ngOnInit(): void {
  }

  processFile(imageInput: any, image: Image) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      image.src = event.target.result;
      this.updated = true;
      this.announcementService.putImage(file).subscribe(
        id => {
          if (typeof id === "number") {
            this.announcement.imageId = id;
            image.id = id;
          }
        },
        error => {
          console.log(error);
        });
    });
    reader.readAsDataURL(file);
  }

  isValid(): boolean {

    if (this.announcement.title && this.announcement.fullText) return true;
    else {
      this.isInvalid = true;
      return false;
    }
  }

  send() {
    if (this.isValid()) {
      if (this.announcement.id) {
        this.announcementService.updateAnnouncement(this.announcement).subscribe(
          get => {
          },
          error => {
            console.log(error);
          });
      } else {
        //console.log(this.securityService.getCurrentRole());
        this.announcement.isPublished = (this.securityService.getCurrentRole() != "USER");
        this.announcementService.sendAnnouncement(this.announcement).subscribe(
          get => {
            if (this.announcement.isPublished) this.router.navigate(["announcement/" + get]);
          },
          error => {
            console.log(error);
          });
      }
      this.router.navigate(["announcements"]);
    }
  }
}
