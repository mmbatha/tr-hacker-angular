import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';
import { Status } from '../../models/status';
import { Store } from '@ngrx/store';
import { loadComment } from '../../store/actions/comment.actions';
import { selectComment, selectCommentLoading } from '../../store/selectors/comment.selectors';
import { Comment } from "../../models/comment";
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-comment',
  imports: [NzCommentModule, DatePipe, CommonModule, NzSpinModule, NzLayoutModule, SafeHtmlPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.less'
})
export class CommentComponent implements OnInit {
  @Input() commentId!: number;
  @Input() elementId?: string;
  status: typeof Status = Status;

  comment$!: Observable<Comment>;
  status$!: Observable<Status>;

  /**
   *
   */
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadComment({ id: this.commentId }));
    this.comment$ = this.store.select(selectComment(this.commentId));
    this.status$ = this.store.select(selectCommentLoading);
  }
}
