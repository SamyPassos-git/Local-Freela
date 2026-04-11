import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface SkillBadgeProps {
  name: string
  level?: 1 | 2 | 3 | 4 | 5
  verified?: boolean
  className?: string
}

export function SkillBadge({
  name,
  level = 3,
  verified = false,
  className,
}: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/50",
        verified && "border-secondary/30 bg-secondary/5",
        className
      )}
    >
      <span className="font-medium text-card-foreground">{name}</span>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              i < level
                ? "fill-warning text-warning"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {verified && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
          ✓
        </span>
      )}
    </div>
  )
}
