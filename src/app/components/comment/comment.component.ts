import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectComment, selectCommentLoading } from '../../store/selectors/comment.selectors';
import { loadComment } from '../../store/actions/comment.actions';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NzCommentModule, DatePipe, CommonModule, SafeHtmlPipe, NzSkeletonModule, NzLayoutModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  // inputs: ['commentId']
})
export class CommentComponent implements OnInit {
  @Input() commentId!: number;
  private store = inject(Store);

  comment$ = this.store.select(selectComment);
  loading$ = this.store.select(selectCommentLoading);

  constructor() {

  }
  ngOnInit(): void {
    this.store.dispatch(loadComment({ id: this.commentId }));
  }

}
