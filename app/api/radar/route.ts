import { type NextRequest, NextResponse } from "next/server"
import { ChartJSNodeCanvas } from "chartjs-node-canvas"

const width = 800
const height = 800
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { labels, data } = body

    if (!labels || !data) {
      return NextResponse.json({ error: "labels and data are required" }, { status: 400 })
    }

    const configuration = {
      type: "radar" as const,
      data: {
        labels,
        datasets: [
          {
            label: "Roda da Vida",
            data,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
              color: "#555",
              backdropColor: "transparent",
            },
            grid: {
              color: "#ccc",
            },
            angleLines: {
              color: "#888",
            },
            pointLabels: {
              font: {
                size: 14,
              },
              color: "#333",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }

    const image = await chartJSNodeCanvas.renderToBuffer(configuration)

    return new NextResponse(image, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Erro ao gerar gráfico:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de geração de radar está rodando 🎯",
    endpoints: {
      POST: "/api/radar - Gera gráfico radar",
      example: {
        labels: ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
        data: [8, 6, 7, 5, 9, 4],
      },
    },
  })
}
