import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { labels, data } = body

    if (!labels || !data) {
      return NextResponse.json({ error: "labels e data são obrigatórios" }, { status: 400 })
    }

    // Retorna a configuração do gráfico para ser renderizada no cliente
    return NextResponse.json({
      success: true,
      config: {
        labels,
        data,
      },
    })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de geração de radar está rodando 🎯",
    endpoints: {
      POST: "/api/radar - Processa dados do gráfico radar",
      example: {
        labels: ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
        data: [8, 6, 7, 5, 9, 4],
      },
    },
  })
}
