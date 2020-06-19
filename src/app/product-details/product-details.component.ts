import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product;

  checkoutForm;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      quantity: 1,
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.http
        .get<IProduct>(environment.apiUrl + '/products/' + params.get('id'))
        .subscribe((data) => {
          this.product = data;
        });
      console.log(this.product);
    });
  }

  addToCart(product: IProduct, customerData) {
    console.log('Your order has been submitted', customerData['quantity']);
    this.cartService
      .addToCart(product, customerData['quantity'])
      .subscribe((data) => {
        window.alert(product.name + ' has been added to your cart!');
        this.router.navigate(['/cart']);
      });
  }
}
