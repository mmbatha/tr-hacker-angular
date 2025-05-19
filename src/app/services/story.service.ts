import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';
  constructor(private http: HttpClient) { }

  getStory(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.baseUrl}/item/${id}.json`);
  }

  getTopStoryIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/topstories.json`);
  }
}
