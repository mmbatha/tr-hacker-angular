import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NzCommentModule, DatePipe, CommonModule, SafeHtmlPipe, NzSkeletonModule, NzLayoutModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  // inputs: ['commentId']
})
export class CommentComponent implements OnInit {
  @Input() id!: number;
  comment$!: Observable<any> | null;

  constructor(private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.comment$ = this.commentService.getComment(this.id);
  }

}
