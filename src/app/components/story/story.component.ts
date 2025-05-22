import { AfterViewChecked, AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { CommonModule } from '@angular/common';
import { selectStoryLoading, selectStory } from '../../store/selectors/story.selectors';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzListModule } from "ng-zorro-antd/list";
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-story',
  imports: [CommonModule, NzCardModule, RouterLink, CommentComponent, NzListModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements AfterViewChecked, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private fragment: string | null = null;
  private hasScrolled = false;

  story$ = this.store.select(selectStory);
  loading$ = this.store.select(selectStoryLoading);

  constructor() {
    const id = +this.route.snapshot.paramMap.get('storyId')!;
    this.store.dispatch(StoryActions.loadStory({ id }));
    this.story$ = this.store.select(selectStory);
    this.loading$ = this.store.select(selectStoryLoading);
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  ngAfterViewChecked(): void {
    if (this.fragment && !this.hasScrolled) {
      const el = document.getElementById(this.fragment);
      if (el) {
        el.classList.add('comment-highlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          el.classList.remove('comment-highlight');
        }, 2000);
        this.hasScrolled = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.hasScrolled = false;
  }
}
