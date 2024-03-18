import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './stock/stock';
import { Sicav } from './pages/tables/sicav';

@Injectable({
  providedIn: 'root'
})
export class SicavService {

  private baseUrl = 'http://localhost:8001';

  constructor(private http: HttpClient) { }

  getsicav(): Observable<Sicav[]> {
    return this.http.get<Sicav[]>(`${this.baseUrl}/getsicav`);
  }
}
