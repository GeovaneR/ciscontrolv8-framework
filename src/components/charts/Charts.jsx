import React from "react"
import Common from "../../common/Common"
import "./chart.css"
import ReactApexChart from "react-apexcharts"

const Charts = () => {
  const data = {
    series: [44, 55, 13],
    options: {
      chart: {
        type: "donut",
        foreColor: "grey",
      },
      fill: {
        colors: ["#33b5a8", "#b53340", "#0059ff"],
      },
      stroke: {
        colors: ["transparent"],
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: ["Concluídos", "Em progressso", "N/A"],
      colors: ["#33b5a8", "#b53340", "#0059ff"],
      legend: {
        position: "bottom",
      },
    },
  }

  const bardata = {
    series: [
      {
        name: "Net Profit",
        data: [65, 45, 75, 35, 30, 85],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        foreColor: "grey",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          endingShape: "rounded",
        },
      },
      colors: ["#0059ff"],
      dataLabels: {
        foreColor: "#fff",
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        opacity: 1,
      },
      grid: {
        show: false,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
    },
  }

  return (
    <>
      <section className='charts grid2'>
        <div className='cardBox'>
          <Common title='Daily Sales' />
          <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Statistics' />
          <ReactApexChart options={bardata.options} series={bardata.series} type='bar' height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts
