import { Component, OnInit } from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/User";
import {SecurityService} from "../../core/services/security.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  constructor(private userService: UserService,
              private securityService: SecurityService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getFriends(this.securityService.getCurrentId())
      .subscribe(
        users => {
          this.users = users;
        },
        err => {
          console.log(err);
        })
  }

}
