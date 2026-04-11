import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, Loader2 } from "lucide-react"

export type StatusType = "ativo" | "pendente" | "concluido"

interface StatusBadgeProps {
  status: StatusType
  className?: string
  showIcon?: boolean
}

const statusConfig: Record<
  StatusType,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  ativo: {
    label: "Ativo",
    icon: Loader2,
    className: "bg-success/15 text-success border-success/30",
  },
  pendente: {
    label: "Pendente",
    icon: Clock,
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  concluido: {
    label: "Concluído",
    icon: CheckCircle2,
    className: "bg-secondary/15 text-secondary border-secondary/30",
  },
}

export function StatusBadge({
  status,
  className,
  showIcon = true,
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200",
        config.className,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            status === "ativo" && "animate-spin"
          )}
        />
      )}
      {config.label}
    </span>
  )
}
