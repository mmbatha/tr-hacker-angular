import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { storyReducer } from "./store/reducers/story.reducer";

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_GB, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { StoryEffects } from './store/effects/story.effects';
import { commentReducer } from './store/reducers/comment.reducer';
import { CommentEffects } from './store/effects/comment.effects';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { menuReducer } from './store/reducers/menu.reducer';
import { MenuEffects } from './store/effects/menu.effects';

ModuleRegistry.registerModules([AllCommunityModule]);

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ story: storyReducer, stories: storyReducer, comments: commentReducer, users: userReducer, menu: menuReducer }),
    provideEffects([StoryEffects, CommentEffects, UserEffects, MenuEffects]),
    provideNzIcons(icons),
    provideNzI18n(en_GB),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })]
};
