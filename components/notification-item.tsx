import { cn } from "@/lib/utils"
import { Bell, CheckCircle2, AlertCircle, MessageCircle, Coins } from "lucide-react"

type NotificationType = "info" | "success" | "warning" | "message" | "tokens"

interface NotificationItemProps {
  title: string
  message: string
  time: string
  type?: NotificationType
  isRead?: boolean
  className?: string
  onClick?: () => void
}

const typeConfig: Record<
  NotificationType,
  { icon: typeof Bell; className: string }
> = {
  info: {
    icon: Bell,
    className: "bg-primary/15 text-primary",
  },
  success: {
    icon: CheckCircle2,
    className: "bg-success/15 text-success",
  },
  warning: {
    icon: AlertCircle,
    className: "bg-warning/15 text-warning-foreground",
  },
  message: {
    icon: MessageCircle,
    className: "bg-secondary/15 text-secondary",
  },
  tokens: {
    icon: Coins,
    className: "bg-warning/15 text-warning",
  },
}

export function NotificationItem({
  title,
  message,
  time,
  type = "info",
  isRead = false,
  className,
  onClick,
}: NotificationItemProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-secondary/30",
        !isRead && "bg-secondary/5 border-secondary/20",
        className
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          config.className
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              "text-sm font-semibold text-card-foreground",
              !isRead && "text-secondary"
            )}
          >
            {title}
          </h4>
          {!isRead && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>
        <span className="text-xs text-muted-foreground/70">{time}</span>
      </div>
    </div>
  )
}
