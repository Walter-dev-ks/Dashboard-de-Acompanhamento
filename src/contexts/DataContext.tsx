import React, { createContext, useContext, useState, useCallback } from "react";
import { secretarias as initialData, Secretaria, Project, ProjectStatus, SecretariaStatus } from "@/data/mockData";

interface DataContextType {
  secretarias: Secretaria[];
  addSecretaria: (sec: Omit<Secretaria, "id" | "projetos">) => void;
  updateSecretaria: (id: string, data: Partial<Omit<Secretaria, "id" | "projetos">>) => void;
  deleteSecretaria: (id: string) => void;
  addProject: (secretariaId: string, project: Omit<Project, "id" | "secretaria_id">) => void;
  updateProject: (secretariaId: string, projectId: string, data: Partial<Omit<Project, "id" | "secretaria_id">>) => void;
  deleteProject: (secretariaId: string, projectId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

let nextId = 100;

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [secretarias, setSecretarias] = useState<Secretaria[]>(initialData);

  const addSecretaria = useCallback((sec: Omit<Secretaria, "id" | "projetos">) => {
    setSecretarias((prev) => [
      ...prev,
      { ...sec, id: `sec_${nextId++}`, projetos: [] },
    ]);
  }, []);

  const updateSecretaria = useCallback((id: string, data: Partial<Omit<Secretaria, "id" | "projetos">>) => {
    setSecretarias((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  }, []);

  const deleteSecretaria = useCallback((id: string) => {
    setSecretarias((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addProject = useCallback((secretariaId: string, project: Omit<Project, "id" | "secretaria_id">) => {
    setSecretarias((prev) =>
      prev.map((s) =>
        s.id === secretariaId
          ? { ...s, projetos: [...s.projetos, { ...project, id: `p_${nextId++}`, secretaria_id: secretariaId }] }
          : s
      )
    );
  }, []);

  const updateProject = useCallback((secretariaId: string, projectId: string, data: Partial<Omit<Project, "id" | "secretaria_id">>) => {
    setSecretarias((prev) =>
      prev.map((s) =>
        s.id === secretariaId
          ? { ...s, projetos: s.projetos.map((p) => (p.id === projectId ? { ...p, ...data } : p)) }
          : s
      )
    );
  }, []);

  const deleteProject = useCallback((secretariaId: string, projectId: string) => {
    setSecretarias((prev) =>
      prev.map((s) =>
        s.id === secretariaId
          ? { ...s, projetos: s.projetos.filter((p) => p.id !== projectId) }
          : s
      )
    );
  }, []);

  return (
    <DataContext.Provider value={{ secretarias, addSecretaria, updateSecretaria, deleteSecretaria, addProject, updateProject, deleteProject }}>
      {children}
    </DataContext.Provider>
  );
};
