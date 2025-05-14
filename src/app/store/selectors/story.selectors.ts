import { createFeatureSelector} from '@ngrx/store';
import * as fromStore from '../reducers/story.reducer';

export const selectStoreState = createFeatureSelector<fromStore.State>(
  fromStore.storeFeatureKey
);