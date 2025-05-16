import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [SafeHtmlPipe]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize and trust HTML content', ()=>{
    const html = '<p>Hello <b>world</b></p>';
    const result = pipe.transform(html);
    expect(result).toBeTruthy();
  });

  it("should handle 'null' or 'undefined' value gracefully'", ()=>{
    expect(pipe.transform(null)).toBeTruthy();
    expect(pipe.transform(undefined)).toBeTruthy();
  })
});
