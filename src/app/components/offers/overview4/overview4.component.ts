import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../models/offer";
import { OffersService } from "../../../services/offers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css']
})
export class Overview4Component implements OnInit {

  public offers: Offer[];
  public isSelected: boolean = false;
  public selectOffer: Offer;
  public selectedIndex: number;

  constructor(private service: OffersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  private initiateSelectedOffer(index: number) {
    this.isSelected = true;
    this.selectOffer = Offer.trueCopy(this.service.offers[index]);
    this.selectedIndex = index;
  }

  private resetSelected() {
    this.selectOffer = null;
    this.isSelected = false;
  }

  public onSelectOffer(index: number) {
    if (this.isSelected && this.changes(index)) {
      if (confirm("Are you sure to discard edited changes?")) {
        this.initiateSelectedOffer(index);
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
          queryParams: {id: index}
        });
      }
    }

    this.initiateSelectedOffer(index);
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: index}
    });
  }

  private changes(index: number): boolean {
    return (index >= 0) ? false : this.selectOffer == this.service.offers[index];
  }

  public getAllOffers() {
    return this.service.offers;
  }

  ngOnInit() {
    this.offers = [];

    this.offers = this.service.offers;
  }

}
