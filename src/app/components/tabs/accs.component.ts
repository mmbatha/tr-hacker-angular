import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit, signal } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="card">
      <h3>Digital Accessories</h3>
      @if (accessories().length > 0) {
        <ul>
          @for (item of accessories(); track item.serialNumber) {
            <li>
              <strong>{{ item.type }}:</strong> {{ item.model }} 
              <span class="tag">{{ item.status }}</span>
            </li>
          }
        </ul>
      } @else {
        <p class="empty">No accessories assigned to student {{ studentId }}</p>
      }
    </div>
  `
})
export class AccsComponent implements OnInit {
  @Input() studentId!: string;
  private http = inject(HttpClient);
  
  accessories = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`/api/students/${this.studentId}/accessories`)
      .subscribe(data => this.accessories.set(data));
  }
}
