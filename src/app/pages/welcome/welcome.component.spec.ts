import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { WelcomeComponent } from './welcome.component';
import { Story } from '../../models/story';
import { Status } from '../../models/status';
import { loadStories } from '../../store/actions/story.actions';
import { selectStories, selectStoryLoading } from '../../store/selectors/story.selectors';
import { selectCommentLoading } from '../../store/selectors/comment.selectors';
import { ModalComponent } from '../../components/modal/modal.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let store: MockStore;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let vcr: jasmine.SpyObj<ViewContainerRef>;

  const mockStory: Story = {
    id: 1,
    title: 'Test Story',
    url: 'https://example.com',
    kids: [1, 2, 3, 4, 5, 6],
    by: 'Simon',
    time: 5234,
    text: 'test text',
    score: 5,
    parts: [0],
    descendants: 0
  };

  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      paramMap: of({ get: jasmine.createSpy('get').and.returnValue('top') })
    });
    const vcrSpy = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), WelcomeComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectStories, value: [mockStory] },
            { selector: selectStoryLoading, value: false },
            { selector: selectCommentLoading, value: false }
          ]
        }),
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ViewContainerRef, useValue: vcrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    vcr = TestBed.inject(ViewContainerRef) as jasmine.SpyObj<ViewContainerRef>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set storyType from route params and call loadSelectedStories', () => {
      spyOn(component, 'loadSelectedStories');
      component.ngOnInit();
      expect(component.storyType).toBe('top');
      expect(component.loadSelectedStories).toHaveBeenCalledWith('top');
    });

    it('should select loading and commentStatus observables', () => {
      component.ngOnInit();
      expect(component.loading$).toBeDefined();
      expect(component.commentStatus$).toBeDefined();
    });
  });

  describe('loadSelectedStories', () => {
    it('should dispatch loadStories action and select stories', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const selectSpy = spyOn(store, 'select').and.callThrough();
      component.loadSelectedStories('new');
      expect(dispatchSpy).toHaveBeenCalledWith(loadStories({ storyType: 'new' }));
      expect(selectSpy).toHaveBeenCalledWith(selectStories);
      expect(component.stories$).toBeDefined();
    });
  });

  describe('getFaviconUrl', () => {
    it('should return default icon for empty url', () => {
      expect(component.getFaviconUrl('')).toBe('assets/default-icon.png');
    });

    it('should return favicon url for valid url', () => {
      expect(component.getFaviconUrl('https://example.com')).toBe('https://www.google.com/s2/favicons?domain=example.com');
    });

    it('should return default icon for invalid url', () => {
      expect(component.getFaviconUrl('invalid-url')).toBe('assets/default-icon.png');
    });
  });

  describe('getVisibleComments', () => {
    it('should return first 5 comments by default', () => {
      expect(component.getVisibleComments(mockStory)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return comments up to visible limit', () => {
      component.visibleComments[mockStory.id] = 3;
      expect(component.getVisibleComments(mockStory)).toEqual([1, 2, 3]);
    });

    it('should return empty array if no kids', () => {
      const storyWithoutKids = { ...mockStory, kids: undefined };
      expect(component.getVisibleComments(storyWithoutKids)).toEqual([]);
    });
  });

  describe('hasMoreComments', () => {
    it('should return true if more comments than visible', () => {
      expect(component.hasMoreComments(mockStory)).toBe(true);
    });

    it('should return false if no more comments', () => {
      component.visibleComments[mockStory.id] = 6;
      expect(component.hasMoreComments(mockStory)).toBe(false);
    });

    it('should return false if no kids', () => {
      const storyWithoutKids = { ...mockStory, kids: undefined };
      expect(component.hasMoreComments(storyWithoutKids)).toBe(false);
    });
  });

  describe('openModal', () => {
    it('should create modal component and set properties', () => {
      const mockCompRef = {
        changeDetectorRef: { detectChanges: jasmine.createSpy('detectChanges') },
        instance: {
          modalTitle: '',
          modalContent: '',
          closeModal: of('closed')
        },
        destroy: jasmine.createSpy('destroy')
      };
      vcr.createComponent.and.returnValue(mockCompRef);

      component.openModal(mockStory);

      expect(vcr.createComponent).toHaveBeenCalledWith(ModalComponent);
      expect(mockCompRef.changeDetectorRef.detectChanges).toHaveBeenCalled();
      expect(mockCompRef.instance.modalTitle).toBe(mockStory.title);
      expect(mockCompRef.instance.modalContent).toBe('First comment: 1');
    });

    it('should handle no comments', () => {
      const storyWithoutKids = { ...mockStory, kids: [] };
      const mockCompRef = {
        changeDetectorRef: { detectChanges: jasmine.createSpy('detectChanges') },
        instance: {
          modalTitle: '',
          modalContent: '',
          closeModal: of('closed')
        },
        destroy: jasmine.createSpy('destroy')
      };
      vcr.createComponent.and.returnValue(mockCompRef);

      component.openModal(storyWithoutKids);

      expect(mockCompRef.instance.modalContent).toBe('No comments available.');
    });

    it('should subscribe to closeModal and destroy component', () => {
      const mockCompRef = {
        changeDetectorRef: { detectChanges: jasmine.createSpy('detectChanges') },
        instance: {
          modalTitle: '',
          modalContent: '',
          closeModal: of('closed')
        },
        destroy: jasmine.createSpy('destroy')
      };
      vcr.createComponent.and.returnValue(mockCompRef);

      component.openModal(mockStory);

      // Simulate close event
      expect(mockCompRef.destroy).toHaveBeenCalled();
    });
  });
});