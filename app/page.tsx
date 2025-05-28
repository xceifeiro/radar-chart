"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function RadarChartGenerator() {
  const [labels, setLabels] = useState(["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"])
  const [data, setData] = useState([8, 6, 7, 5, 9, 4])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateChart = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/radar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labels, data }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      } else {
        alert("Erro ao gerar gráfico")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao gerar gráfico")
    } finally {
      setLoading(false)
    }
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

              <Button onClick={generateChart} disabled={loading} className="w-full" size="lg">
                {loading ? "Gerando..." : "Gerar Gráfico Radar"}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card>
            <CardHeader>
              <CardTitle>Seu Gráfico Radar</CardTitle>
              <CardDescription>Visualização da sua Roda da Vida</CardDescription>
            </CardHeader>
            <CardContent>
              {imageUrl ? (
                <div className="text-center">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Gráfico Radar"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  <Button
                    className="mt-4"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = imageUrl
                      link.download = "roda-da-vida.png"
                      link.click()
                    }}
                  >
                    Baixar Imagem
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Clique em "Gerar Gráfico Radar" para visualizar</p>
                </div>
              )}
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
              <div className="mt-2 text-yellow-400">Retorna: Imagem PNG do gráfico radar</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
