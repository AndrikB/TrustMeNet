import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [SidebarComponent, AlertComponent],
  exports: [
    SidebarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
