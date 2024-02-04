import { monthAtom } from '@/store/atoms';
import { useAtom } from 'jotai';

interface IDay {
  day: number;
}

export const useGetDaysInMonthArray = () => {
  const [currentMonth] = useAtom(monthAtom);
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const daysInMonthArray: IDay[] = [];

  for (let i = 0; i < lastDayOfMonth; i++) {
    const dayObject: IDay = { day: i + 1 };
    daysInMonthArray.push(dayObject);
  }

  return { daysInMonthArray } as const;
};
