import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OffersService} from "../../../services/offers.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Offer} from "../../../models/offer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-detail42',
  templateUrl: './detail42.component.html',
  styleUrls: ['./detail42.component.css']
})
export class Detail42Component implements OnInit, OnDestroy {

  private queryParamsSubscription: Subscription = null;
  private editedOfferId: number;
  private selectedOffer: Offer;

  constructor(private service: OffersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  private errorMessages(value: number): string {
    if (value == 1) {
      return "This field is required";
    }
    else if (value == 2) {
      return "This field does not match required minimum length";
    }
    else {
      return "This field does not match required pattern";
    }
  }

  private getOfferToBeEdited(index: number) {
    this.editedOfferId = index;
    this.selectedOffer= Offer.trueCopy(this.service.offers[index]);
  }

  private checkForZeroAndNegatives(): boolean {
    return this.selectedOffer.numberOfBids == 0 || this.selectedOffer.numberOfBids < 0 ||
      this.selectedOffer.numberOfBids == null;
  }

  private reset() {
    this.selectedOffer = Offer.trueCopy(this.service.offers[this.editedOfferId]);
  }

  private delete() {
    this.service.remove(this.editedOfferId);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
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
      this.detailForm.reset();
      this.detail2Form.reset();
      this.detail3Form.reset();
      this.detail4Form.reset();
      this.detail5Form.reset();
    }
  }

  private popupSave() {
    if (confirm("Are you sure to save edited changes?")) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute,
        queryParams: {offer: this.selectedOffer}});
    }
  }

  private popupDelete() {
    if (confirm("Are you sure to delete current offer?")) {
      this.delete();
    }
  }

  @ViewChild('editForm', {static: false})
  private detailForm: NgForm;
  @ViewChild('edit2Form', {static: false})
  private detail2Form: NgForm;
  @ViewChild('edit3Form', {static: false})
  private detail3Form: NgForm;
  @ViewChild('edit4Form', {static: false})
  private detail4Form: NgForm;
  @ViewChild('edit5Form', {static: false})
  private detail5Form: NgForm;

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
