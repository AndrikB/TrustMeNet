import { Component, OnInit } from '@angular/core';
import {User} from "../../core/models/User";
import {UserService} from "../../core/services/user.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: User;
  passwordNew: string = '';
  firstSelected: boolean = true;

  ngOnInit(): void {
    this.userService.getUser(7).subscribe(data => this.user = data, error => console.log(error))
  }

  edit() {

  }

  checkPasswords() {

  }
}
