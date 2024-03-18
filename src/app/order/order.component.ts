import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../pages/other';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  

  orders: Order[] = [];
  constructor(private http: HttpClient,private orderService: OrderService,private userService: UserService) { }
  userId = this.userService.getUserId();
  ngOnInit(): void {
    this.fetchOrders();
    this.getTotalAmount(this.userId);
    this.benefit
    this.getTotalValue(this.userId);
  }

   

  fetchOrders(): void {
    this.orderService.getAllOrdersByUserId(this.userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  benefit(): void {
    this.orderService.getTotalBenefit(this.userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getTotalAmount(userId: number) {
    this.http.get<number>(`/api/users/${userId}/total-amount`).subscribe(
      (totalBenefit) => {
        // Process the retrieved total benefit here
        console.log('Total Benefit:', totalBenefit);
      },
      (error) => {
        console.error('Error fetching total benefit:', error);
      }
    );
  }
  
  getTotalValue(userId: number) {
    this.http.get<number>(`/api/users/${userId}/total-value`).subscribe(
      (totalBenefit) => {
        // Process the retrieved total benefit here
        console.log('Total Benefit:', totalBenefit);
      },
      (error) => {
        console.error('Error fetching total benefit:', error);
      }
    );
  }
  

}
