import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export function getMondayTimeStamp(dayObject: Dayjs) {
  // NOTE: 特殊处理星期天
  if (dayObject.day() === 0) {
    return dayObject
      .subtract(1, 'day')
      .startOf('week')
      .add(1, 'day')
      .valueOf();
  }
  return dayObject.startOf('week').add(1, 'day').valueOf();
}

export function getWeekStamp(day: Dayjs) {
  const monday = getMondayTimeStamp(day);
  const gte = new Date(monday);
  const lte = new Date(
    dayjs(monday).add(8, 'day').format('YYYY-MM-DD'),
  );
  return { monday: gte, sunday: lte };
}
