import HomePicosTemp from './HomePicosTemp';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './HomeTemperature.module.css';

function HomeTemperature() {

  const [temperatura, setTemperatura] = useState(0);

  // Transferência de dados - mantida
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

  // Configurações do gráfico de temperatura
  const option = {
    series: [
      {
        type: 'gauge',
        min: 20,
        max: 80,
        splitNumber: 4,

        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.25, '#00ff00'],
              [0.5, '#ffff00'],
              [0.75, '#ffa500'],
              [1, '#ff0000']
            ]
          }
        },

        axisLabel: {
          distance: 30,
          color: '#FFF'
        },

        pointer: {
          width: 7
        },

        detail: {
          formatter: '{value} °C',
          color: '#FFF',
          fontSize: 20,
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

        {/* Gráfico de temperatura */}
        <div className={styles.containerTemp}>

            <div className={styles.title}>
                <h2>Temperatura do Spindle</h2>
            </div>

            <div className={styles.graficoTemp}>
                <ReactECharts
                    option={option}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

        </div>


        {/* Gráfico de picos */}
            <div className={styles.graficoBarras}>
                <HomePicosTemp />
            </div>

        </div>
);
}

export default HomeTemperature;