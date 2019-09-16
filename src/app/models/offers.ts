export class Offers {
  title: string;
  sellDate: Date;
  description: string;
  auctionStatus: AuctionStatus;
  numberOfBids: number;
  valueHighestBid: number;
}

enum AuctionStatus {
  NEW, FOR_SALE, SOLD, PAID, DELIVERED, CLOSED, EXPIRED, WITHDRAWN
}

