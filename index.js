// index.js
const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();
app.use(express.json());

const width = 800;
const height = 800;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

app.post('/radar', async (req, res) => {
  const labels = req.body.labels;
  const data = req.body.data;

  if (!labels || !data) {
    return res.status(400).send({ error: 'labels and data are required' });
  }

  const configuration = {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Roda da Vida',
        data,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointRadius: 5,
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
            color: '#555',
            backdropColor: 'transparent',
          },
          grid: {
            color: '#ccc',
          },
          angleLines: {
            color: '#888',
          },
          pointLabels: {
            font: {
              size: 14,
            },
            color: '#333',
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);

  res.set('Content-Type', 'image/png');
  res.send(image);
});

app.get('/', (req, res) => {
  res.send('API de geração de radar está rodando 🎯');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
