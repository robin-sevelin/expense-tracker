'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';

const GraphPage = () => {
  // const { options, data } = useGetChartData();

  useAuthUser();
  return (
    <section className='max-w-7xl max-h-3xl m-auto'>
      <h2 className='text-5xl font-bold'>GRAPH.</h2>

      {/* <Line options={options} data={data} /> */}
    </section>
  );
};

export default GraphPage;
