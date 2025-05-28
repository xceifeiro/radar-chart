"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin)
    }
  }, [])

  const testApiTest = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/test", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult({
        endpoint: "/api/test",
        status: response.status,
        method: "GET",
        data,
      })
    } catch (err) {
      setError(`Erro /api/test: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testGetEndpoint = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/radar", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult({
        endpoint: "/api/radar",
        status: response.status,
        method: "GET",
        data,
      })
    } catch (err) {
      setError(`Erro GET /api/radar: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testPostEndpoint = async () => {
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

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      setResult({
        endpoint: "/api/radar",
        status: response.status,
        method: "POST",
        requestData: testData,
        responseData: data,
      })
    } catch (err) {
      setError(`Erro POST /api/radar: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste da API Radar</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Teste Básico</CardTitle>
              <CardDescription>Testa /api/test</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testApiTest} disabled={loading} className="w-full">
                {loading ? "Testando..." : "Testar /api/test"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teste GET</CardTitle>
              <CardDescription>Testa GET /api/radar</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testGetEndpoint} disabled={loading} className="w-full">
                {loading ? "Testando..." : "Testar GET"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teste POST</CardTitle>
              <CardDescription>Testa POST /api/radar</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testPostEndpoint} disabled={loading} className="w-full">
                {loading ? "Testando..." : "Testar POST"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Erro</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-red-600 text-sm whitespace-pre-wrap">{error}</pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado do Teste</CardTitle>
              <CardDescription>
                Endpoint: {result.endpoint} | Status: {result.status} | Método: {result.method}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informações de Debug</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>URL base:</strong> {baseUrl || "Carregando..."}
              </p>
              <p>
                <strong>Endpoints disponíveis:</strong>
              </p>
              <ul className="ml-4 space-y-1">
                <li>• GET {baseUrl}/api/test</li>
                <li>• GET {baseUrl}/api/radar</li>
                <li>• POST {baseUrl}/api/radar</li>
              </ul>
              <p>
                <strong>Links úteis:</strong>
              </p>
              <ul className="ml-4 space-y-1">
                <li>
                  •{" "}
                  <a href="/" className="text-blue-600 hover:underline">
                    Página principal
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="/api/test" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                    Testar /api/test diretamente
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="/api/radar" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                    Testar /api/radar diretamente
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Exemplo de curl</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="mb-4">
                <div className="text-yellow-400"># Teste GET</div>
                <div>curl {baseUrl}/api/radar</div>
              </div>
              <div>
                <div className="text-yellow-400"># Teste POST</div>
                <div>curl -X POST {baseUrl}/api/radar \</div>
                <div className="ml-2">-H "Content-Type: application/json" \</div>
                <div className="ml-2">-d '{`{"labels":["Saúde","Carreira"],"data":[8,6]}`}'</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
