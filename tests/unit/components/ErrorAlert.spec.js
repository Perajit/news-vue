import ErrorAlert from '@/components/ErrorAlert';
import { mountWithDendencies } from '../_utils/common';

describe('ErrorAlert component', () => {
  function setup(propsData) {
    return mountWithDendencies(ErrorAlert, {
      propsData,
    });
  }

  it('shows title', () => {
    const wrapper = setup({
      title: 'error title',
      error: {
        message: 'error message',
      },
    });
    expect(wrapper.find('[data-field="title"]').text()).toMatch('error title');
  });

  it('shows detail from response for http error', () => {
    const wrapper = setup({
      title: 'error title',
      error: {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
        message: 'error message',
      },
    });
    expect(wrapper.find('[data-field="detail"]').text()).toMatch('Not found');
  });

  it('shows detail from response for non-http error', () => {
    const wrapper = setup({
      title: 'error title',
      error: {
        message: 'error message',
      },
    });
    expect(wrapper.find('[data-field="detail"]').text()).toMatch('error message');
  });
});
