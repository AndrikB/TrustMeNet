import { Component, OnInit } from '@angular/core';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickOn() {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');
  }
}
