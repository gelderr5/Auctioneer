import {Component, OnDestroy, OnInit} from '@angular/core';
import {OffersService} from "../../../services/offers.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuctionStatus, Offer} from "../../../models/offer";

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnDestroy {

  private queryParamsSubscription: Subscription = null;
  private editedOfferId: number;
  private selectedOffer: Offer;

  constructor(private service: OffersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  private reset() {
    this.selectedOffer = Offer.trueCopy(this.service.offers[this.editedOfferId]);
  }

  private clear() {
    this.selectedOffer.title = "";
    this.selectedOffer.description = "";
    this.selectedOffer.auctionStatus = AuctionStatus.NEW;
    this.selectedOffer.numberOfBids = 0;
    this.selectedOffer.valueHighestBid = null;
  }

  private delete() {
    this.service.remove(this.editedOfferId);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }

  private getOfferToBeEdited(index: number) {
    this.editedOfferId = index;
    this.selectedOffer= Offer.trueCopy(this.service.offers[index]);
  }

  private change(): boolean {
    return (this.selectedOffer.title != this.service.offers[this.editedOfferId].title) ||
      (this.selectedOffer.description != this.service.offers[this.editedOfferId].description) ||
      (this.selectedOffer.auctionStatus != this.service.offers[this.editedOfferId].auctionStatus) ||
      (this.selectedOffer.numberOfBids != this.service.offers[this.editedOfferId].numberOfBids) ||
      (this.selectedOffer.valueHighestBid != this.service.offers[this.editedOfferId].valueHighestBid);
  }

  private popupCancel() {
    if (this.change()) {
      if (confirm("Are you sure to discard edited changes?")) {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute});
      }
    }
    else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    }
  }

  private popupReset() {
    if (confirm("Are you sure to reset edited changes?")) {
      this.reset();
    }
  }

  private popupClear() {
    if (confirm("Are you sure to clear fields?")) {
      this.clear();
    }
  }

  private popupSave() {
    if (confirm("Are you sure to save edited ?")) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute,
        queryParams: {offer: this.selectedOffer}});
    }
  }

  private popupDelete() {
    if (confirm("Are you sure to delete the current offer?")) {
      this.delete();
    }
  }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
          console.log(params);
          this.getOfferToBeEdited(params['id'] || -1);
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription &&
      this.queryParamsSubscription.unsubscribe();
  }
}
