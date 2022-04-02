import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

export function mountWithDendencies(component, options) {
  const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.appendChild(app);

  const localVue = createLocalVue();
  localVue.use(VueRouter);

  return mount(component, {
    localVue,
    vuetify: new Vuetify(),
    ...options,
  });
}

export function triggerDropdownChange(autocomplete, input) {
  autocomplete.vm.$emit('input', input);
  autocomplete.vm.$emit('blur');
}

export async function commitMutations(store, mutations) {
  mutations.forEach(({ type, payload }) => {
    store.commit(type, payload);
  });
}

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
