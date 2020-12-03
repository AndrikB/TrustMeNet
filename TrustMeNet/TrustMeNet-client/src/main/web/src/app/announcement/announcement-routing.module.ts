import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUpdateAnnouncementComponent} from "./create-update-announcement/create-update-announcement.component";
import {AnnouncementsListComponent} from "./announcements-list/announcements-list.component";
import {ViewAnnouncementsComponent} from "./view-announcements/view-announcements.component";
import {AuthGuardService as AuthGuard} from "../core/services/auth-guard.service";


const routes: Routes = [
  {path: 'announcement/:announcementId', component: ViewAnnouncementsComponent, canActivate: [AuthGuard]},
  {path: 'announcement/:announcementId/edit', component: CreateUpdateAnnouncementComponent, canActivate: [AuthGuard]},
  {path: 'newannouncement', component: CreateUpdateAnnouncementComponent, canActivate: [AuthGuard]},
  {path: 'announcements', component: AnnouncementsListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
