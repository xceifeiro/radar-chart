import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API /api/test chamada")

  res.status(200).json({
    message: "API de teste funcionando!",
    timestamp: new Date().toISOString(),
    status: "OK",
    method: req.method,
    url: req.url,
  })
}
