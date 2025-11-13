import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-matrix-rain',
  imports: [],
  templateUrl: './matrix-rain.component.html',
  styleUrl: './matrix-rain.component.less'
})
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private columns: number = 0;
  private drops: number[] = [];
  private fontSize: number = 16;
  private alphabet: string = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.initializeCanvas();
    this.draw();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.initializeCanvas();
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.columns = Math.floor(canvas.width / this.fontSize);
    this.drops = [];
    for (let x = 0; x < this.columns; x++) {
      // this.drops[x] = Math.random() * canvas.height;
      this.drops[x] = 1;
    }
  }

  private draw(): void {
    // Transparent black rectangle to create the fading trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.ctx.fillStyle = '#0F0'; // Green color for the characters
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Pick a random character from the alphabet
      const text = this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));

      // Draw the character at the current drop position
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      // Send the drop back to the top randomly or when it hits the bottom
      if (this.drops[i] * this.fontSize > this.canvasRef.nativeElement.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      // Move the drop down one step
      this.drops[i]++;
    }

    // Loop the animation using requestAnimationFrame
    this.animationFrameId = requestAnimationFrame(() => this.draw());
  }
}
