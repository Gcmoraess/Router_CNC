import {useState, useEffect} from 'react'

import  {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

import style from './HomeNivelAgua.module.css'

function NivelAgua() {
    const [data, setData] = useState ([])

    // Simula entrada de dados a cada 1 segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const novoValor = Math.floor(Math.random() * 100); // de 0 a 100%
        const timestamp = new Date().toLocaleTimeString();

        const novoDado = { tempo: timestamp, nivel: novoValor };

        // Mantém só os últimos 10 valores
        const novosDados = [...prevData, novoDado].slice(-10);
        return novosDados;
      });
    }, 1000);

    return () => clearInterval(interval); // limpa o intervalo se o componente for desmontado
  }, []);

    return (

 <div className={style.container}>
      <h2 className={style.titulo}>Nível de Água (Real Time)</h2>
      <div className={style.graficoWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="tempo" />
            <YAxis domain={[0, 100]} unit="%" />
            
            <Line
                type="monotone"
                dataKey="nivel"
                stroke="#0044cc"
                strokeWidth={2}
                dot={true}
                isAnimationActive={false}
                animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export default NivelAgua