export default function handler(req, res) {
  res.status(200).json({
    message: "API está funcionando!",
    timestamp: new Date().toISOString(),
  })
}
