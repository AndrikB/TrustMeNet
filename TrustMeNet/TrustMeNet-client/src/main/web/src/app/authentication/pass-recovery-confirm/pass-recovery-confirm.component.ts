import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pass-recovery-confirm',
  templateUrl: './pass-recovery-confirm.component.html',
  styleUrls: ['./pass-recovery-confirm.component.css']
})
export class PassRecoveryConfirmComponent implements OnInit {

  isConfirmed: Boolean;
  token: string;
  newPassword: string="";


  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.authenticationService.confirmResetPass(this.token)
      .subscribe(
        isConfirmed => {
          this.isConfirmed = isConfirmed;
        },
        error => {
          this.isConfirmed = false;
        }
      );
  }

  createNewPass() {
    this.authenticationService.createNewPass(this.token, this.newPassword)
      .subscribe(
        data => {
          this.router.navigate(['/login']).then();
        },
        error => {
          //error
        });
  }
}
