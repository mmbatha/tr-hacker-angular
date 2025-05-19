import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComment(id: number): Observable<any> {
    return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  }
}
