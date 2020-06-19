import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-purchase-complete',
  templateUrl: './purchase-complete.component.html',
  styleUrls: ['./purchase-complete.component.css']
})
export class PurchaseCompleteComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

}
