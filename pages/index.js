export default function Home() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Radar Chart API</h1>
      <p>API para geração de gráficos radar (Roda da Vida)</p>

      <div style={{ marginTop: "20px" }}>
        <h2>Endpoints disponíveis:</h2>
        <ul>
          <li>
            <a href="/api/hello">GET /api/hello</a> - Teste básico da API
          </li>
          <li>
            <a href="/api/radar">GET /api/radar</a> - Informações sobre a API de radar
          </li>
          <li>
            <strong>POST /api/radar</strong> - Gera configuração de gráfico radar
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
        <h3>Exemplo de uso:</h3>
        <pre style={{ backgroundColor: "#333", color: "#0f0", padding: "10px", borderRadius: "5px", overflow: "auto" }}>
          {`curl -X POST https://seu-dominio.vercel.app/api/radar \\
  -H "Content-Type: application/json" \\
  -d '{
    "labels": ["Saúde", "Carreira", "Relacionamentos", "Finanças", "Lazer", "Crescimento"],
    "data": [8, 6, 7, 5, 9, 4]
  }'`}
        </pre>
      </div>
    </div>
  )
}
