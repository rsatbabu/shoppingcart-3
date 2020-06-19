import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrderDetail, IProduct, IOrderEvent } from '../interfaces';
import { environment } from '../../environments/environment';
import { CartResolver } from '../resolvers/cartResolver';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  orderDetails: IOrderDetail[];

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: { orderDetails: IOrderDetail[] }) => {
        this.orderDetails = data.orderDetails;

      }
    );
  }

  async removeFromCart(productName: String) {

    this.cartService.removeFromCart(productName).subscribe((data) => {
      window.alert('Congratulations!!! Your order will be shopped soon. ');
      this.router.navigate(['/cart']);
    });

    console.log(this.orderDetails.length);
  }
  purchase() {
    let orderEvents: IOrderEvent[] = [];

    this.orderDetails.forEach((orderDetail) => {
      let orderEvent: IOrderEvent = {
        customerId: orderDetail.customerId,
        productId: orderDetail.productId,
        quantity: orderDetail.quantity,
      };
      orderEvents.push(orderEvent);
    });
    this.http
      .post(environment.apiUrl + 'orderEvents', orderEvents)
      .subscribe((data) => {
        console.log(data);
        this.cartService.clearCart().subscribe((data) =>{
          window.alert('Congratulations!!! Your order will be shopped soon. ');
          this.router.navigate(['/']);
        });

      });
  }
}
