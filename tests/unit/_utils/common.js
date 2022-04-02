export function verifyGetRequest(axiosMock, url, params) {
  const latestGetRequest = axiosMock.history.get.pop();

  expect(latestGetRequest).toBeTruthy();
  expect(latestGetRequest.url).toEqual(url);
  expect(latestGetRequest.params).toEqual(params);
}

export function verifyRequestAndSuccessCommits(commitCalls, expectedMutations) {
  expect(commitCalls).toBeTruthy();

  expect(commitCalls[0][0]).toEqual(expectedMutations.request.type);
  expect(commitCalls[0][1]).toEqual(expectedMutations.request.payload);

  expect(commitCalls[1][0]).toEqual(expectedMutations.success.type);
  expect(commitCalls[1][1]).toEqual(expectedMutations.success.payload);
}

export function verifyRequestAndFailureCommits(commitCalls, expectedMutations) {
  expect(commitCalls).toBeTruthy();

  expect(commitCalls[0][0]).toEqual(expectedMutations.request.type);
  expect(commitCalls[0][1]).toEqual(expectedMutations.request.payload);

  expect(commitCalls[1][0]).toEqual(expectedMutations.failure.type);
  expect(commitCalls[1][1]).toMatchObject(expectedMutations.failure.payload);
}
