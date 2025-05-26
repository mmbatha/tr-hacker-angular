import { commentReducer, initialState } from './comment.reducer';

describe('Comment Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = commentReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
