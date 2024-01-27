import { DAYS_IN_MONTH } from '../constants/constants';

interface IDay {
  day: number;
}

export const useGetDaysInMonthArray = () => {
  const daysInMonthArray: IDay[] = [];

  for (let i = 0; i < DAYS_IN_MONTH; i++) {
    const dayObject: IDay = { day: i + 1 };
    daysInMonthArray.push(dayObject);
  }

  return { daysInMonthArray } as const;
};
