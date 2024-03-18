import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from './pages/maps/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private apiUrl =  'http://localhost:8086/Place';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Place[]> {
    return this.http.get<Place[]>("http://localhost:8086/getplace");
  }

  public getById(id: string): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  public create(place: any) {
    return this.http.post(this.apiUrl, place,{responseType:'text' as 'json'});
  }

  public update(id: string, place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.apiUrl}/${id}`, place);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
