import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentComponent } from '../comment/comment.component';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import { Story } from '../../models/story';
import { StoryService } from '../../services/story.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';

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
