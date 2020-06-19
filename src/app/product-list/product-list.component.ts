import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<IProduct[]>(environment.productApiUrl+'/products')
      .subscribe((data) => {
        this.products = data;
      });
    console.log(this.products);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
