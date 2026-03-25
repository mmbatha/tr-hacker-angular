import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// src/app/registration/admin/users.component.ts
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="admin-panel">
      <h2>System User Management</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          @for (user of users(); track user.id) {
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.role }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class UsersComponent implements OnInit {
  private http = inject(HttpClient);
  users = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>('/api/admin/users').subscribe(list => this.users.set(list));
  }
}
