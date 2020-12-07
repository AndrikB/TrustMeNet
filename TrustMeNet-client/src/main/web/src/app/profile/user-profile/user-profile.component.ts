import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../core/models/User";
import {UserService} from "../../core/services/user.service";
import {SecurityService} from "../../core/services/security.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isOwn = false;
  isFriend = false;
  id: number;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public securityService: SecurityService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.route.snapshot.paramMap.get('id')) {
      this.id = this.securityService.getCurrentId();
    }
    this.isOwn = (this.id == this.securityService.getCurrentId());
    if (this.id == Number(this.route.snapshot.paramMap.get('id'))) {
      this.userService.checkFriendship(this.securityService.getCurrentId(), this.id).subscribe(data => {
        console.log(data)
        this.isFriend = data;
      });
    }
    this.userService.getUser(this.id).subscribe(data => this.user = data,
      error => this.router.navigate(['profile']))
  }

  friendship() {
    if (this.isFriend)
      this.userService.removeFriend(this.securityService.getCurrentId(), this.id).subscribe(data => {
        this.isFriend = false;
      });
    else
      this.userService.addFriend(this.securityService.getCurrentId(), this.id).subscribe(data => {
        this.isFriend = true
      });
  }

  changeStatus() {
    if (this.user.role=='USER'){
      this.userService.appointToModer(this.id).subscribe(data =>
        this.user.role = 'MODERATOR'
      );
    }
    else {
      this.userService.cancelAppointingToModer(this.id).subscribe(data =>
        this.user.role = 'USER'
      );
    }
  }
}
