import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list'
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectStories } from '../../store/selectors/story.selectors';
import { Story } from '../../models/story';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NzListModule],
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
}
