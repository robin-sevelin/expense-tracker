// 'use client';

// import React from 'react';
// import FilteredSummary from '@/components/sharedComponents/FilteredSummary';
// import MonthPicker from '@/components/sharedComponents/MonthPicker';
// import { Line } from 'react-chartjs-2';
// import { useGetChartData } from '@/hooks/useGetChartData';
// import Loading from '../sharedComponents/Loading';
// import { useAuthUser } from '@/hooks/useAuthUser';

// const ChartPage = () => {
//   const { chartOptions, data } = useGetChartData();
//   useAuthUser();

//   if (!data) {
//     return <Loading />;
//   }
//   return (
//     <>
//       <MonthPicker />
//       <FilteredSummary />
//       <Line options={chartOptions} data={data} />
//     </>
//   );
// };

// export default ChartPage;
