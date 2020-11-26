import { Component, OnInit } from '@angular/core';
// @ts-ignore
import $ from "jquery";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

  clickOn() {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');
  }
}
