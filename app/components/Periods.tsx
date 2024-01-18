// 'use client';

// import React, { useState } from 'react';
// import { useGetPeriods } from '../hooks/useGetPeriod';
// import { CURRENT_YEAR } from '../constants/constants';

// const Periods = () => {
//   const [year, setYear] = useState(CURRENT_YEAR);
//   const { periods } = useGetPeriods();

//   return (
//     <div>
//       {periods && (
//         <div>
//           {periods.years.map((year, index) => (
//             <button
//               className='btn btn-primary'
//               key={index}
//               onClick={() => setYear(year)}
//             >
//               {year}
//             </button>
//           ))}
//           {periods.months.map((month, index) => (
//             <div key={index}>{month.month}</div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Periods;
