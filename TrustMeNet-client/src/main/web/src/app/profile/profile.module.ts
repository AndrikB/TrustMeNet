import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { UsersListComponent } from './users-list/users-list.component';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';



@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent, UsersListComponent, AllUsersListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ProfileModule { }
