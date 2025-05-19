import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { StoryService } from '../../services/story.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading } from '../../store/selectors/user.selectors';
import { loadUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe, CommonModule, NzCardModule, NzTypographyModule, SafeHtmlPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectUserLoading);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadUser({ id }));
  }

}
