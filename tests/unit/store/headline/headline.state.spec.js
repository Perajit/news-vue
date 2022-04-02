import headlineModule from '@/store/headline';

describe('headline state', () => {
  it('returns initial editedHeadline as null', () => {
    expect(headlineModule.state().editedHeadline).toBeFalsy();
  });

  it('returns initial selectedHeadline as null', () => {
    expect(headlineModule.state().selectedHeadline).toBeFalsy();
  });
});
