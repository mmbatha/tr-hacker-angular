import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TabDetail } from '../models/tab-detail';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  getTabsForUnit(serial: string): Observable<TabDetail[]> {
    // Replace with: return this.http.get<TabDetail[]>(`/api/units/${serial}/tabs`);
    // Mocking a delayed response for demonstration:
    return of([
      { tabId: 1, displayName: 'Overview', displayTabId: 'ov-1' },
      { tabId: 2, displayName: 'Settings', displayTabId: 'st-2' }
    ]).pipe(delay(1000));
  }
}
