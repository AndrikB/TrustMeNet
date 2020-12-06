import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { CreateUpdateAnnouncementComponent } from './create-update-announcement/create-update-announcement.component';
import {FormsModule} from "@angular/forms";
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';
import { ViewAnnouncementsComponent } from './view-announcements/view-announcements.component';


@NgModule({
  declarations: [CreateUpdateAnnouncementComponent, AnnouncementsListComponent, ViewAnnouncementsComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule
  ]
})
export class AnnouncementModule { }
