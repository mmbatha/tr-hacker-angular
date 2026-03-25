// src/app/registration/tabs/acc.component.ts
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-card">
      <h2>Accommodation Details</h2>
      @if (details()) {
        <p><strong>Hall:</strong> {{ details().hallName }}</p>
        <p><strong>Room:</strong> {{ details().roomNumber }}</p>
      } @else {
        <p>Loading residence data for Student {{ studentId }}...</p>
      }
    </div>
  `
})
export class AccComponent implements OnInit {
  @Input() studentId!: string; // Received via ngComponentOutlet inputs
  private http = inject(HttpClient);
  details = signal<any>(null);

  ngOnInit() {
    this.http.get(`/api/students/${this.studentId}/accommodation`)
      .subscribe(data => this.details.set(data));
  }
}
