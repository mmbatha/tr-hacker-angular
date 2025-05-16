import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { Observable } from 'rxjs';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { StoryService } from '../../services/story.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  imports: [NzCommentModule, DatePipe, CommonModule, SafeHtmlPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input() id!: number;
  comment$!: Observable<any> | null;

  constructor(private route: ActivatedRoute, private storyService: StoryService) { }
  ngOnInit(): void {
    this.comment$ = this.storyService.getComment(this.id);
  }

}
