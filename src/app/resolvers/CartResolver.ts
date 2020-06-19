import { Injectable } from '@angular/core';
import { CartService } from '../cart.service';
import { IOrderDetail} from '../interfaces';
import { Resolve,RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CartResolver implements Resolve<IOrderDetail[]> {
  constructor(private cartService: CartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<IOrderDetail[]>|Promise<IOrderDetail[]>|IOrderDetail[]{

    return this.cartService.getOrderDetails();
 }
}
