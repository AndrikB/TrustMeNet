import {Component, OnInit} from '@angular/core';
import {User} from "../../core/models/User";
import {UserService} from "../../core/services/user.service";
import {SecurityService} from "../../core/services/security.service";
import {Router} from "@angular/router";
import {AlertService} from "../../core/services/alert.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  id: number;
  user: User;
  passwordNew: string = '';
  firstSelected: boolean = true;

  constructor(private userService: UserService,
              private securityService: SecurityService,
              private alert: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.securityService.getCurrentId();
    this.userService.getUser(this.id).subscribe(data => this.user = data, error => console.log(error))
  }


  edit(id: number, firstname: string, secondname: string, profile: string) {
    let editedUser: User = {
      id: id,
      firstName: firstname,
      secondName: secondname,
      login: this.user.login,
      mail: this.user.mail,
      password: this.user.password,
      profile: profile,
      rating: this.user.rating,
      registrationDate: this.user.registrationDate,
      imageId: this.user.imageId,
      image: this.user.image,
      status: this.user.status
    };

    this.userService.updateUser(editedUser).subscribe(data => {
      this.router.navigate(['profile']).then();
    });
  }


  checkPasswords(oldPassword: string, newPassword: string, confirmPassword: string) {
    if (oldPassword == "" || newPassword == "" || confirmPassword == "") {
      return;
    }

    if (newPassword != confirmPassword) {
      return;
    }

    this.userService.checkPasswords(this.user.login, oldPassword).subscribe(data => {
      console.log("check " + data);
      if (data) {
        this.changePassword(newPassword);
      } else {
      }
    });
  }

  changePassword(newPassword: string) {
    this.userService.changePassword(this.user.login, newPassword).subscribe(data => {
      this.router.navigate(['profile']).then()
    });
  }

  uploadFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    if (file.size / 1024 / 1024 > 1) {
      this.alert.error("The image is too big");
      return;
    }
    reader.addEventListener('load', (event: any) => {
      this.userService.changeImage(file).subscribe(
        id => {
          this.user.imageId = <number>id;
          this.user.image.src = event.target.result.split('base64,')[1];
          console.log(event.target.result);
        },
        error => {
          console.log(error);
          this.alert.error("Cant change image");
        });
    });
    reader.readAsDataURL(file);
  }
}
