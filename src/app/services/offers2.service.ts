import { Injectable } from '@angular/core';
import {AuctionStatus, Offer} from "../models/offer";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class OffersService2 {
  public offers: Offer[];
  private count: number = 0;
  readonly databaseUrl: string = `https://the-auctioneer-c8b9a.firebaseio.com/offers.json`;

  constructor(private http: HttpClient) {

    this.offers = [];
    this.GetAllOffers().subscribe( (data) => {
      if (data === null) {
        for (let i = 0; i < 5; i++) {
          this.addRandomOffer();
        }
      }
      else {
        this.offers = data;
        this.count = this.offers.length - 1;
      }
    });
  }

  public add(offer: Offer): number {
    this.offers.push(offer);
    this.SaveAllOffers().subscribe(
      (data) => {}
    );

    return this.offers.length - 1;
  }

  public update(index: number, offer: Offer) {
    this.offers[index] = offer;
    this.SaveAllOffers().subscribe(
      (data) => {}
    );
  }

  public remove(index: number): Offer {
    const removedOffer: Offer = this.offers[index];
    this.offers.splice(index, 1);
    this.SaveAllOffers().subscribe(
      (data) => {}
    );

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
    this.SaveAllOffers().subscribe(
      (data) => {}
    );
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

  private GetAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.databaseUrl).pipe(catchError(this.errorHandler));
  }

  private SaveAllOffers(): Observable<Offer[]> {
    return this.http.put<Offer[]>(this.databaseUrl, this.offers);
  }

  private errorHandler(error: HttpErrorResponse) {
    let message: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status == 0) {
        message = 'Backend error: status: ' + error.message;
      } else {
        message = 'Backend error: status: ' + error.status + ' - ' + error.error.message;
      }

      console.log(message);
    }

    return throwError(message);
  }
}
