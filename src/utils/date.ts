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
