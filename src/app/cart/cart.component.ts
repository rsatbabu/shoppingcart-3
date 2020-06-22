import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrderDetail, IProduct, IOrderEvent } from '../interfaces';
import { environment } from '../../environments/environment';

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
  total : Number;

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: { orderDetails: IOrderDetail[] }) => {
        this.orderDetails = data.orderDetails;

        this.total = this.orderDetails.reduce(function (accumulator, orderDetail) {
          return accumulator + orderDetail.totalPrice;
        }, 0);
      }
    );
  }

  editCart(orderDetail: IOrderDetail){
    this.router.navigate(['/products/'+orderDetail.productId]);
  }

   removeFromCart(productName: String) {
    if( window.confirm(productName+' will be removed from cart?')){
      this.cartService.removeFromCart(productName).subscribe((data) => {

        this.router.navigate(['/cart']);
    });
    }


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
      .post(environment.cartApiUrl + '/orderEvents', orderEvents)
      .subscribe((data) => {
        console.log(data);
        this.cartService.clearCart().subscribe((data) =>{

          this.router.navigate(['/purchase-complete']);
        });

      });
  }
}
