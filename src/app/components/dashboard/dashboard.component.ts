import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../services/menu.services';
import { TAB_REGISTRY } from '../../registration/tab-registry';

// src/app/dashboard/dashboard.component.ts
@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="sidebar">
      <h3>{{ menuService.currentRole() }} Panel</h3>
      @for (item of menuService.menuItems(); track item.tabId) {
        <button (click)="loadTab(item.displayTabIdentifier)">
          {{ item.displayName }}
        </button>
      }
    </nav>

    <main class="content">
      @if (menuService.isLoading()) {
        <div class="loader">Fetching configuration...</div>
      }

      @if (activeComponent()) {
        <!-- Lazy loads the component only when needed -->
        <ng-container *ngComponentOutlet="activeComponent();
        inputs: {studentId: currentId() }"></ng-container>
      }
    </main>
  `
})
export class DashboardComponent {
  menuService = inject(MenuService);
  activeComponent = signal<any>(null);

  async loadTab(identifier: string) {
    const componentClass = await TAB_REGISTRY[identifier]();
    this.activeComponent.set(componentClass);
  }
}
