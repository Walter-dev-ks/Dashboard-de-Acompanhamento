import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { ProjectStatusBadge, SecretariaStatusBadge } from "@/components/StatusBadge";
import StatusPieChart from "@/components/charts/StatusPieChart";

const SecretariaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { secretarias } = useData();
  const secretaria = secretarias.find((s) => s.id === id);

  if (!secretaria) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Secretaria não encontrada.</p>
        <Link to="/" className="text-primary text-sm mt-2 hover:underline">Voltar ao Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Dashboard
      </Link>

      <div className="bg-card rounded-xl border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">{secretaria.nome}</h1>
            <p className="text-sm text-muted-foreground mt-1">Responsável: <span className="font-medium text-foreground">{secretaria.responsavel}</span></p>
          </div>
          <SecretariaStatusBadge status={secretaria.status_geral} />
        </div>
      </div>

      {/* Mini chart for this secretaria */}
      {secretaria.projetos.length > 0 && (
        <StatusPieChart projects={secretaria.projetos} />
      )}

      {/* Projects table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-foreground">Projetos e Ações</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{secretaria.projetos.length} projeto(s) cadastrado(s)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projeto</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prazo</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Responsável</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Atualização</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {secretaria.projetos.map((proj) => (
                <tr key={proj.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{proj.nome}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{proj.descricao}</p>
                  </td>
                  <td className="px-6 py-4"><ProjectStatusBadge status={proj.status} /></td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {new Date(proj.prazo_previsto).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{proj.responsavel}</td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {new Date(proj.ultima_atualizacao).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observações */}
        <div className="border-t px-6 py-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Observações</h3>
          {secretaria.projetos.map((proj) => (
            <div key={proj.id} className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground">{proj.nome}</p>
              <p className="text-xs text-muted-foreground mt-1">{proj.observacoes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecretariaDetail;
