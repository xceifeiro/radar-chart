"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testHelloApi = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/hello")
      const data = await response.json()
      setResult({
        endpoint: "/api/hello",
        status: response.status,
        data,
      })
    } catch (err) {
      setError(`Erro: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testRadarApi = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/radar")
      const data = await response.json()
      setResult({
        endpoint: "/api/radar",
        status: response.status,
        data,
      })
    } catch (err) {
      setError(`Erro: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testRadarPostApi = async () => {
    setLoading(true)
    setError(null)
    try {
      const testData = {
        labels: ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
        data: [8, 6, 7, 5, 9, 4],
      }

      const response = await fetch("/api/radar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const data = await response.json()
      setResult({
        endpoint: "/api/radar (POST)",
        status: response.status,
        requestData: testData,
        responseData: data,
      })
    } catch (err) {
      setError(`Erro: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Head>
        <title>Teste da API - Radar Chart</title>
        <meta name="description" content="Página de teste para a API de gráficos radar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Teste da API - Pages Router</h1>

        <div className="mb-6">
          <Link href="/">
            <a className="text-blue-600 hover:underline">← Voltar para a página inicial</a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testHelloApi}
            disabled={loading}
            className="p-4 bg-white border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? "Testando..." : "🔗 Testar API Hello"}
          </button>

          <button
            onClick={testRadarApi}
            disabled={loading}
            className="p-4 bg-white border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? "Testando..." : "🎯 Testar GET /api/radar"}
          </button>

          <button
            onClick={testRadarPostApi}
            disabled={loading}
            className="p-4 bg-white border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? "Testando..." : "📤 Testar POST /api/radar"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="font-semibold text-red-800 mb-2">❌ Erro</h2>
            <pre className="text-red-600 text-sm">{error}</pre>
          </div>
        )}

        {result && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2 text-green-800">
              ✅ Resultado: {result.endpoint} (Status: {result.status})
            </h2>
            <pre className="bg-gray-50 p-4 rounded border text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-800 mb-2">🔗 Links Diretos</h2>
          <ul className="space-y-2">
            <li>
              <a href="/api/hello" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                📋 /api/hello
              </a>
            </li>
            <li>
              <a href="/api/radar" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                🎯 /api/radar
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
          <h2 className="font-semibold mb-2">📋 Exemplo de curl</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-4">
              <div className="text-yellow-400"># Teste GET</div>
              <div>curl https://v0-radar-chart-generator.vercel.app/api/radar</div>
            </div>
            <div>
              <div className="text-yellow-400"># Teste POST</div>
              <div>curl -X POST https://v0-radar-chart-generator.vercel.app/api/radar \</div>
              <div className="ml-2">-H "Content-Type: application/json" \</div>
              <div className="ml-2">-d '{`{"labels":["Saúde","Carreira"],"data":[8,6]}`}'</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
