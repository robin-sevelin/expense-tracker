import { DAYS_IN_MONTH } from './../constants/constants';
import { useAtom } from 'jotai';
import { DateTime } from 'luxon';
import { monthAtom } from '../store/atoms';

export const useGetCalenderDays = () => {
  const [selectedMonth] = useAtom(monthAtom);

  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();

  let calenderArray = [];

  if (daysInMonth) {
    for (let i = 0; i < daysInMonth; i++) {
      calenderArray.push(i + 1);
    }
  }

  return { calenderArray } as const;
};
