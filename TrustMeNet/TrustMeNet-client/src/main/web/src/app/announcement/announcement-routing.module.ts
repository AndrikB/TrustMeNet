import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUpdateAnnouncementComponent} from "./create-update-announcement/create-update-announcement.component";
import {AnnouncementsListComponent} from "./announcements-list/announcements-list.component";
import {ViewAnnouncementsComponent} from "./view-announcements/view-announcements.component";

const routes: Routes = [
  {path: 'announcement/:announcementId', component: ViewAnnouncementsComponent},
  {path: 'announcement/:announcementId/edit', component: CreateUpdateAnnouncementComponent},
  {path: 'newannouncement', component: CreateUpdateAnnouncementComponent},
  {path: 'announcements', component: AnnouncementsListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
