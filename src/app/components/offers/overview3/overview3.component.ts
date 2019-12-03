import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../models/offer";
import { OffersService } from "../../../services/offers.service";

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})
export class Overview3Component implements OnInit {

  public offers: Offer[];
  public isSelected: boolean = false;
  public selectOffer: Offer;
  public selectedIndex: number;

  constructor(public service: OffersService) { }

  private activateSelected(title: string) {
    this.isSelected = true;

    for(let index in this.offers) {
      if (this.offers[index].title == title) {
        this.selectOffer = Offer.trueCopy(this.offers[index]);
        this.selectedIndex = this.offers.indexOf(this.offers[index], 0);
      }
    }
  }

  private resetSelected() {
    if (this.selectOffer != null) {
      this.selectOffer = null;
      this.isSelected = false;
    }
  }

  private noChanges(): boolean {
    return (this.selectOffer.title == this.service.offers[this.selectedIndex].title) &&
      (this.selectOffer.description == this.service.offers[this.selectedIndex].description) &&
      (this.selectOffer.auctionStatus == this.service.offers[this.selectedIndex].auctionStatus) &&
      (this.selectOffer.numberOfBids == this.service.offers[this.selectedIndex].numberOfBids) &&
      (this.selectOffer.valueHighestBid == this.service.offers[this.selectedIndex].valueHighestBid);
  }

  public popupSwitch(name: string) {
    if (this.isSelected && !this.noChanges()) {
      if (confirm("Are you sure to discard edited changes?")) {
        this.resetSelected();
        this.activateSelected(name);
      }
    }
    else {
      this.resetSelected();
      this.activateSelected(name);
    }
  }

  ngOnInit() {
    this.offers = [];

    this.offers = this.service.offers;
  }

}
