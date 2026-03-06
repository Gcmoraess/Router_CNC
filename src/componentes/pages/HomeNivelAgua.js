import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import styles from "./HomeNivelAgua.module.css";

function WaterLevelChart() {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    const data = [
      [], // eixo X (índices apenas)
      [], // eixo Y (vazão)
    ];

    const options = {
      width: 600,
      height: 400,
      scales: {
        x: { time: false },
        y: { auto: true },
      },
      series: [
        {},
        {
          label: "Vazão (L/min)",
          stroke: "blue",
          fill: "rgba(0, 0, 255, 0.2)",
          width: 2,
        },
      ],
      axes: [
        {
          show: false, // 👈 remove o eixo X visualmente
        },
        {
          label: "Vazão (L/min)",
        },
      ],
    };

    uplotRef.current = new uPlot(options, data, chartRef.current);

    const maxPoints = 20;
    let index = 0;

    const fetchFluxo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fluxo");
        const json = await response.json();
        const vazao = json.vazao_L_min || 0;

        data[0].push(index++); // só pra manter o formato
        data[1].push(vazao);

        if (data[0].length > maxPoints) {
          data[0].shift();
          data[1].shift();
        }

        uplotRef.current.setData(data);
      } catch (error) {
        console.error("Erro ao buscar dados de vazão:", error);
      }
    };

    const interval = setInterval(fetchFluxo, 1000);

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
      <div className={styles.chartTitle}>Vazão de Água (Instantânea)</div>
      <div ref={chartRef}></div>
    </div>
  );
}

export default WaterLevelChart;