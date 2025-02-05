import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const Logistique = () => {
  // Dummy data
  const quotesRequested = 120;
  const quotesReceived = 95;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre de devis demandés" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre de devis demandés"],
          datasets: [
            {
              label: "Nombre de devis demandés",
              backgroundColor: '#FF6384',
              data: [quotesRequested],
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

      {/* Chart for "Nombre de devis reçus" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre de devis reçus"],
          datasets: [
            {
              label: "Nombre de devis reçus",
              backgroundColor: '#36A2EB',
              data: [quotesReceived],
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

      {/* Chart comparing "Nombre de devis demandés" and "Nombre de devis reçus" */}
      <CChart
        type="pie"
        data={{
          labels: ["Nombre de devis demandés", "Nombre de devis reçus"],
          datasets: [
            {
              backgroundColor: ['#FF6384', '#36A2EB'],
              data: [quotesRequested, quotesReceived],
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
        }}
      />
    </div>
  );
};

export default Logistique;
