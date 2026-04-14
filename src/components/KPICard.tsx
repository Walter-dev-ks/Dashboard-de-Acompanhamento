import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
}

const KPICard = ({ label, value, icon, color }: KPICardProps) => (
  <div className="bg-card rounded-xl border p-5 flex items-center gap-4 shadow-sm">
    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center shrink-0", color || "bg-primary/10 text-primary")}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  </div>
);

export default KPICard;
