import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';
  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${id}.json`);
  }
}
