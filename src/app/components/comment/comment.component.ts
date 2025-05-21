import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { Store } from '@ngrx/store';
import { selectComment, selectCommentLoading } from '../../store/selectors/comment.selectors';
import { loadComment } from '../../store/actions/comment.actions';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NzCommentModule, DatePipe, CommonModule, SafeHtmlPipe, NzSkeletonModule, NzLayoutModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input() commentId!: number;
  comment$!: Observable<Comment>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadComment({ id: this.commentId }));
    this.comment$ = this.store.select(selectComment(this.commentId));
    this.loading$ = this.store.select(selectCommentLoading);
  }

}
