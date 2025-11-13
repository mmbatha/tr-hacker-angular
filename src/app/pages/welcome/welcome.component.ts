import { ApplicationRef, Component, ComponentFactoryResolver, inject, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../../models/story';
import { Store } from '@ngrx/store';
import { loadStories } from '../../store/actions/story.actions';
import { selectStories, selectStoryLoading } from '../../store/selectors/story.selectors';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommonModule } from '@angular/common';
import { Status } from '../../models/status';
import { selectCommentLoading } from '../../store/selectors/comment.selectors';
import { PushPipe } from '@ngrx/component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [RouterModule, ScrollingModule, NzListModule, NzAvatarModule, NzCollapseModule, NzImageModule, NzGridModule, NzTagModule, NzBadgeModule, NzIconModule, CommentComponent, CommonModule, PushPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.less'
})
export class WelcomeComponent implements OnInit {
  storyType: 'top' | 'new' | 'best' = 'top';
  status: typeof Status = Status;
  stories$!: Observable<Story[]>;
  loading$!: Observable<Status>;
  commentStatus$!: Observable<Status>;
  visibleComments: { [storyId: number]: number } = {};
vcr = inject(ViewContainerRef);

  constructor(private route: ActivatedRoute,
     private store: Store,
    private componentFactoryResolver: ComponentFactoryResolver,
  private appRef: ApplicationRef
) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sType = params.get('type') as 'top' | 'new' | 'best';
      this.storyType = sType;
      this.loadSelectedStories(sType);
    })

    this.loading$ = this.store.select(selectStoryLoading);
    this.commentStatus$ = this.store.select(selectCommentLoading);
  }

  loadSelectedStories(storyType: string): void {
    this.store.dispatch(loadStories({ storyType }));
    this.stories$ = this.store.select(selectStories);
  }

  getFaviconUrl(storyUrl: string): string {
    if (!storyUrl) return 'assets/default-icon.png';
    try {
      const url = new URL(storyUrl);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}`;
    } catch {
      return 'assets/default-icon.png';
    }
  }

  getVisibleComments(story: Story): number[] {
    const limit = this.visibleComments[story.id] || 5;
    return story.kids?.slice(0, limit) || [];
  }

  hasMoreComments(story: Story): boolean {
    const total = story.kids?.length || 0;
    const visible = this.visibleComments[story.id] || 5;
    return total > visible;
  }

  openModal(story: Story): void {
    const compRef = this.vcr.createComponent(ModalComponent);
    compRef.changeDetectorRef.detectChanges();

    // Pass data to the modal component
    compRef.instance.modalTitle = story.title;
    compRef.instance.modalContent = story.kids![0] ? `First comment: ${story.kids![0]}` : 'No comments available.';

    // Subscribe to events from the modal (e.q., close)
    compRef.instance.closeModal.subscribe(eventData => {
      console.log('Modal closed:', eventData);
      // this.appRef.detachView(compRef.hostView);
      compRef.destroy();
    });
  }
}
