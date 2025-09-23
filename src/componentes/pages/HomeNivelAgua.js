import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import styles from "./HomeNivelAgua.module.css";

function WaterLevelChart() {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    const data = [
      [0], // eixo X (tempo)
      [0], // eixo Y (nível de água)
    ];

    const options = {
      width: 600,
      height: 300,
      scales: {
        x: { time: false },
        y: { auto: true },
      },
      series: [
        {},
        {
          label: "Nível",
          stroke: "blue",
          fill: "rgba(0, 0, 255, 0.2)",
          width: 2,
        },
      ],
      legend: { show: false },
    };

    // cria o gráfico
    uplotRef.current = new uPlot(options, data, chartRef.current);

    let t = 1;
    const maxPoints = 20;
    const interval = setInterval(() => {
      data[0].push(t);
      data[1].push(Math.random() * 100);

      if (data[0].length > maxPoints) {
        data[0].shift();
        data[1].shift();
      }

      uplotRef.current.setData(data);
      t++;
    }, 1000);

    // cleanup: destruir gráfico e intervalo
    return () => {
      clearInterval(interval);
      if (uplotRef.current) {
        uplotRef.current.destroy();
        uplotRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>Monitoramento de Água</div>
      <div ref={chartRef}></div>
    </div>
  );
}

export default WaterLevelChart;
