import { Subscription } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  key;
  order;
  totalPrice: number;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private orderS: OrderService) {
    this.key = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.subscription = this.orderS.getOrder(this.key).subscribe(order => {
      this.order = order;
      this.totalPrice = 0;
      for (let item of this.order.items) {
        this.totalPrice += item.totalPrice;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
