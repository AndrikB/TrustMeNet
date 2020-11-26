import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../core/models/User";

@Component({
  selector: '[app-users-list]',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: User[]

  constructor() {
  }

  ngOnInit(): void {
  }

}
