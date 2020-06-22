import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,ExtraOptions } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './Cart/Cart.component';
import { HttpClientModule } from '@angular/common/http';
import { PurchaseCompleteComponent } from './purchase-complete/purchase-complete.component';

import { CartResolver } from './resolvers/cartResolver';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot([

        { path: '', component: ProductListComponent },
        { path: 'products/:id', component: ProductDetailsComponent ,
        resolve: { orderDetails: CartResolver }},

        { path: 'cart', component: CartComponent,
        resolve: { orderDetails: CartResolver }, runGuardsAndResolvers: 'always', },
        { path: 'purchase-complete', component: PurchaseCompleteComponent },

      ], { onSameUrlNavigation: 'reload' }),
      NoopAnimationsModule
   ],
   declarations: [
      AppComponent,
      TopBarComponent,
      ProductListComponent,
      ProductDetailsComponent,
      CartComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
