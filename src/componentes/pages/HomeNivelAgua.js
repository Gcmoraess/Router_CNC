import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import styles from "./HomeNivelAgua.module.css";

function WaterLevelChart() {
  const chartRef = useRef(null);
  const uplotRef = useRef(null);

  useEffect(() => {
    const data = [[], []];

    const options = {
      width: 600,
      height: 400,
      scales: {
        x: { time: false },
        y: { range: [0, 12] },
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
        { show: false },
        { label: "Vazão (L/min)" },
      ],
    };

    uplotRef.current = new uPlot(options, data, chartRef.current);

    const maxPoints = 20;
    let index = 0;
    let targetValue = 0;
    let currentValue = 0;
    let lastValue = 0;

    // ── WebSocket ──────────────────────────────────────────────
    const ws = new WebSocket("ws://localhost:5000/ws/fluxo");

    ws.onopen = () => console.log("✅ WebSocket fluxo conectado");

    ws.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        const raw = json.vazao_L_min || 0;

        // mesmo filtro suave que você já tinha
        const filtered = lastValue * 0.3 + raw * 0.7;
        lastValue = filtered;
        targetValue = filtered;
      } catch (e) {
        console.error("Erro ao processar mensagem WebSocket:", e);
      }
    };

    ws.onerror = (e) => console.error("❌ WebSocket erro:", e);

    ws.onclose = () => console.log("🔌 WebSocket fluxo desconectado");
    // ──────────────────────────────────────────────────────────

    // animação suave do gráfico (igual ao original)
    const animate = () => {
      currentValue += (targetValue - currentValue) * 0.1;

      data[0].push(index++);
      data[1].push(currentValue);

      if (data[0].length > maxPoints) {
        data[0].shift();
        data[1].shift();
      }

      uplotRef.current.setData(data);
    };

    const animationInterval = setInterval(animate, 100);

    return () => {
      ws.close();                          // fecha o WebSocket ao sair da tela
      clearInterval(animationInterval);
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
