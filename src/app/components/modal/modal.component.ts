import { Component, EventEmitter, inject, Input, Output, ViewContainerRef } from "@angular/core";

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal">
      <h2>{{modalTitle}}</h2>
      <p>{{modalContent}}</p>
      <button (click)="sendCloseEvent()">Close</button>
    </div>
  `,
  styles: [`
    .modal {
    /* Basic styling for demonstration purposes */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border: 1px solid #ccc;
      z-index: 1000;
    }
  `]
})

export class ModalComponent {
  @Input() modalTitle!: string;
  @Input() modalContent!: string;
  @Output() closeModal = new EventEmitter<void>();

  vcr = inject(ViewContainerRef);

  sendCloseEvent() {
    this.closeModal.emit();
  }
}