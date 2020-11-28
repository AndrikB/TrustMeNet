import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-all-users-list',
  templateUrl: './all-users-list.component.html',
  styleUrls: ['./all-users-list.component.css']
})
export class AllUsersListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[] = [];
  isWaiting: boolean = false;

  ngOnInit(): void {
    this.getNew()
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop -
      document.documentElement.clientHeight < 40) {
      if (this.users.length % 10 == 0) this.getNew();
    }
  }


  getNew(): void {
    if (this.isWaiting) {
      return;
    }
    this.isWaiting = true;
    this.userService.getUsers(this.users.length)
      .subscribe(
        users => {
          if (users.length == 0) {
            return;
          }
          this.isWaiting = false;
          this.users = this.users.concat(users);
        },
        err => {
          console.log(err);
        })

  }

}
