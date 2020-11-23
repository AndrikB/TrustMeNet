import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ProfileModule { }
