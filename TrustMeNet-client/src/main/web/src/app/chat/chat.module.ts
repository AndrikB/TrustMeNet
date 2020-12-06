import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ChatListComponent, ChatAreaComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ]
})
export class ChatModule { }
