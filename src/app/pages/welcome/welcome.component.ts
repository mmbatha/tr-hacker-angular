import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../../models/story';
import { Store } from '@ngrx/store';
import { loadStories, loadTopStories } from '../../store/actions/story.actions';
import { selectStories, selectStoryLoading, selectTopStories } from '../../store/selectors/story.selectors';
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

@Component({
  selector: 'app-welcome',
  imports: [RouterModule, ScrollingModule, NzListModule, NzAvatarModule, NzCollapseModule, NzImageModule, NzGridModule, NzTagModule, NzBadgeModule, NzIconModule, CommentComponent, CommonModule],
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

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sType = params.get('type') as 'top' | 'new' | 'best';
      this.storyType = sType;
      this.loadSelectedStories(sType);
    })
    // this.store.dispatch(loadTopStories());
    // this.stories$ = this.store.select(selectTopStories);
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
}
