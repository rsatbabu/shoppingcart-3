import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { IProduct, IOrderDetail } from '../interfaces';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  edit: boolean;

  checkoutForm;

  orderDetails: IOrderDetail[];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.edit = false;
    this.checkoutForm = this.formBuilder.group({
      quantity: 1,
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: { orderDetails: IOrderDetail[] }) => {
      this.orderDetails = data.orderDetails;
      console.log('product-details' + this.orderDetails.length);
    });

    this.route.paramMap.subscribe((params) => {
      let orderDetail: IOrderDetail;
      orderDetail = this.orderDetails.find(
        (od) => od.productId === Number(params.get('id'))
      );
      this.http
        .get<IProduct>(environment.productApiUrl + '/products/' + params.get('id'))
        .subscribe((data) => {
          this.product = data;
        });
      console.log(this.product);

      if (orderDetail) {
        this.edit = true;
        this.checkoutForm = this.formBuilder.group({
          quantity: orderDetail.quantity,
        });
      }
    });

    this.route.paramMap.subscribe((params) => {});
  }

  addToCart(product: IProduct, customerData) {
    console.log('Your order has been submitted', customerData['quantity']);
    this.cartService
      .updateCart(product, customerData['quantity'])
      .subscribe((data) => {
        window.alert(product.name + ' has been added to your cart!');
        this.router.navigate(['/cart']);
      });
  }
}
