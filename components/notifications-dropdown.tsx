"use client"

import { useState } from "react"
import { Bell, Check, CheckCheck, FileText, UserPlus, Star, Coins, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

type NotificationType = "solicitacao" | "mensagem" | "avaliacao" | "tokens" | "usuario"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: Date
  read: boolean
  link?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "solicitacao",
    title: "Nova solicitação recebida",
    message: "Carlos Silva enviou uma solicitação para o serviço de Design Gráfico",
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    read: false,
    link: "/solicitacoes",
  },
  {
    id: "2",
    type: "mensagem",
    title: "Nova mensagem",
    message: "Ana Beatriz respondeu sua proposta de trabalho",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    link: "/mensagens",
  },
  {
    id: "3",
    type: "avaliacao",
    title: "Nova avaliação recebida",
    message: "Você recebeu uma avaliação 5 estrelas de Pedro Santos",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    link: "/perfil",
  },
  {
    id: "4",
    type: "tokens",
    title: "Tokens creditados",
    message: "Você recebeu 150 tokens pelo serviço concluído",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
    link: "/tokens",
  },
  {
    id: "5",
    type: "solicitacao",
    title: "Solicitação aceita",
    message: "Marina Costa aceitou sua solicitação de Desenvolvimento Web",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
    link: "/solicitacoes",
  },
  {
    id: "6",
    type: "usuario",
    title: "Novo seguidor",
    message: "João Ferreira começou a seguir você",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    read: true,
    link: "/perfil",
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "solicitacao":
      return FileText
    case "mensagem":
      return MessageSquare
    case "avaliacao":
      return Star
    case "tokens":
      return Coins
    case "usuario":
      return UserPlus
    default:
      return Bell
  }
}

const getNotificationIconColor = (type: NotificationType) => {
  switch (type) {
    case "solicitacao":
      return "text-primary bg-primary/10"
    case "mensagem":
      return "text-secondary bg-secondary/10"
    case "avaliacao":
      return "text-warning bg-warning/10"
    case "tokens":
      return "text-success bg-success/10"
    case "usuario":
      return "text-accent bg-accent/10"
    default:
      return "text-muted-foreground bg-muted"
  }
}

const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Agora mesmo"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min atrás`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h atrás`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) {
    return "Ontem"
  }
  if (diffInDays < 7) {
    return `${diffInDays} dias atrás`
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  })
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0 sm:w-96"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Notificações</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                {unreadCount} {unreadCount === 1 ? "nova" : "novas"}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Marcar todas
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-3 rounded-full bg-muted p-3">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Nenhuma notificação
              </p>
              <p className="text-xs text-muted-foreground">
                Você está em dia com tudo!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                const iconColorClass = getNotificationIconColor(notification.type)

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "group relative flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                      !notification.read && "bg-accent/5"
                    )}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary" />
                    )}

                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        iconColorClass
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm leading-tight",
                            !notification.read
                              ? "font-semibold text-foreground"
                              : "font-medium text-foreground"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span className="sr-only">Marcar como lida</span>
                          </Button>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-muted-foreground/70">
                        {formatRelativeTime(notification.date)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>


      </DropdownMenuContent>
    </DropdownMenu>
  )
}
