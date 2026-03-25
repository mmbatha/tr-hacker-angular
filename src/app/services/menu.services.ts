import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { delay, firstValueFrom, Observable, of } from 'rxjs';
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
  // State Signals
  currentRole = signal<'Admin' | 'Faculty' | 'Student' | null>(null);
  menuItems = signal<any[]>([]);
  isLoading = signal(false);

  async fetchMenuForRole(role: 'Admin' | 'Faculty' | 'Student') {
    this.currentRole.set(role);
    this.isLoading.set(true);
    
    try {
      // Fetch dynamic menu from backend based on role
      const data = await firstValueFrom(this.http.get<any[]>(`/api/menu/${role}`));
      this.menuItems.set(data);
    } finally {
      this.isLoading.set(false);
    }
  }
}
