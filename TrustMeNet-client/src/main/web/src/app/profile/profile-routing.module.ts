import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {AllUsersListComponent} from "./all-users-list/all-users-list.component";
import {FriendListComponent} from "./friend-list/friend-list.component";


const routes: Routes = [
  {path: 'profile', component: UserProfileComponent},
  {path: 'users', component: AllUsersListComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'edit', component: EditProfileComponent},
  {path: 'friends', component: FriendListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
