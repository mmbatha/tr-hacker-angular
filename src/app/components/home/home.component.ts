import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list'
import { Store } from '@ngrx/store';
import { StoryActions } from '../../store/actions/story.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectStoryIds } from '../../store/selectors/story.selectors';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NzListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  storyIds$!: Observable<number[]>;
  loading$!: Observable<boolean>;

  /**
   * Basic ctor.
   */
  constructor(private store: Store) {
    console.log('home');

  }

  ngOnInit(): void {
    this.store.dispatch(StoryActions.loadTopStories());
    this.storyIds$ = this.store.select(selectStoryIds);
    this.loading$ = this.store.select(selectLoading);
  }
}
