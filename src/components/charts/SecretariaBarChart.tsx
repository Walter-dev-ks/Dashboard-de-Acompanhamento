import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Secretaria } from "@/data/mockData";

interface Props {
  secretarias: Secretaria[];
}

const SecretariaBarChart = ({ secretarias }: Props) => {
  const data = secretarias.map((s) => ({
    name: s.sigla,
    "Em Execução": s.projetos.filter((p) => p.status === "em_execucao").length,
    Concluído: s.projetos.filter((p) => p.status === "concluido").length,
    Atrasado: s.projetos.filter((p) => p.status === "atrasado").length,
    Planejado: s.projetos.filter((p) => p.status === "planejado").length,
  }));

  return (
    <div className="bg-card rounded-xl border p-5">
      <h3 className="font-semibold text-foreground text-sm mb-4">Projetos por Secretaria</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
          <XAxis dataKey="name" fontSize={11} tick={{ fill: "hsl(220, 10%, 50%)" }} />
          <YAxis allowDecimals={false} fontSize={11} tick={{ fill: "hsl(220, 10%, 50%)" }} />
          <Tooltip />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Em Execução" fill="hsl(215, 70%, 50%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Concluído" fill="hsl(152, 60%, 42%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Atrasado" fill="hsl(0, 72%, 51%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Planejado" fill="hsl(220, 10%, 50%)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecretariaBarChart;
