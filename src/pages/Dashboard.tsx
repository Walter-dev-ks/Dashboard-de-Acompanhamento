import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, AlertTriangle, Clock, GraduationCap, Heart, Hammer, DollarSign, Users, TreePine } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import KPICard from "@/components/KPICard";
import { SecretariaStatusBadge } from "@/components/StatusBadge";
import StatusPieChart from "@/components/charts/StatusPieChart";
import SecretariaBarChart from "@/components/charts/SecretariaBarChart";
import TimelineChart from "@/components/charts/TimelineChart";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Heart, Hammer, DollarSign, Users, TreePine,
};

const Dashboard = () => {
  const { secretarias } = useData();
  const allProjects = secretarias.flatMap((s) => s.projetos);
  const total = allProjects.length;
  const concluidos = allProjects.filter((p) => p.status === "concluido").length;
  const emExecucao = allProjects.filter((p) => p.status === "em_execucao").length;
  const atrasados = allProjects.filter((p) => p.status === "atrasado").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Principal</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão consolidada de todas as secretarias</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total de Projetos" value={total} icon={<Briefcase className="h-5 w-5" />} />
        <KPICard label="Em Execução" value={emExecucao} icon={<Clock className="h-5 w-5" />} color="bg-status-blue-bg text-status-blue" />
        <KPICard label="Concluídos" value={concluidos} icon={<CheckCircle2 className="h-5 w-5" />} color="bg-status-green-bg text-status-green" />
        <KPICard label="Atrasados" value={atrasados} icon={<AlertTriangle className="h-5 w-5" />} color="bg-status-red-bg text-status-red" />
      </div>

      {/* Secretarias Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Secretarias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {secretarias.map((sec) => {
            const Icon = iconMap[sec.icone] || Briefcase;
            const projAtrasados = sec.projetos.filter((p) => p.status === "atrasado").length;
            const projExecucao = sec.projetos.filter((p) => p.status === "em_execucao").length;
            return (
              <Link
                key={sec.id}
                to={`/secretaria/${sec.id}`}
                className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{sec.sigla}</h3>
                      <p className="text-xs text-muted-foreground">{sec.responsavel}</p>
                    </div>
                  </div>
                  <SecretariaStatusBadge status={sec.status_geral} />
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{sec.nome}</p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{sec.projetos.length} projetos</span>
                  {projExecucao > 0 && <span className="text-status-blue">{projExecucao} em execução</span>}
                  {projAtrasados > 0 && <span className="text-status-red">{projAtrasados} atrasado(s)</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      {/* Desktop: Grid com Pizza e Barra lado a lado | Mobile: Apenas Pizza */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusPieChart projects={allProjects} />
        <div className="hidden lg:block">
          <SecretariaBarChart secretarias={secretarias} />
        </div>
      </div>

      {/* Timeline - Oculto em smartphones (md e acima) */}
      <div className="hidden md:block">
        <TimelineChart projects={allProjects} />
      </div>
    </div>
  );
};

export default Dashboard;
