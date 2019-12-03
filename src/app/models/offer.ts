import {formatDate} from "@angular/common";

export class Offer {
  title: string;
  sellDate: Date;
  sellDateString: string;
  description: string;
  auctionStatus: AuctionStatus;
  numberOfBids: number;
  valueHighestBid: number;

  constructor(title: string, sellDate: Date, description: string, auctionStatus: AuctionStatus, numberOfBids: number,
              valueHighestBid: number) {
    this.title = title;
    this.sellDate = sellDate;
    this.description = description;
    this.auctionStatus = auctionStatus;
    this.numberOfBids = numberOfBids;
    this.valueHighestBid = valueHighestBid;
    this.sellDateString = formatDate(sellDate, 'EEEE, d MMMM yyyy', 'en');
  }

  public static trueCopy(offer: Offer): Offer {
    return Object.assign(
      new Offer(
        offer.title,
        offer.sellDate,
        offer.description,
        offer.auctionStatus,
        offer.numberOfBids,
        offer.valueHighestBid
      )
    )
  }
}

export enum AuctionStatus {
  NEW = 'NEW', FOR_SALE = 'FOR_SALE', SOLD = 'SOLD', PAID = 'PAID', DELIVERED = 'DELIVERED', CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED', WITHDRAWN = 'WITHDRAWN'
}
