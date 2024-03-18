export class Order {
    id: number;
    orderSide: string;
    quantity: number;
    price: number;
    timestamp: Date;
    status: string;
    buyingPrice: number;
    enterprise: string;
    gainLoss: number;
    percentageGainLoss: number;
    user: any; // You might want to create a User model as well
  }
  