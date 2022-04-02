import VueRouter from 'vue-router';
import HeadlineDetail from '@/components/HeadlineDetail';
import { routes } from '@/router';
import formatFilter from '@/filters/format.filter';
import topHeadlinesMock from '../_mocks/top-headlines.mock';
import { mountWithDendencies } from '../_utils/common';

describe('HeadlineDetail component', () => {
  const headline = topHeadlinesMock.articles[0];
  const router = new VueRouter({ routes });

  function setup(options = {}) {
    return mountWithDendencies(HeadlineDetail, {
      propsData: { headline },
      router,
      ...options,
    });
  }

  beforeAll(() => router.push('/detail'));

  it('renders title', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-field="title"]').text()).toEqual(headline.title || '');
  });

  it('renders source name', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-field="sourceName"]').text()).toEqual(headline.source.name || '');
  });

  it('renders author', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-field="author"]').text()).toEqual(headline.author || '');
  });

  it('renders publishedAt', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-field="publishedAt"]').text()).toEqual(
      headline.publishedAt ? formatFilter.formatDate(headline.publishedAt, 'DD MMMM YYYY HH:mm:ss') : '',
    );
  });

  it('renders image', () => {
    const wrapper = setup();
    expect(wrapper.findComponent({ name: 'v-img' }).props('src')).toEqual(headline.urlToImage || '');
  });

  it('renders description', () => {
    const wrapper = setup();
    expect(wrapper.find('[data-field="description"]').text()).toEqual(headline.description || '');
  });

  it('renders link to full article', () => {
    const wrapper = setup();
    expect(wrapper.find('a').attributes('href')).toEqual(headline.url || '');
  });

  describe('on click back', () => {
    it('navigates to home page', () => {
      const wrapper = setup();
      wrapper.find('[data-action="back"]').trigger('click');
      expect(router.currentRoute.path).toEqual('/');
    });
  });
});
