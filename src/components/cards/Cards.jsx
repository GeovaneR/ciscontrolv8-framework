import ReactApexChart from "react-apexcharts"
import "./cards.css"
import Common from "../../common/Common"


const Cards = () => {
  const data = {
    series: [58],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
          track: {
            background: "#bc475350",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: ["58"],
      colors: ["#b53340"],
    },
  }
  const data1 = {
    series: [80],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
          track: {
            background: "#33b5a850",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: ["80"],
      colors: ["#33b5a8"],
    },
  }

  return (
    <>
      <section className='cards grid'>
        <div className='cardBox'>
          <Common title='Totala Revenue' />
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data.options} series={data.series} type='radialBar' height={150} />
            </div>
          </div>
        </div>
        <div className='cardBox'>
          <Common title='Total Revenue' />
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data1.options} series={data1.series} type='radialBar' height={150} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cards
