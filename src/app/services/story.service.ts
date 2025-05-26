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

  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/topstories.json`);
  }

  getNewStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/newstories.json`);
  }

  getBestStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/beststories.json`);
  }

  getStoriesByType(sType: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/${sType}stories.json`);
  }
}
