import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Project, getStatusLabel } from "@/data/mockData";

const COLORS: Record<string, string> = {
  planejado: "hsl(220, 10%, 50%)",
  em_execucao: "hsl(215, 70%, 50%)",
  concluido: "hsl(152, 60%, 42%)",
  atrasado: "hsl(0, 72%, 51%)",
  paralisado: "hsl(38, 92%, 50%)",
};

interface Props {
  projects: Project[];
}

const StatusPieChart = ({ projects }: Props) => {
  const counts: Record<string, number> = {};
  projects.forEach((p) => {
    counts[p.status] = (counts[p.status] || 0) + 1;
  });
  const data = Object.entries(counts).map(([status, value]) => ({
    name: getStatusLabel(status as any),
    value,
    status,
  }));

  if (!data.length) return <p className="text-sm text-muted-foreground text-center py-8">Sem projetos</p>;

  return (
    <div className="bg-card rounded-xl border p-5">
      <h3 className="font-semibold text-foreground text-sm mb-4">Distribuição por Status</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
            {data.map((entry) => (
              <Cell key={entry.status} fill={COLORS[entry.status]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
