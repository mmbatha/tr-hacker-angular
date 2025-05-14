import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentComponent } from '../comment/comment.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadStory } from '../../store/actions/story.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  imports: [RouterLink, CommentComponent, CommonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements OnInit {
  private store = inject(Store);
  story$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadStory({ id }));
    this.story$ = this.store.select(state => state.stories.stories[id]);
  }
}
