import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="admin-card">
      <h3>Faculty Grade Entry</h3>
      <form [formGroup]="gradeForm" (ngSubmit)="submitGrade()">
        <label>Student Name</label>
        <input formControlName="studentName" placeholder="Search student...">
        
        <label>Final Grade</label>
        <select formControlName="grade">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="F">F</option>
        </select>

        <button type="submit" [disabled]="gradeForm.invalid">Submit Grade</button>
      </form>

      @if (successMessage()) {
        <p class="success">{{ successMessage() }}</p>
      }
    </div>
  `
})
export class GradesComponent {
  private fb = inject(FormBuilder);
  successMessage = signal('');

  gradeForm = this.fb.group({
    studentName: ['', Validators.required],
    grade: ['A', Validators.required]
  });

  submitGrade() {
    console.log('Saving grade:', this.gradeForm.value);
    this.successMessage.set('Grade submitted successfully!');
    this.gradeForm.reset({ grade: 'A' });
  }
}
