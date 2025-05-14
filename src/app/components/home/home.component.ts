import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { loadTopStories } from '../../store/actions/story.actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { storyReducer } from '../../store/reducers/story.reducer';
import { NzListModule } from 'ng-zorro-antd/list'
import { NzCommentModule } from 'ng-zorro-antd/comment'

@Component({
  selector: 'app-home',
  imports: [StoreModule, RouterModule, CommonModule, NzListModule, BrowserModule, NzCommentModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  storyIds$ = this.store.select(state => state.stories.topStoryIds);

  ngOnInit(): void {
    this.store.dispatch(loadTopStories());
  }
}
