// app/page.tsx
import { argentinaDatos, type Cotizacion } from '@/lib/argentina-datos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default async function MacroArg() {
  const [dolares, inflacion, uva] = await Promise.all([
    argentinaDatos.getDolares(),
    argentinaDatos.getInflacion(),
    argentinaDatos.getUVA(),
  ]);

  const blue = dolares.find(d => d.casa === 'blue')!;
  const oficial = dolares.find(d => d.casa === 'oficial')!;
  const ultimaInflacion = inflacion[inflacion.length - 1];
  const ultimoUva = uva[uva.length - 1];

  const dolarHistorico = await argentinaDatos.getDolarHistorico('blue');
  const chartData = dolarHistorico.slice(-12).map(d => ({
    fecha: d.fecha.slice(5),
    venta: d.venta,
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 flex items-center gap-4">
          🇦🇷 MacroArg
        </h1>
        <p className="text-zinc-400 mb-12">Dashboard económico en tiempo real • Mejor que argentinadatos.com</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Dólar Blue</CardTitle>
              <DollarSign className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold tracking-tighter">Venta ${blue.venta}</p>
              <p className="text-zinc-400">Compra ${blue.compra}</p>
              <p className="text-xs text-zinc-500 mt-3">{blue.fecha}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Dólar Oficial</CardTitle>
              <DollarSign className="h-6 w-6 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold tracking-tighter">Venta ${oficial.venta}</p>
              <p className="text-zinc-400">Compra ${oficial.compra}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Inflación Mensual</CardTitle>
              <TrendingUp className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold tracking-tighter">{ultimaInflacion.valor}%</p>
              <p className="text-zinc-400">{ultimaInflacion.fecha}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Índice UVA</CardTitle>
              <Calendar className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold tracking-tighter">{ultimoUva.valor}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Dólar Blue – Últimos 12 meses</CardTitle>
          </CardHeader>
          <CardContent className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="venta" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}