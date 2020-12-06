import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.css']
})
export class MailConfirmComponent implements OnInit {

  isConfirmed: boolean;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    this.authenticationService.confirmMail(token)
      .subscribe(
        isConfirmed => {
          this.isConfirmed = isConfirmed;
        },
        _ => {
          this.isConfirmed = false;
        }
      );
  }

}
