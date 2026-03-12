import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import styles from "./HomeNivelAgua.module.css";

function WaterLevelChart() {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    const data = [
      [], // eixo X
      [], // eixo Y
    ];

    const options = {
      width: 600,
      height: 400,
      scales: {
        x: { time: false },
        y: {
          range: [0, 20], // escala fixa
        },
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
          show: false, // remove eixo X
        },
        {
          label: "Vazão (L/min)",
        },
      ],
    };

    uplotRef.current = new uPlot(options, data, chartRef.current);

    const maxPoints = 20;
    let index = 0;

    let targetValue = 0;   // valor vindo do Arduino
    let currentValue = 0;  // valor mostrado no gráfico
    let lastValue = 0;     // para suavização

    // busca dados do backend
    const fetchFluxo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fluxo");
        const json = await response.json();
        const raw = json.vazao_L_min || 0;

        // filtro suave
        const filtered = lastValue * 0.7 + raw * 0.3;
        lastValue = filtered;

        targetValue = filtered;

      } catch (error) {
        console.error("Erro ao buscar dados de vazão:", error);
      }
    };

    // animação suave do gráfico
    const animate = () => {

      // aproxima lentamente do valor real
      currentValue += (targetValue - currentValue) * 0.1;

      data[0].push(index++);
      data[1].push(currentValue);

      if (data[0].length > maxPoints) {
        data[0].shift();
        data[1].shift();
      }

      uplotRef.current.setData(data);
    };

    // busca dados 1 vez por segundo
    const fetchInterval = setInterval(fetchFluxo, 1000);

    // anima gráfico 10 vezes por segundo
    const animationInterval = setInterval(animate, 100);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(animationInterval);

      if (uplotRef.current) {
        uplotRef.current.destroy();
        uplotRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        Vazão de Água (Instantânea)
      </div>
      <div ref={chartRef}></div>
    </div>
  );
}

export default WaterLevelChart;