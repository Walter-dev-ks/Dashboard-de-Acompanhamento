import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectStatusBadge, SecretariaStatusBadge } from "@/components/StatusBadge";
import { ProjectStatus, SecretariaStatus } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const iconeOptions = ["GraduationCap", "Heart", "Hammer", "DollarSign", "Users", "TreePine"];

const Gerenciar = () => {
  const { secretarias, addSecretaria, updateSecretaria, deleteSecretaria, addProject, updateProject, deleteProject } = useData();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNewSec, setShowNewSec] = useState(false);
  const [newSec, setNewSec] = useState({ nome: "", sigla: "", responsavel: "", status_geral: "em_dia" as SecretariaStatus, icone: "Briefcase" });
  const [editingSec, setEditingSec] = useState<string | null>(null);
  const [editSecData, setEditSecData] = useState<any>({});
  const [showNewProj, setShowNewProj] = useState<string | null>(null);
  const [newProj, setNewProj] = useState({ nome: "", descricao: "", status: "planejado" as ProjectStatus, prazo_previsto: "", responsavel: "", ultima_atualizacao: new Date().toISOString().slice(0, 10), observacoes: "" });
  const [editingProj, setEditingProj] = useState<string | null>(null);
  const [editProjData, setEditProjData] = useState<any>({});

  const handleAddSec = () => {
    if (!newSec.nome || !newSec.sigla) { toast({ title: "Preencha nome e sigla", variant: "destructive" }); return; }
    addSecretaria(newSec);
    setNewSec({ nome: "", sigla: "", responsavel: "", status_geral: "em_dia", icone: "Briefcase" });
    setShowNewSec(false);
    toast({ title: "Secretaria criada!" });
  };

  const handleAddProj = (secId: string) => {
    if (!newProj.nome) { toast({ title: "Preencha o nome do projeto", variant: "destructive" }); return; }
    addProject(secId, newProj);
    setNewProj({ nome: "", descricao: "", status: "planejado", prazo_previsto: "", responsavel: "", ultima_atualizacao: new Date().toISOString().slice(0, 10), observacoes: "" });
    setShowNewProj(null);
    toast({ title: "Projeto adicionado!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciar</h1>
          <p className="text-sm text-muted-foreground mt-1">Crie e edite secretarias e projetos</p>
        </div>
        <Button onClick={() => setShowNewSec(true)} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Nova Secretaria
        </Button>
      </div>

      {/* New secretaria form */}
      {showNewSec && (
        <div className="bg-card rounded-xl border p-5 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Nova Secretaria</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input placeholder="Nome" value={newSec.nome} onChange={(e) => setNewSec({ ...newSec, nome: e.target.value })} />
            <Input placeholder="Sigla" value={newSec.sigla} onChange={(e) => setNewSec({ ...newSec, sigla: e.target.value })} />
            <Input placeholder="Responsável" value={newSec.responsavel} onChange={(e) => setNewSec({ ...newSec, responsavel: e.target.value })} />
            <Select value={newSec.icone} onValueChange={(v) => setNewSec({ ...newSec, icone: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {iconeOptions.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddSec}><Save className="h-3.5 w-3.5 mr-1" />Salvar</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowNewSec(false)}><X className="h-3.5 w-3.5 mr-1" />Cancelar</Button>
          </div>
        </div>
      )}

      {/* Secretarias list */}
      <div className="space-y-3">
        {secretarias.map((sec) => (
          <div key={sec.id} className="bg-card rounded-xl border overflow-hidden">
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === sec.id ? null : sec.id)}
            >
              <div className="flex items-center gap-3">
                {expanded === sec.id ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <span className="font-semibold text-foreground text-sm">{sec.sigla}</span>
                  <span className="text-muted-foreground text-sm ml-2">— {sec.nome}</span>
                </div>
                <SecretariaStatusBadge status={sec.status_geral} />
              </div>
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs text-muted-foreground">{sec.projetos.length} projeto(s)</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (editingSec === sec.id) {
                      updateSecretaria(sec.id, editSecData);
                      setEditingSec(null);
                      toast({ title: "Secretaria atualizada!" });
                    } else {
                      setEditingSec(sec.id);
                      setEditSecData({ nome: sec.nome, sigla: sec.sigla, responsavel: sec.responsavel, status_geral: sec.status_geral, icone: sec.icone });
                    }
                  }}
                >
                  {editingSec === sec.id ? <Save className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { deleteSecretaria(sec.id); toast({ title: "Secretaria removida" }); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Edit secretaria inline */}
            {editingSec === sec.id && (
              <div className="px-5 pb-3 border-t pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Input placeholder="Nome" value={editSecData.nome} onChange={(e) => setEditSecData({ ...editSecData, nome: e.target.value })} />
                  <Input placeholder="Sigla" value={editSecData.sigla} onChange={(e) => setEditSecData({ ...editSecData, sigla: e.target.value })} />
                  <Input placeholder="Responsável" value={editSecData.responsavel} onChange={(e) => setEditSecData({ ...editSecData, responsavel: e.target.value })} />
                  <Select value={editSecData.status_geral} onValueChange={(v) => setEditSecData({ ...editSecData, status_geral: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em_dia">Em Dia</SelectItem>
                      <SelectItem value="atencao">Atenção</SelectItem>
                      <SelectItem value="atrasada">Atrasada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" variant="ghost" className="mt-2" onClick={() => setEditingSec(null)}><X className="h-3.5 w-3.5 mr-1" />Cancelar</Button>
              </div>
            )}

            {/* Expanded: projects */}
            {expanded === sec.id && (
              <div className="border-t">
                <div className="px-5 py-3 flex items-center justify-between bg-muted/20">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projetos</span>
                  <Button size="sm" variant="outline" className="gap-1 text-xs h-7" onClick={() => setShowNewProj(sec.id)}>
                    <Plus className="h-3 w-3" /> Novo Projeto
                  </Button>
                </div>

                {/* New project form */}
                {showNewProj === sec.id && (
                  <div className="px-5 py-3 border-b bg-muted/10 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Input placeholder="Nome do projeto" value={newProj.nome} onChange={(e) => setNewProj({ ...newProj, nome: e.target.value })} />
                      <Input placeholder="Responsável" value={newProj.responsavel} onChange={(e) => setNewProj({ ...newProj, responsavel: e.target.value })} />
                      <Input type="date" value={newProj.prazo_previsto} onChange={(e) => setNewProj({ ...newProj, prazo_previsto: e.target.value })} />
                      <Select value={newProj.status} onValueChange={(v: ProjectStatus) => setNewProj({ ...newProj, status: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planejado">Planejado</SelectItem>
                          <SelectItem value="em_execucao">Em Execução</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                          <SelectItem value="paralisado">Paralisado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea placeholder="Descrição" value={newProj.descricao} onChange={(e) => setNewProj({ ...newProj, descricao: e.target.value })} rows={2} />
                    <Textarea placeholder="Observações" value={newProj.observacoes} onChange={(e) => setNewProj({ ...newProj, observacoes: e.target.value })} rows={2} />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAddProj(sec.id)}><Save className="h-3.5 w-3.5 mr-1" />Salvar</Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowNewProj(null)}><X className="h-3.5 w-3.5 mr-1" />Cancelar</Button>
                    </div>
                  </div>
                )}

                {/* Project rows */}
                {sec.projetos.map((proj) => (
                  <div key={proj.id} className="px-5 py-3 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    {editingProj === proj.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <Input value={editProjData.nome} onChange={(e) => setEditProjData({ ...editProjData, nome: e.target.value })} />
                          <Input value={editProjData.responsavel} onChange={(e) => setEditProjData({ ...editProjData, responsavel: e.target.value })} />
                          <Input type="date" value={editProjData.prazo_previsto} onChange={(e) => setEditProjData({ ...editProjData, prazo_previsto: e.target.value })} />
                          <Select value={editProjData.status} onValueChange={(v: ProjectStatus) => setEditProjData({ ...editProjData, status: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="planejado">Planejado</SelectItem>
                              <SelectItem value="em_execucao">Em Execução</SelectItem>
                              <SelectItem value="concluido">Concluído</SelectItem>
                              <SelectItem value="atrasado">Atrasado</SelectItem>
                              <SelectItem value="paralisado">Paralisado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Textarea value={editProjData.descricao} onChange={(e) => setEditProjData({ ...editProjData, descricao: e.target.value })} rows={2} />
                        <Textarea placeholder="Observações" value={editProjData.observacoes} onChange={(e) => setEditProjData({ ...editProjData, observacoes: e.target.value })} rows={2} />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => { updateProject(sec.id, proj.id, editProjData); setEditingProj(null); toast({ title: "Projeto atualizado!" }); }}>
                            <Save className="h-3.5 w-3.5 mr-1" />Salvar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingProj(null)}><X className="h-3.5 w-3.5 mr-1" />Cancelar</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-foreground text-sm">{proj.nome}</p>
                            <p className="text-xs text-muted-foreground">{proj.responsavel} · Prazo: {new Date(proj.prazo_previsto).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <ProjectStatusBadge status={proj.status} />
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => { setEditingProj(proj.id); setEditProjData({ nome: proj.nome, descricao: proj.descricao, status: proj.status, prazo_previsto: proj.prazo_previsto, responsavel: proj.responsavel, ultima_atualizacao: proj.ultima_atualizacao, observacoes: proj.observacoes }); }}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { deleteProject(sec.id, proj.id); toast({ title: "Projeto removido" }); }}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {sec.projetos.length === 0 && (
                  <p className="px-5 py-4 text-sm text-muted-foreground">Nenhum projeto cadastrado.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gerenciar;
