import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentComponent } from '../comment/comment.component';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as StoryActions from '../../store/actions/story.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterLink, CommentComponent, CommonModule, NzListModule, NzTableModule, DatePipe],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements OnInit {
  story$!: Observable<Story | null>;

  constructor(private route: ActivatedRoute, private storyService: StoryService) { }

  ngOnInit(): void {
    this.story$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.storyService.getStory(id);
      }));
  }
}
