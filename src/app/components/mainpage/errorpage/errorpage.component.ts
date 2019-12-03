import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {

  public messageError: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.messageError = 'coco';
    this.route.data.subscribe( (data: Data) => {
      this.messageError = data['message'];
    });
  }

}
