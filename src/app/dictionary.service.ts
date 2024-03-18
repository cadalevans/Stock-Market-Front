import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private apiUrl = 'http://localhost:8001/definition/';

  constructor(private http: HttpClient) {}

  getDefinition(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${word}`);
  }
}
