import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './HomeTemperature.module.css'


function HomeTemperature() {

  const [temperatura, setTemperatura] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/temperatura");
        const data = await res.json();
        setTemperatura(data.valor);
      } catch (err) {
        console.error("Erro ao buscar temperatura:", err);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const option = {
    series: [
      {
        type: 'gauge',
        min: 20,
        max: 80,
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 40,
            color: [
              [0.25, '#00ff00'],
              [0.5, '#ffff00'],
              [0.75, '#ffa500'],
              [1, '#ff0000']
            ]
          }
        },
        pointer: {
          width: 7
        },
        detail: {
          formatter: '{value} °C',
          color: '#FFF'
        },
        data: [
          {
            value: temperatura
          }
        ]
      }
    ]
  };

  return (
    <div className={styles.container}>

      <div className={styles.title}>
        <h2>Temperatura do Spindle</h2>
      </div>

      <ReactECharts 
        option={option} 
        style={{ height: 400, width: 695 }} 
      />
      
    </div>
  );
}

export default HomeTemperature;