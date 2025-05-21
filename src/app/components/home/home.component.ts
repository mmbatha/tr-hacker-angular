import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { Observable } from 'rxjs';
import { selectStoryLoading, selectStories } from '../../store/selectors/story.selectors';
import { Story } from '../../models/story';
import { CommentComponent } from '../comment/comment.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NzListModule, NzAvatarModule, NzCollapseModule, CommentComponent, NzImageModule, NzGridModule, ScrollingModule, NzTagModule, NzBadgeModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stories$!: Observable<Story[]>;
  loading$!: Observable<boolean>;
  visibleComments: { [storyId: number]: number } = {};

  /**
   * Basic ctor.
   */
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(StoryActions.loadTopStories());
    this.stories$ = this.store.select(selectStories);
    this.loading$ = this.store.select(selectStoryLoading);
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
    const visble = this.visibleComments[story.id] || 5;
    return total > visble;
  }
}