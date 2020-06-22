import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct, IOrderDetail } from './interfaces';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  orderDetails: IOrderDetail[] = [];
  map = new Map();

  updateCart(product: IProduct, quantity: number): Observable<IOrderDetail[]> {
    let orderDetail: IOrderDetail = {
      customerId: environment.username,
      orderId: 1,
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      price: product.price,
      totalPrice:Number(quantity)*Number(product.price)
    };
    return this.http.put<IOrderDetail[]>(
      environment.cartApiUrl + '/cartItems/customer/' + environment.username,
      orderDetail
    );
  }
  getOrderDetails(): Observable<IOrderDetail[]> {
    console.log('cart service ');
    return this.http.get<IOrderDetail[]>(
      environment.cartApiUrl + '/cartItems/customer/' + environment.username
    );
  }

  removeFromCart(productName: String): Observable<any> {
    return this.http.delete(
      environment.cartApiUrl +
        '/cartItems/customer/' +
        environment.username +
        '/products/' +
        productName
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(
      environment.cartApiUrl + '/cartItems/customer/' + environment.username
    );
  }
}
