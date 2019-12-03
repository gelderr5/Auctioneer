import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuctionStatus, Offer} from "../../../models/offer";
import {OffersService} from "../../../services/offers.service";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {

  @Input() selectedOffer: Offer;
  @Input() editedOfferId;
  @Input() selectedBoolean;
  @Output() selectedOfferChange = new EventEmitter();
  @Output() editedOfferIdChange = new EventEmitter();
  @Output() selectedBooleanChange = new EventEmitter();


  constructor(public service: OffersService) { }

  @Output()
  private setSelectedBoolean(boolean) {
    this.selectedBoolean = boolean;
    this.selectedBooleanChange.emit(this.selectedBoolean);
  }

  private cancel() {
    this.setSelectedBoolean(false);
  }

  private reset(index: number) {
    this.selectedOffer = Offer.trueCopy(this.service.offers[index]);
    this.selectedOfferChange.emit(this.selectedOffer);
  }

  private clear() {
    this.selectedOffer.title = "";
    this.selectedOffer.description = "";
    this.selectedOffer.auctionStatus = AuctionStatus.NEW;
    this.selectedOffer.numberOfBids = null;
    this.selectedOffer.valueHighestBid = null;
    this.selectedOfferChange.emit(this.selectedOffer);
  }

  public checkForChanges(): boolean {
    return (this.selectedOffer.title == this.service.offers[this.editedOfferId].title) &&
      (this.selectedOffer.description == this.service.offers[this.editedOfferId].description) &&
      (this.selectedOffer.auctionStatus == this.service.offers[this.editedOfferId].auctionStatus) &&
      (this.selectedOffer.numberOfBids == this.service.offers[this.editedOfferId].numberOfBids) &&
      (this.selectedOffer.valueHighestBid == this.service.offers[this.editedOfferId].valueHighestBid);
  }

  public popupDelete() {
    if (confirm("Are you sure to remove this offer?")) {
      this.service.remove(this.editedOfferId);
      this.setSelectedBoolean(false);
    }
  }

  public popupClear() {
    if (confirm ("Are you sure to clear fields?")) {
      this.clear();
    }
  }

  public popupReset() {
    if (confirm ("Are you sure to reset edited changes?")) {
      this.reset(this.editedOfferId);
    }
  }

  public popupCancel() {
    if (confirm("Are you sure to discard edited changes?")) {
      this.cancel();
    }
  }

  private popupSave() {
    if (confirm("Are you sure to save edited changes?")) {
      this.service.update(this.editedOfferId, this.selectedOffer);
      this.setSelectedBoolean(false);
    }
  }

  ngOnInit() {
  }
}
