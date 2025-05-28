import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  console.log("GET /api/radar chamado")

  return NextResponse.json({
    message: "API de geração de radar está rodando 🎯",
    status: "online",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
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
  })
}

export async function POST(request: NextRequest) {
  console.log("POST /api/radar chamado")

  try {
    const body = await request.json()
    console.log("Body recebido:", body)

    const { labels, data } = body

    // Validações
    if (!labels || !data) {
      return NextResponse.json(
        {
          error: "labels e data são obrigatórios",
          received: { labels: !!labels, data: !!data },
        },
        { status: 400 },
      )
    }

    if (!Array.isArray(labels) || !Array.isArray(data)) {
      return NextResponse.json(
        {
          error: "labels e data devem ser arrays",
        },
        { status: 400 },
      )
    }

    if (labels.length !== data.length) {
      return NextResponse.json(
        {
          error: "labels e data devem ter o mesmo tamanho",
          labelsLength: labels.length,
          dataLength: data.length,
        },
        { status: 400 },
      )
    }

    // Validar se data contém apenas números
    if (!data.every((item) => typeof item === "number" && item >= 0 && item <= 10)) {
      return NextResponse.json(
        {
          error: "data deve conter apenas números entre 0 e 10",
        },
        { status: 400 },
      )
    }

    console.log("Dados válidos, processando...")

    const response = {
      success: true,
      message: "Dados processados com sucesso",
      config: {
        labels,
        data,
        chartType: "radar",
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
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
