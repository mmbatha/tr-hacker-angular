import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RemainingCountDirective } from './remaining-count-directive';

// 1. Mock component to host the directive
@Component({
  template: `
    <textarea 
  nz-input 
  [remainingCount]="200" 
  [(ngModel)]="textValue" 
  maxlength="200">
</textarea>
  `
})
class TestHostComponent {}

describe('RemainingCountDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestHostComponent, 
        RemainingCountDirective // 2. Declare the directive
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Trigger AfterViewInit
  });
// TODO: Complete these tests
  it('should apply suffixed data-testid and id to internal inputs', () => {
    // Find the inputs inside the host
    const inputs = fixture.debugElement.queryAll(By.css('input'));

    expect(inputs.length).toBe(2);

    // 3. Assert Start Input attributes
    const startInput = inputs[0].nativeElement;
    expect(startInput.getAttribute('data-testid')).toBe('order-dates-start');
    expect(startInput.getAttribute('id')).toBe('order-dates-start');

    // 4. Assert End Input attributes
    const endInput = inputs[1].nativeElement;
    expect(endInput.getAttribute('data-testid')).toBe('order-dates-end');
    expect(endInput.getAttribute('id')).toBe('order-dates-end');
  });
});
