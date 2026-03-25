import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { Router } from '@angular/router';

// src/app/home/home.component.ts
@Component({
  template: `
    <h1>Welcome to Student Portal</h1>
    <div class="role-grid">
      <button (click)="onRoleSelect('Admin')">Admin Portal</button>
      <button (click)="onRoleSelect('Faculty')">Faculty Portal</button>
      <button (click)="onRoleSelect('Student')">Student Portal</button>
    </div>
  `
})
export class HomeComponent {
  menuService = inject(MenuService);
  router = inject(Router);

  async onRoleSelect(role: any) {
    await this.menuService.fetchMenuForRole(role);
    this.router.navigate(['/dashboard']);
  }
}
