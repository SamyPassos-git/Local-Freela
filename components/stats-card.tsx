import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <span className="text-3xl font-bold text-card-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
          {trend && (
            <span
              className={cn(
                "mt-1 flex items-center gap-1 text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
              <span className="text-muted-foreground">vs mês anterior</span>
            </span>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
