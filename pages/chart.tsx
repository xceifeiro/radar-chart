"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"

export default function ChartPage() {
  const [labels, setLabels] = useState(["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"])
  const [data, setData] = useState([8, 6, 7, 5, 9, 4])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const updateLabel = (index: number, value: string) => {
    const newLabels = [...labels]
    newLabels[index] = value
    setLabels(newLabels)
  }

  const updateData = (index: number, value: number) => {
    const newData = [...data]
    newData[index] = value
    setData(newData)
  }

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

      const result = await response.json()
      setResult(result)
    } catch (error) {
      console.error("Erro:", error)
      setResult({ error: "Erro ao gerar gráfico" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Head>
        <title>Gerador de Gráfico Radar</title>
        <meta name="description" content="Crie gráficos radar personalizados" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 Gerador de Gráfico Radar</h1>

        <div className="mb-6">
          <Link href="/">
            <a className="text-blue-600 hover:underline">← Voltar para a página inicial</a>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuração */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">⚙️ Configurar Áreas da Vida</h2>
            <div className="space-y-4">
              {labels.map((label, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium">Área {index + 1}</label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => updateLabel(index, e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Nome da área"
                  />
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 min-w-[60px]">Valor: {data[index]}</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={data[index]}
                      onChange={(e) => updateData(index, Number.parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={generateChart}
                disabled={loading}
                className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Gerando..." : "🎯 Gerar Gráfico"}
              </button>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">📈 Resultado</h2>
            {result ? (
              <div>
                {result.success ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">✅ Sucesso!</h3>
                    <pre className="text-sm bg-white p-3 rounded border overflow-auto max-h-64">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">❌ Erro</h3>
                    <pre className="text-sm text-red-600">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600">Configure os valores e clique em "Gerar Gráfico"</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="font-semibold text-yellow-800 mb-2">💡 Dica</h2>
          <p className="text-yellow-700 text-sm">
            Esta página demonstra como usar a API para gerar configurações de gráficos radar. Em uma implementação
            completa, você usaria uma biblioteca como Chart.js para renderizar o gráfico visual.
          </p>
        </div>
      </main>
    </div>
  )
}
