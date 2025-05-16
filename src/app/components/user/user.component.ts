import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { StoryService } from '../../services/story.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-user',
  imports: [DatePipe, CommonModule, NzCardModule, NzTypographyModule, SafeHtmlPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user$!: Observable<any>;

  constructor(private storyService: StoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.storyService.getUser(id);
      })
    )
  }

}
