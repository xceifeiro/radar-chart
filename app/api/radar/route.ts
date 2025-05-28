import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("POST /api/radar - Requisição recebida")

  try {
    const body = await request.json()
    console.log("Body recebido:", body)

    const { labels, data } = body

    if (!labels || !data) {
      console.log("Erro: labels ou data não fornecidos")
      return NextResponse.json(
        {
          error: "labels e data são obrigatórios",
          received: { labels: !!labels, data: !!data },
        },
        { status: 400 },
      )
    }

    if (!Array.isArray(labels) || !Array.isArray(data)) {
      console.log("Erro: labels ou data não são arrays")
      return NextResponse.json(
        {
          error: "labels e data devem ser arrays",
        },
        { status: 400 },
      )
    }

    if (labels.length !== data.length) {
      console.log("Erro: tamanhos diferentes")
      return NextResponse.json(
        {
          error: "labels e data devem ter o mesmo tamanho",
        },
        { status: 400 },
      )
    }

    console.log("Processando dados:", { labels, data })

    // Retorna a configuração do gráfico para ser renderizada no cliente
    const response = {
      success: true,
      config: {
        labels,
        data,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("Resposta enviada:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("GET /api/radar - Requisição recebida")

  const response = {
    message: "API de geração de radar está rodando 🎯",
    status: "online",
    timestamp: new Date().toISOString(),
    endpoints: {
      "GET /api/radar": "Informações sobre a API",
      "POST /api/radar": "Processa dados do gráfico radar",
    },
    example: {
      method: "POST",
      url: "/api/radar",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        labels: ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
        data: [8, 6, 7, 5, 9, 4],
      },
    },
  }

  console.log("GET response:", response)
  return NextResponse.json(response)
}

// Adicionar suporte para OPTIONS (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
