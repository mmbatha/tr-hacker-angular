import { storyReducer, initialState } from './story.reducer';

describe('Story Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = storyReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
