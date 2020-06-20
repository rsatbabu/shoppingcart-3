export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  instock:number;
}

export interface IOrderDetail {
    orderId: number;
    customerId: string;
    productName: string;
    productId: number;
    quantity: number;
    price : number;
    totalPrice:number;
}
export interface IOrderEvent{
  customerId: string;
  productId: number;
  quantity: number;
}
