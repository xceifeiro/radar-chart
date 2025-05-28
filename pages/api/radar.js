export default function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  if (req.method === "GET") {
    res.status(200).json({
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
    return
  }

  if (req.method === "POST") {
    try {
      const { labels, data } = req.body

      // Validações básicas
      if (!labels || !data) {
        return res.status(400).json({
          error: "labels e data são obrigatórios",
        })
      }

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

      res.status(200).json(response)
      return
    } catch (error) {
      res.status(500).json({
        error: "Erro interno do servidor",
        details: error.message || "Erro desconhecido",
      })
      return
    }
  }

  // Método não permitido
  res.status(405).json({
    error: "Método não permitido",
    allowedMethods: ["GET", "POST", "OPTIONS"],
  })
}
