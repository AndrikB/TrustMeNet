import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";


const routes: Routes = [
  {path: 'profile', component: UserProfileComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'edit', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
