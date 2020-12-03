import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { UsersListComponent } from './users-list/users-list.component';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { FriendListComponent } from './friend-list/friend-list.component';



@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent, UsersListComponent, AllUsersListComponent, AchievementsComponent, FriendListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ProfileModule { }
