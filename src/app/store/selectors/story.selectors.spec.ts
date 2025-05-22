import * as fromStory from '../reducers/story.reducer';
import { selectStoryState } from './story.selectors';

describe('Story Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStoryState({
      [fromStory.storyFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
