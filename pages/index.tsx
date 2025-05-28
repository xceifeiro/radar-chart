import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Head>
        <title>Radar Chart API</title>
        <meta name="description" content="API para geração de gráficos radar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full max-w-md flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Radar Chart API</h1>
        <p className="mb-8 text-gray-600">API para geração de gráficos radar (Roda da Vida)</p>

        <div className="grid grid-cols-1 gap-4 w-full">
          <Link href="/api/hello">
            <a className="p-4 border rounded-lg hover:bg-gray-100 transition-colors block text-center">
              🔗 Testar API Hello
            </a>
          </Link>

          <Link href="/api/radar">
            <a className="p-4 border rounded-lg hover:bg-gray-100 transition-colors block text-center">
              🎯 Testar API Radar
            </a>
          </Link>

          <Link href="/test">
            <a className="p-4 border rounded-lg hover:bg-gray-100 transition-colors block text-center">
              🧪 Página de Teste
            </a>
          </Link>

          <Link href="/chart">
            <a className="p-4 border rounded-lg hover:bg-gray-100 transition-colors block text-center">
              📊 Gerador de Gráfico
            </a>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full">
          <h2 className="font-semibold text-blue-800 mb-2">Status</h2>
          <p className="text-blue-700 text-sm">
            ✅ Usando Next.js 12 com Pages Router
            <br />✅ APIs em /pages/api/
            <br />✅ Estrutura simplificada
          </p>
        </div>
      </main>
    </div>
  )
}
