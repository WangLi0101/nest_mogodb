import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone
(dayjs as any).tz.setDefault('Asia/Shanghai');

export const formatDate = (date: Date) => {
  return dayjs(date).tz().format('YYYY-MM-DD HH:mm:ss');
};
