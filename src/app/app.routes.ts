import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StoryComponent } from './components/story/story.component';
import { LearnComponent } from './components/learn/learn.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome/top' },
  { path: 'welcome/:type', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'item/:storyId', component: StoryComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'learn', component: LearnComponent },
  { path: '**', redirectTo: '' },
];
