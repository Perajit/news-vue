import dayjs from 'dayjs';

export default {
  formatDate: (dateTime, format) => dayjs(dateTime).format(format),
  parseDate: (dateTime) => dayjs(dateTime),
};
