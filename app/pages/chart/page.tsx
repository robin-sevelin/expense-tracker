'use client';

import ChartPage from '@/components/chartPage/ChartPage';
import { useAuthUser } from '@/hooks/useAuthUser';

const Chart = () => {
  useAuthUser();
  return (
    <>
      <ChartPage />
    </>
  );
};

export default Chart;
