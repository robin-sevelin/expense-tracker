import { CURRENT_DATE } from '../constants/constants';

interface IDay {
  day: number;
}

export const useGetDaysInMonthArray = () => {
  const currentMonth = CURRENT_DATE.getMonth();
  const currentYear = CURRENT_DATE.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysInMonthArray: IDay[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    const dayObject: IDay = { day: i + 1 };
    daysInMonthArray.push(dayObject);
  }

  return { daysInMonthArray } as const;
};
