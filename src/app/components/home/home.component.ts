import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list'
import { NzCommentModule } from 'ng-zorro-antd/comment'
import { Store } from '@ngrx/store';
import { StoryActions } from '../../store/actions/story.actions';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, NzListModule, NzCommentModule], templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  storyIds$ = this.store.select(state => state.stories.topStoryIds);

  ngOnInit(): void {
    this.store.dispatch(StoryActions.loadTopStories());
  }
}
