import React, { useState, useEffect } from "react"
import Common from "../../common/Common"
import "./chart.css"
import ReactApexChart from "react-apexcharts"
import { cisControls } from "../../data/ciscontrols"

const Charts = () => {
  const [stats, setStats] = useState({
    total: 0,
    concluido: 0,
    pendente: 0,
    emAndamento: 0,
    na: 0,
    percentualConcluido: 0,
    percentualPendente: 0,
    percentualEmAndamento: 0,
    percentualNA: 0
  })

  // Função para carregar estatísticas
  const loadStats = () => {
    let total = 0;
    let concluido = 0;
    let pendente = 0;
    let emAndamento = 0;
    let na = 0;

    // Contar apenas sub-tópicos
    cisControls.controls.forEach(control => {
      if (control.topics) {
        control.topics.forEach(topic => {
          const storageKey = `topico_${topic.id}`;
          const saved = JSON.parse(localStorage.getItem(storageKey));
          const status = saved?.status || 'N/A';
          
          total++;
          
          switch(status) {
            case 'Concluído':
              concluido++;
              break;
            case 'Pendente':
              pendente++;
              break;
            case 'Em Andamento':
              emAndamento++;
              break;
            default:
              na++;
          }
        });
      }
    });

    // Calcular percentuais
    const percentualConcluido = total > 0 ? Math.round((concluido / total) * 100) : 0;
    const percentualPendente = total > 0 ? Math.round((pendente / total) * 100) : 0;
    const percentualEmAndamento = total > 0 ? Math.round((emAndamento / total) * 100) : 0;
    const percentualNA = total > 0 ? Math.round((na / total) * 100) : 0;

    setStats({
      total,
      concluido,
      pendente,
      emAndamento,
      na,
      percentualConcluido,
      percentualPendente,
      percentualEmAndamento,
      percentualNA
    });
  };

  useEffect(() => {
    loadStats();
    
    // Atualizar a cada mudança no localStorage
    const handleStorageChange = () => {
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Dados para o gráfico de pizza (donut)
  const donutData = {
    series: [stats.concluido, stats.emAndamento, stats.pendente, stats.na],
    options: {
      chart: {
        type: "donut",
        foreColor: "grey",
      },
      fill: {
        colors: ["#33b5a8", "#0059ff", "#b53340", "#cccccc"],
      },
      stroke: {
        colors: ["transparent"],
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%"
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                fontSize: "16px",
                fontWeight: "bold",
                color: "grey",
                formatter: function () {
                  return stats.total.toString()
                }
              }
            }
          }
        }
      },
      labels: ["Concluídos", "Em Andamento", "Pendente", "N/A"],
      colors: ["#33b5a8", "#0059ff", "#b53340", "#cccccc"],
      legend: {
        position: "bottom",
        fontSize: "14px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 400,
        labels: {
          colors: "grey"
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  }

  // Dados para o gráfico de barras (porcentagens)
  const barData = {
    series: [
      {
        name: "Percentual",
        data: [
          stats.percentualConcluido,
          stats.percentualEmAndamento,
          stats.percentualPendente,
          stats.percentualNA
        ]
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        foreColor: "grey",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
          borderRadius: 4,
        },
      },
      colors: ["#b53340"],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%"
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        opacity: 0.8,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ["Concluído", "Em Andamento", "Pendente", "N/A"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
          style: {
            fontSize: "12px"
          }
        },
      },
      yaxis: {
        max: 100,
        title: {
          text: "Percentual (%)",
          style: {
            fontSize: "12px",
            color: "grey"
          }
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "%"
          }
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      }
    }
  }

  return (
    <>
      <section className='charts grid2'>
        <div className='cardBox'>
          <Common title={`Status dos Controles (Total: ${stats.total})`} />
          <ReactApexChart options={donutData.options} series={donutData.series} type='donut' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Distribuição por Status (%)' />
          <ReactApexChart options={barData.options} series={barData.series} type='bar' height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts