import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './pages/register/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =  'http://localhost:8086/';
  private apiUrl1 = "http://localhost:8086/put";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8086/getplace");
  }

  public getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public create(user: any) {
    return this.http.post("http://localhost:8086/adduser", user,{responseType:'text' as 'json'});
  }

  public update(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl1}/${id}`, user);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Retrieve user's id

  private userIdKey = 'user_id';

setUserId(userId: number): void {
  localStorage.setItem(this.userIdKey, userId.toString());
}

getUserId(): number | null {
  const storedUserId = localStorage.getItem(this.userIdKey);
  return storedUserId ? parseInt(storedUserId, 10) : null;
}
  
}
