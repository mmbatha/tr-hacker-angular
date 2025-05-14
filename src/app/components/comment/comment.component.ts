import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [NzCommentModule, DatePipe, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  @Input() id!: number;
  comment$!: Observable<any>;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.comment$ = this.http.get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json`);
  }

}
