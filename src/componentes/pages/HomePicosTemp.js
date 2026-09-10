import ReactECharts from 'echarts-for-react'
import styles from './HomePicosTemp.module.css'

function HomePicosTemp () {
    
   const option = {
    title: {
        text: 'Picos de temperatura',
        left: 'center',
        top: 10,
        textStyle: {
            color: '#FFF',
            fontSize: 20
        }
    },

    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>Temperatura: {c} °C'
    },

    grid: {
        left: 60,
        right: 30,
        top: 70,
        bottom: 50
    },

    xAxis: {
        type: 'category',
        data: ['08:00', '08:05', '08:10', '08:15', '08:20'],
        axisLabel: {
            color: '#FFF'
        },
        axisLine: {
            lineStyle: {
                color: '#777'
            }
        }
    },

    yAxis: {
        type: 'value',
        name: 'Temperatura °C',
        nameTextStyle: {
            color: '#FFF'
        },
        axisLabel: {
            color: '#FFF'
        },
        axisLine: {
            lineStyle: {
                color: '#777'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#444'
            }
        }
    },

    series: [
        {
            data: [42, 47, 51, 49, 58],
            type: 'bar',

            label: {
                show: true,
                position: 'top',
                color: '#FFF',
                formatter: '{c} °C'
            },

            barWidth: '45%',

            itemStyle: {
                borderRadius: [6, 6, 0, 0]
            }
        }
    ]
}
    
    return (
        <div className = {styles.container} >

            <ReactECharts
                option={option}
                style={{ width: '600px', height: '400px' }}
            />

        </div>
    )
}

export default HomePicosTemp;