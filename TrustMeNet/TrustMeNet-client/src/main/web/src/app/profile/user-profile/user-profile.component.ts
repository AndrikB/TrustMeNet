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

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private securityService: SecurityService,
              private router: Router) {
  }

  isOwn = false;
  isFriend = false;

  user: User;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(!this.route.snapshot.paramMap.get('id')){
      id = this.securityService.getCurrentId();
      this.isOwn = true;
    }
    this.userService.getUser(id).subscribe(data => this.user = data,
        error => this.router.navigate(['profile']))
  }

  friendship() {

  }
}
