"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar } from "react-chartjs-2"

// Registrar componentes do Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function RadarChartGenerator() {
  const [labels, setLabels] = useState(["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"])
  const [data, setData] = useState([8, 6, 7, 5, 9, 4])
  const [loading, setLoading] = useState(false)
  const chartRef = useRef<ChartJS>(null)

  const chartData = {
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
  }

  const chartOptions = {
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
  }

  const updateLabel = (index: number, value: string) => {
    const newLabels = [...labels]
    newLabels[index] = value
    setLabels(newLabels)
  }

  const updateData = (index: number, value: number[]) => {
    const newData = [...data]
    newData[index] = value[0]
    setData(newData)
  }

  const downloadChart = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image("image/png", 1.0)
      const link = document.createElement("a")
      link.download = "roda-da-vida.png"
      link.href = url
      link.click()
    }
  }

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/radar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labels, data }),
      })

      const result = await response.json()
      if (result.success) {
        alert("API funcionando corretamente!")
      } else {
        alert(`Erro: ${result.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao testar API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerador de Gráfico Radar</h1>
          <p className="text-lg text-gray-600">Crie sua Roda da Vida personalizada</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuração */}
          <Card>
            <CardHeader>
              <CardTitle>Configurar Áreas da Vida</CardTitle>
              <CardDescription>Ajuste os rótulos e valores para cada área</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {labels.map((label, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`label-${index}`}>Área {index + 1}</Label>
                  <Input
                    id={`label-${index}`}
                    value={label}
                    onChange={(e) => updateLabel(index, e.target.value)}
                    placeholder="Nome da área"
                  />
                  <div className="flex items-center space-x-4">
                    <Label className="text-sm text-gray-600 min-w-[60px]">Valor: {data[index]}</Label>
                    <Slider
                      value={[data[index]]}
                      onValueChange={(value) => updateData(index, value)}
                      max={10}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <Button onClick={testApi} disabled={loading} className="flex-1">
                  {loading ? "Testando..." : "Testar API"}
                </Button>
                <Button onClick={downloadChart} className="flex-1">
                  Baixar Gráfico
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card>
            <CardHeader>
              <CardTitle>Seu Gráfico Radar</CardTitle>
              <CardDescription>Visualização da sua Roda da Vida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg">
                <Radar ref={chartRef} data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exemplo de uso da API */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Como usar a API</CardTitle>
            <CardDescription>Endpoint para integração externa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="mb-2">
                <span className="text-blue-400">POST</span> /api/radar
              </div>
              <div className="text-gray-300">
                {`{
  "labels": ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
  "data": [8, 6, 7, 5, 9, 4]
}`}
              </div>
              <div className="mt-2 text-yellow-400">Retorna: Configuração do gráfico em JSON</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
