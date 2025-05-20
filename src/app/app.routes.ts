import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StoryComponent } from './components/story/story.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:storyId', component: StoryComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: '**', redirectTo: '' }
];
