export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    //danger: '#FF3860',
  },
}

const randomChartData = (n: number) => {
  const data = []

  for (let i = 0; i < n; i++) {
    (i != 2)? data.push(0) : data.push(Math.round(Math.random() * 200))
  }

  console.log(data)
  return data
}

const datasetObject = (color: string, points: number) => {
  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: randomChartData(points),
    tension: 0.5,
    cubicInterpolationMode: 'default',
  }
}

export const sampleChartData = (points = 12) => {
  const labels = []
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep","Oct", "Nov", "Dec"]
  for (let i = 0; i < points; i++) {

      labels.push(`${months[i]}`)
  }

  return {
    labels,
    datasets: [
      datasetObject('primary', points),
      datasetObject('info', points),
      //datasetObject('danger', points),
    ],
  }
}
