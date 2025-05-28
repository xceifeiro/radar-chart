import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
  message: string
  timestamp: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    name: "API Hello",
    message: "API está funcionando!",
    timestamp: new Date().toISOString(),
  })
}
