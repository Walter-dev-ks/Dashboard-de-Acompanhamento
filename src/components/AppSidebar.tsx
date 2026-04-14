import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, GraduationCap, Heart, Hammer, DollarSign, Users, TreePine, Settings } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Heart, Hammer, DollarSign, Users, TreePine,
};

const AppSidebar = () => {
  const location = useLocation();
  const { secretarias } = useData();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-primary">Painel de Gestão</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-0.5">Prefeitura de Massaranduba/SC</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            location.pathname === "/"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard Principal
        </Link>

        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold">Secretarias</span>
        </div>

        {secretarias.map((sec) => {
          const Icon = iconMap[sec.icone] || LayoutDashboard;
          const isActive = location.pathname === `/secretaria/${sec.id}`;
          return (
            <Link
              key={sec.id}
              to={`/secretaria/${sec.id}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{sec.sigla}</span>
            </Link>
          );
        })}

        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold">Administração</span>
        </div>

        <Link
          to="/gerenciar"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            location.pathname === "/gerenciar"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          Gerenciar
        </Link>
      </nav>

      <div className="px-5 py-4 border-t border-sidebar-border text-[11px] text-sidebar-foreground/40">
        © 2026 Massaranduba/SC
      </div>
    </aside>
  );
};

export default AppSidebar;
