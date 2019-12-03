import { Injectable } from '@angular/core';
import {AuctionStatus, Offer} from "../models/offer";

@Injectable({
  providedIn: 'root'
})

export class OffersService {
  public offers: Offer[];
  private count: number = 0;

  constructor() {
    this.offers = [];
    for (let i = 0; i < 6; i++) {
      this.addRandomOffer();
    }
  }

  public add(offer: Offer): number {
    this.offers.push(offer);

    return this.offers.length - 1;
  }

  public update(index: number, offer: Offer) {
    this.offers[index] = offer;
  }

  public remove(index: number): Offer {
    const removedOffer: Offer = this.offers[index];
    this.offers.splice(index, 1);

    return removedOffer;
  }

  public addRandomOffer() {
    const title: string = "This great article offer-" + this.count;
    const sellingDate: Date = this.randomDate();
    const description: string = "Empty for now";
    let auctionStatus: AuctionStatus = this.getRandomStatus();
    const numberOfBids: number = Math.round(Math.random() * 100);
    if (numberOfBids == 0) {
      auctionStatus = AuctionStatus.NEW;
    }
    let valueHighestBid: number;

    if (numberOfBids !== 0) {
      valueHighestBid = Math.round(Math.random() * 1000);
    }

    this.offers.push(new Offer(title, sellingDate, description, auctionStatus, numberOfBids, valueHighestBid));
    this.count++;
  }

  private randomDate(): Date {
    const month: number = Math.round((Math.random() * 11) + 1);
    const day: number = Math.round((Math.random() * this.getNumberOfDaysInMonth(month)) + 1);
    return new Date(2019, month, day);
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

  private getNumberOfDaysInMonth(month: number): number {
    let numberOfDays = 0;

    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 9 || month == 11) {
      numberOfDays = 31;
    }
    else if (month == 4 || month == 6 || month == 8 || month == 10 || month == 12) {
      numberOfDays = 30;
    }
    else if (month == 2) {
      numberOfDays = 28;
    }

    return numberOfDays;
  }
}
