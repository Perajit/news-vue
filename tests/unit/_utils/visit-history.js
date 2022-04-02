import topHeadlinesMock from '../_mocks/top-headlines.mock';

export function createVisit(headlineIndex) {
  return {
    headline: topHeadlinesMock.articles[headlineIndex],
    dateTime: new Date().toISOString(),
  };
}

export function createVisitHistory(length) {
  return [...Array(length).keys()].map((i) => createVisit(i));
}
