import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Project, getStatusLabel } from "@/data/mockData";

const STATUS_COLORS: Record<string, string> = {
  planejado: "hsl(220, 10%, 50%)",
  em_execucao: "hsl(215, 70%, 50%)",
  concluido: "hsl(152, 60%, 42%)",
  atrasado: "hsl(0, 72%, 51%)",
  paralisado: "hsl(38, 92%, 50%)",
};

interface Props {
  projects: Project[];
}

const TimelineChart = ({ projects }: Props) => {
  const now = new Date("2026-04-14").getTime();
  const sorted = [...projects].sort((a, b) => new Date(a.prazo_previsto).getTime() - new Date(b.prazo_previsto).getTime());

  const data = sorted.map((p) => {
    const prazo = new Date(p.prazo_previsto).getTime();
    const diffDays = Math.round((prazo - now) / (1000 * 60 * 60 * 24));
    return {
      name: p.nome.length > 25 ? p.nome.slice(0, 25) + "…" : p.nome,
      dias: diffDays,
      status: p.status,
      prazo: new Date(p.prazo_previsto).toLocaleDateString("pt-BR"),
      statusLabel: getStatusLabel(p.status),
    };
  });

  return (
    <div className="bg-card rounded-xl border p-5">
      <h3 className="font-semibold text-foreground text-sm mb-1">Timeline de Prazos</h3>
      <p className="text-xs text-muted-foreground mb-4">Dias restantes até o prazo (negativo = atrasado)</p>
      <ResponsiveContainer width="100%" height={Math.max(260, data.length * 32)}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" horizontal={false} />
          <XAxis type="number" fontSize={11} tick={{ fill: "hsl(220, 10%, 50%)" }} label={{ value: "Dias", position: "insideBottomRight", offset: -5, fontSize: 11 }} />
          <YAxis dataKey="name" type="category" width={160} fontSize={10} tick={{ fill: "hsl(220, 10%, 50%)" }} />
          <Tooltip
            formatter={(value: number, _name: string, props: any) => [`${value} dias | ${props.payload.statusLabel}`, `Prazo: ${props.payload.prazo}`]}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="dias" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLORS[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
