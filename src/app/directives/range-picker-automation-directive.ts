import { Directive, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';

/**
 * @description
 * A directive for `nz-range-picker` that automatically injects automation attributes 
 * (`data-testid` and `id`) into the internal HTML `<input>` elements.
 * 
 * This avoids the need for complex custom templates while providing precise 
 * selectors for automated testing tools like Playwright, Cypress, or Selenium.
 * 
 * @example
 * <!-- Template -->
 * <nz-range-picker automationId="login-range"></nz-range-picker>
 * 
 * <!-- Resulting DOM -->
 * <input data-testid="login-range-start" id="login-range-start" ... />
 * <input data-testid="login-range-end" id="login-range-end" ... />
 * 
 * @usageNotes
 * 1. Ensure the `RangePickerAutomationDirective` is declared/imported in your module.
 * 2. Use the `automationId` input to set the base name.
 * 3. In tests, target `[data-testid="your-id-start"]` for the first input.
 */
@Directive({
  selector: 'nz-range-picker[automationId]'
})
export class RangePickerAutomationDirective implements AfterViewInit {
  /**
   * The base string used to generate unique IDs for the range inputs.
   * Will be suffixed with `-start` and `-end`.
   */
  @Input() automationId: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Find the two internal input elements used by the range picker
    const inputs = this.el.nativeElement.querySelectorAll('input');
    
    inputs.forEach((input: HTMLInputElement, index: number) => {
      const suffix = index === 0 ? '-start' : '-end';
      const testId = `${this.automationId}${suffix}`;

      // Set data-testid for modern testing (Playwright, Cypress)
      this.renderer.setAttribute(input, 'data-testid', testId);
      
      // Optionally set id for legacy automation tools
      this.renderer.setAttribute(input, 'id', testId);
    });
  }
}
