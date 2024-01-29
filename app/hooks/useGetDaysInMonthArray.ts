interface IDay {
  day: number;
}

export const useGetDaysInMonthArray = () => {
  const daysInMonthArray: IDay[] = [];

  for (let i = 0; i < 28; i++) {
    const dayObject: IDay = { day: i + 1 };
    daysInMonthArray.push(dayObject);
  }

  return { daysInMonthArray } as const;
};
