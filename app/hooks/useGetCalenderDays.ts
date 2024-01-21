import { useAtom } from 'jotai';
import { DateTime } from 'luxon';
import { monthAtom } from '../store/atoms';

export const useGetCalenderDays = () => {
  const [selectedMonth] = useAtom(monthAtom);

  const dateTime = DateTime.fromObject({
    year: selectedMonth.getFullYear(),
    month: selectedMonth.getMonth() + 1,
  });
  const daysInMonth = dateTime.daysInMonth;
  let calenderArray = [];

  if (daysInMonth) {
    for (let i = 0; i < daysInMonth; i++) {
      calenderArray.push(i + 1);
    }
  }

  return { calenderArray } as const;
};
