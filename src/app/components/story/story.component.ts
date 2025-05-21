import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { CommonModule } from '@angular/common';
import { selectStoryLoading, selectStory } from '../../store/selectors/story.selectors';
import { NzCardModule } from "ng-zorro-antd/card";
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-story',
  imports: [CommonModule, NzCardModule, RouterLink, CommentComponent],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  story$ = this.store.select(selectStory);
  loading$ = this.store.select(selectStoryLoading);

  constructor() {
    const id = +this.route.snapshot.paramMap.get('storyId')!;
    this.store.dispatch(StoryActions.loadStory({ id }));
    this.story$ = this.store.select(selectStory);
    this.loading$ = this.store.select(selectStoryLoading);
  }
}
