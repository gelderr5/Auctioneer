import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  myDate = formatDate(new Date(), 'EEEE, d MMMM yyyy', 'en');

  constructor() {
  }

  ngOnInit() {

  }


}
