import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './pages/other';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 
  private baseUrl = 'http://localhost:8001'; // Change this URL to your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  getAllOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user-orders/${userId}`);
  }
  getTotalBenefit(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/users/${userId}/total-benefit`);
  }
  
}
