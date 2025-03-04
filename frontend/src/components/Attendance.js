import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from '../utils/weather';

const chartSetting = {
  yAxis: [
    {
      label: 'Attendance (%)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function Attendance() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'classA', label: 'Class A', valueFormatter },
        { dataKey: 'classB', label: 'Class B', valueFormatter },
        { dataKey: 'classC', label: 'Class C', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}