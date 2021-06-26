import * as React from 'react';

import { Bar } from 'react-chartjs-2';

const BarChart = (props: any) => {

  return (
    <div style={{ height: '200px' }}>
      <Bar
        type={'bar'}
        height={100}
        width={100}
        data={{
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [{
            label: 'Weekely earnings',
            data: props.week,
            backgroundColor: '#007bff',

          }]
        }}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  )
}

export default BarChart;