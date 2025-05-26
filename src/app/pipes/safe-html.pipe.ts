import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  /**
   * Basic ctor.
   */
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: string | null | undefined) {
    return this.sanitizer.bypassSecurityTrustHtml(value || '');
  }

}
