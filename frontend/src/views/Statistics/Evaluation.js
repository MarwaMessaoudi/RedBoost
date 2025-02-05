import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const Evaluation = () => {
  // Dummy data
  const preTestFilledRate = 80;
  const postTestFilledRate = 75;

  // Calculating percentages
  const preTestFilledRatePercentage = (preTestFilledRate / 100) * 100;
  const postTestFilledRatePercentage = (postTestFilledRate / 100) * 100;

  return (
    <div className="chart-gallery">
      {/* Chart for "Taux de Pré-test rempli" */}
      <CChart
        type="bar"
        data={{
          labels: ['Taux de Pré-test rempli'],
          datasets: [
            {
              label: 'Taux de Pré-test rempli',
              backgroundColor: '#FF6384',
              data: [preTestFilledRate],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />

      {/* Chart for "Taux de post-test rempli" */}
      <CChart
        type="bar"
        data={{
          labels: ['Taux de post-test rempli'],
          datasets: [
            {
              label: 'Taux de post-test rempli',
              backgroundColor: '#36A2EB',
              data: [postTestFilledRate],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Evaluation;
