import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectStories } from '../../store/selectors/story.selectors';
import { Story } from '../../models/story';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NzListModule, NzAvatarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stories$!: Observable<Story[]>;
  loading$!: Observable<boolean>;

  /**
   * Basic ctor.
   */
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(StoryActions.loadTopStories());
    this.stories$ = this.store.select(selectStories);
    this.loading$ = this.store.select(selectLoading);
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
}
