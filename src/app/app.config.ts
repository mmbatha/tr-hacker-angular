import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { en_GB, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storyReducer } from './store/reducers/story.reducer';
import { StoryEffects } from './store/effects/story.effects';
import { userReducer } from './store/reducers/user.reducers';
import { commentReducer } from './store/reducers/comment.reducer';
import { UserEffects } from './store/effects/user.effects';
import { CommentEffects } from './store/effects/comment.effects';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ story: storyReducer, stories: storyReducer, users: userReducer, comments: commentReducer }),
    provideHttpClient(),
    provideNzI18n(en_GB),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideEffects([StoryEffects, UserEffects, CommentEffects]),
    provideStoreDevtools()
  ]
};
