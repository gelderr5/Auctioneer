import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Overview2Component} from "../overview2/overview2.component";
import {Offer} from "../../../models/offer";

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input() selectedOffer: Offer;
  @Output() selectedOfferChange = new EventEmitter();

  constructor(public overview2: Overview2Component) { }

  public remove(index: number) {
    this.overview2.offers.splice(index, 1);
    this.overview2.resetSelected();
  }

  public save(index: number, offer: Offer) {
    this.overview2.offers[index] = offer;
    this.overview2.resetSelected();
  }

  ngOnInit() {
  }
}
