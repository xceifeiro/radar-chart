"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testGetEndpoint = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/radar", {
        method: "GET",
      })

      const data = await response.json()
      setResult({
        status: response.status,
        method: "GET",
        data,
      })
    } catch (err) {
      setError(`Erro GET: ${err}`)
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

      const data = await response.json()
      setResult({
        status: response.status,
        method: "POST",
        requestData: testData,
        responseData: data,
      })
    } catch (err) {
      setError(`Erro POST: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste da API Radar</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Teste GET</CardTitle>
              <CardDescription>Testa o endpoint GET /api/radar</CardDescription>
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
              <CardDescription>Testa o endpoint POST /api/radar</CardDescription>
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
              <pre className="text-red-600 text-sm">{error}</pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado do Teste</CardTitle>
              <CardDescription>
                Status: {result.status} | Método: {result.method}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
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
                <strong>URL atual:</strong> {typeof window !== "undefined" ? window.location.origin : "N/A"}
              </p>
              <p>
                <strong>Endpoint GET:</strong> /api/radar
              </p>
              <p>
                <strong>Endpoint POST:</strong> /api/radar
              </p>
              <p>
                <strong>Página principal:</strong>{" "}
                <a href="/" className="text-blue-600 hover:underline">
                  /
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
