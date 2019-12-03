import {Component, OnInit} from '@angular/core';
import {AuctionStatus, Offer} from "../../../models/offer";

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.css']
})
export class Overview1Component implements OnInit {

  public offers: Offer[];
  private count: number = 0;

  constructor() { }

  public addRandomOffer() {
    const title: string = "This great article offer-" + this.count;
    const sellDate: Date = this.getRandomDate();
    const description: string = "This random article with number " + this.count;
    const numberOfBids: number = Math.round(Math.random() * 100);
    let auctionStatus: AuctionStatus = this.getRandomStatus();
    let valueHighestBid: number;

    if (numberOfBids == 0) {
      auctionStatus = AuctionStatus.NEW;
    }
    else {
      valueHighestBid = Math.round(Math.random() * 1000);
    }

    this.offers.push(new Offer(title, sellDate, description, auctionStatus, numberOfBids, valueHighestBid));
    this.count++;
  }

  private getRandomDate(): Date {
    const month: number = Math.round((Math.random() * 11) + 1);
    const day: number = Math.round((Math.random() * this.getDays(month)) + 1);
    return new Date(2019, month, day);
  }

  private getDays(month: number): number {
    let days = 0;

    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 9 || month == 11) {
      days = 31;
    }
    else if (month == 4 || month == 6 || month == 8 || month == 10 || month == 12) {
      days = 30;
    }
    else if (month == 2) {
      days = 28;
    }

    return days;
  }

  private getRandomStatus(): AuctionStatus {
    let statusNumber: number;
    statusNumber = Math.round(Math.random() * 8);
    switch (statusNumber) {
      case 0: {
        return AuctionStatus.NEW;
      }
      case 1: {
        return AuctionStatus.FOR_SALE;
      }
      case 2: {
        return AuctionStatus.SOLD;
      }
      case 3: {
        return AuctionStatus.PAID;
      }
      case 4: {
        return AuctionStatus.DELIVERED;
      }
      case 5: {
        return AuctionStatus.CLOSED;
      }
      case 6: {
        return AuctionStatus.EXPIRED;
      }
      case 7: {
        return AuctionStatus.WITHDRAWN;
      }
      default: {
        return AuctionStatus.NEW;
      }
    }
  }

  ngOnInit() {
    this.offers = [];
    for (let i = 0; i < 8; i++) {
      this.addRandomOffer();
    }
  }

}
