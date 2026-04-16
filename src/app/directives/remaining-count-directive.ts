import { Directive, ElementRef, Input, OnInit, Renderer2, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: 'textarea[nz-input][remainingCount]',
  standalone: true
})
export class RemainingCountDirective implements OnInit {
  @Input('remainingCount') max: number = 0;
  private countElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Create the display element
    this.countElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.countElement, 'text-align', 'right');
    this.renderer.setStyle(this.countElement, 'color', 'rgba(0,0,0,0.45)');
    this.renderer.setStyle(this.countElement, 'font-size', '12px');
    this.renderer.setStyle(this.countElement, 'margin-top', '4px');
    
    // Insert it after the textarea
    const parent = this.el.nativeElement.parentNode;
    this.renderer.appendChild(parent, this.countElement);
    
    this.updateCount();
  }

  @HostListener('input')
  onInput(): void {
    this.updateCount();
  }

  private updateCount(): void {
    const currentLength = this.el.nativeElement.value?.length || 0;
    const remaining = this.max - currentLength;
    const label = remaining === 1 ? 'character' : 'characters';
    
    this.countElement.innerText = `${remaining} ${label} left`;
  }
}
