import { cn } from "@/lib/utils";
import type { ProjectStatus, SecretariaStatus } from "@/data/mockData";
import { getStatusLabel, getSecretariaStatusLabel } from "@/data/mockData";

const projectStatusStyles: Record<ProjectStatus, string> = {
  planejado: "bg-status-blue-bg text-status-blue",
  em_execucao: "bg-status-green-bg text-status-green",
  concluido: "bg-muted text-muted-foreground",
  atrasado: "bg-status-red-bg text-status-red",
  paralisado: "bg-status-yellow-bg text-status-yellow",
};

const secretariaStatusStyles: Record<SecretariaStatus, string> = {
  em_dia: "bg-status-green-bg text-status-green",
  atencao: "bg-status-yellow-bg text-status-yellow",
  atrasada: "bg-status-red-bg text-status-red",
};

const dotStyles: Record<SecretariaStatus, string> = {
  em_dia: "bg-status-green",
  atencao: "bg-status-yellow",
  atrasada: "bg-status-red",
};

export const ProjectStatusBadge = ({ status }: { status: ProjectStatus }) => (
  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", projectStatusStyles[status])}>
    {getStatusLabel(status)}
  </span>
);

export const SecretariaStatusBadge = ({ status }: { status: SecretariaStatus }) => (
  <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", secretariaStatusStyles[status])}>
    <span className={cn("w-2 h-2 rounded-full", dotStyles[status])} />
    {getSecretariaStatusLabel(status)}
  </span>
);
