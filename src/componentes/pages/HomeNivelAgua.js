import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

function WaterLevelChart() {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    const data = [
      [0], // eixo X (tempo)
      [0], // eixo Y (nível de água)
    ];

    const options = {
      width: 400,
      height: 200,
      title: "Nível de Água",
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
        },
      ],
    };

    uplotRef.current = new uPlot(options, data, chartRef.current);

    // Simulação: adiciona dados a cada segundo
    let t = 1;
    const interval = setInterval(() => {
      data[0].push(t);
      data[1].push(Math.random() * 100); // simulação de nível
      uplotRef.current.setData(data);
      t++;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={chartRef}></div>;
}

export default WaterLevelChart;
