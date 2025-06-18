import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading } from '../../store/selectors/user.selectors';
import { loadUser } from '../../store/actions/user.actions';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe, CommonModule, NzCardModule, NzTypographyModule, SafeHtmlPipe, PushPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.less'
})
export class UserComponent {
private route = inject(ActivatedRoute);
  private store = inject(Store);

  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectUserLoading);

  constructor() {
    const id = this.route.snapshot.paramMap.get('userId')!;
    this.store.dispatch(loadUser({ id }));
  }
}
