export type ProjectStatus = "planejado" | "em_execucao" | "concluido" | "atrasado" | "paralisado";
export type SecretariaStatus = "em_dia" | "atencao" | "atrasada";

export interface Project {
  id: string;
  nome: string;
  descricao: string;
  status: ProjectStatus;
  prazo_previsto: string;
  responsavel: string;
  ultima_atualizacao: string;
  observacoes: string;
  secretaria_id: string;
}

export interface Secretaria {
  id: string;
  nome: string;
  sigla: string;
  responsavel: string;
  status_geral: SecretariaStatus;
  icone: string;
  projetos: Project[];
}

export const secretarias: Secretaria[] = [
  {
    id: "edu",
    nome: "Secretaria de Educação",
    sigla: "SEDUC",
    responsavel: "Maria Silva",
    status_geral: "em_dia",
    icone: "GraduationCap",
    projetos: [
      { id: "p1", nome: "Reforma Escola Municipal Centro", descricao: "Reforma estrutural da escola municipal do centro.", status: "em_execucao", prazo_previsto: "2026-07-30", responsavel: "João Souza", ultima_atualizacao: "2026-04-10", observacoes: "Obras em 60% de conclusão. Aguardando material elétrico.", secretaria_id: "edu" },
      { id: "p2", nome: "Programa de Alfabetização Digital", descricao: "Capacitação de professores para uso de tecnologia em sala.", status: "planejado", prazo_previsto: "2026-08-15", responsavel: "Ana Costa", ultima_atualizacao: "2026-04-05", observacoes: "Licitação de equipamentos em andamento.", secretaria_id: "edu" },
      { id: "p3", nome: "Merenda Escolar - Novo Contrato", descricao: "Renovação do contrato de fornecimento de merenda.", status: "concluido", prazo_previsto: "2026-03-01", responsavel: "Carlos Mendes", ultima_atualizacao: "2026-03-01", observacoes: "Contrato assinado com sucesso.", secretaria_id: "edu" },
    ],
  },
  {
    id: "sau",
    nome: "Secretaria de Saúde",
    sigla: "SESAU",
    responsavel: "Dr. Roberto Lima",
    status_geral: "atencao",
    icone: "Heart",
    projetos: [
      { id: "p4", nome: "Ampliação UBS Bairro Norte", descricao: "Ampliação da Unidade Básica de Saúde.", status: "atrasado", prazo_previsto: "2026-03-15", responsavel: "Fernanda Alves", ultima_atualizacao: "2026-04-08", observacoes: "Atraso na entrega de materiais pelo fornecedor.", secretaria_id: "sau" },
      { id: "p5", nome: "Campanha de Vacinação Inverno", descricao: "Campanha de vacinação contra gripe.", status: "em_execucao", prazo_previsto: "2026-06-30", responsavel: "Dr. Paulo Ribeiro", ultima_atualizacao: "2026-04-12", observacoes: "70% da população-alvo vacinada.", secretaria_id: "sau" },
      { id: "p6", nome: "Telemedicina Rural", descricao: "Implantação de sistema de telemedicina nas áreas rurais.", status: "planejado", prazo_previsto: "2026-09-01", responsavel: "Luciana Torres", ultima_atualizacao: "2026-04-01", observacoes: "Estudo de viabilidade em andamento.", secretaria_id: "sau" },
    ],
  },
  {
    id: "obr",
    nome: "Secretaria de Obras",
    sigla: "SEOBR",
    responsavel: "Eng. Pedro Santos",
    status_geral: "atrasada",
    icone: "Hammer",
    projetos: [
      { id: "p7", nome: "Pavimentação Rua das Flores", descricao: "Pavimentação asfáltica da Rua das Flores.", status: "atrasado", prazo_previsto: "2026-02-28", responsavel: "Marcos Oliveira", ultima_atualizacao: "2026-04-11", observacoes: "Chuvas intensas atrasaram obra em 45 dias.", secretaria_id: "obr" },
      { id: "p8", nome: "Ponte Rio Massaranduba", descricao: "Construção de ponte sobre o Rio Massaranduba.", status: "em_execucao", prazo_previsto: "2026-12-31", responsavel: "Ricardo Ferreira", ultima_atualizacao: "2026-04-09", observacoes: "Fundações concluídas. Início da superestrutura.", secretaria_id: "obr" },
      { id: "p9", nome: "Drenagem Centro", descricao: "Sistema de drenagem pluvial no centro.", status: "atrasado", prazo_previsto: "2026-04-01", responsavel: "Marcos Oliveira", ultima_atualizacao: "2026-04-07", observacoes: "Aguardando liberação de recurso estadual.", secretaria_id: "obr" },
    ],
  },
  {
    id: "fin",
    nome: "Secretaria de Finanças",
    sigla: "SEFIN",
    responsavel: "Dra. Claudia Ramos",
    status_geral: "em_dia",
    icone: "DollarSign",
    projetos: [
      { id: "p10", nome: "Modernização Sistema Tributário", descricao: "Implantação de novo sistema de arrecadação.", status: "em_execucao", prazo_previsto: "2026-06-30", responsavel: "Rafael Nunes", ultima_atualizacao: "2026-04-13", observacoes: "Fase de testes com equipe piloto.", secretaria_id: "fin" },
      { id: "p11", nome: "Relatório LOA 2027", descricao: "Elaboração da Lei Orçamentária Anual.", status: "planejado", prazo_previsto: "2026-09-30", responsavel: "Dra. Claudia Ramos", ultima_atualizacao: "2026-04-01", observacoes: "Coleta de demandas das secretarias iniciada.", secretaria_id: "fin" },
    ],
  },
  {
    id: "ass",
    nome: "Secretaria de Assistência Social",
    sigla: "SEMAS",
    responsavel: "Patrícia Moura",
    status_geral: "em_dia",
    icone: "Users",
    projetos: [
      { id: "p12", nome: "Cadastro Único - Atualização", descricao: "Mutirão de atualização cadastral.", status: "em_execucao", prazo_previsto: "2026-05-31", responsavel: "Simone Dias", ultima_atualizacao: "2026-04-12", observacoes: "45% das famílias atualizadas.", secretaria_id: "ass" },
      { id: "p13", nome: "CRAS Itinerante", descricao: "Atendimento social nas comunidades rurais.", status: "concluido", prazo_previsto: "2026-03-30", responsavel: "Patrícia Moura", ultima_atualizacao: "2026-03-28", observacoes: "Todas as 12 comunidades atendidas.", secretaria_id: "ass" },
    ],
  },
  {
    id: "mei",
    nome: "Secretaria de Meio Ambiente",
    sigla: "SEMMA",
    responsavel: "Eng. Lucas Brandt",
    status_geral: "atencao",
    icone: "TreePine",
    projetos: [
      { id: "p14", nome: "Reflorestamento Margem Rio", descricao: "Plantio de espécies nativas na margem do rio.", status: "em_execucao", prazo_previsto: "2026-08-15", responsavel: "Camila Rocha", ultima_atualizacao: "2026-04-10", observacoes: "3.000 de 10.000 mudas plantadas.", secretaria_id: "mei" },
      { id: "p15", nome: "Coleta Seletiva - Expansão", descricao: "Expansão da coleta seletiva para novos bairros.", status: "atrasado", prazo_previsto: "2026-03-31", responsavel: "Bruno Stein", ultima_atualizacao: "2026-04-06", observacoes: "Licitação de novos caminhões impugnada.", secretaria_id: "mei" },
    ],
  },
];

export const getStatusLabel = (status: ProjectStatus): string => {
  const labels: Record<ProjectStatus, string> = {
    planejado: "Planejado",
    em_execucao: "Em Execução",
    concluido: "Concluído",
    atrasado: "Atrasado",
    paralisado: "Paralisado",
  };
  return labels[status];
};

export const getSecretariaStatusLabel = (status: SecretariaStatus): string => {
  const labels: Record<SecretariaStatus, string> = {
    em_dia: "Em Dia",
    atencao: "Atenção",
    atrasada: "Atrasada",
  };
  return labels[status];
};
