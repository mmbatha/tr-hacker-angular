import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { HomeComponent } from './home.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<HomeComponent>;
  const initialState = {
    stories: {
      topStories: [123, 456],
      loading: false
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, NzListModule],
      providers: [provideMockStore({ initialState }), { provide: ActivatedRoute, useValue: { paramMap: {} } }]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show story list', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('a').length).toBeGreaterThan(0);
  })
});
