import { cn } from "@/lib/utils"
import { StatusBadge, type StatusType } from "@/components/status-badge"
import { MapPin, Coins, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FreelaCardProps {
  title: string
  description: string
  location: string
  tokens: number
  status: StatusType
  deadline?: string
  author?: string
  skills?: string[]
  className?: string
  onAction?: () => void
  actionLabel?: string
}

export function FreelaCard({
  title,
  description,
  location,
  tokens,
  status,
  deadline,
  author,
  skills = [],
  className,
  onAction,
  actionLabel = "Ver Detalhes",
}: FreelaCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1",
        className
      )}
    >
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <StatusBadge status={status} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          {deadline && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
          )}
          {author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-warning" />
            <span className="text-lg font-bold text-card-foreground">
              {tokens.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">tokens</span>
          </div>
          <Button
            onClick={onAction}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg transition-all duration-200"
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
