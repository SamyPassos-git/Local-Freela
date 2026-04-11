"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { 
  Inbox,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  MessageSquare,
  Calendar,
  Coins,
  Filter,
  ChevronDown,
  Check,
  X,
  Flag
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Tipos de status para solicitações
type RequestStatus = "pendente" | "aceita" | "rejeitada" | "concluida"

// Configuração de status com cores e ícones
const statusConfig: Record<RequestStatus, { 
  label: string
  icon: typeof Clock
  bgClass: string
  textClass: string
  borderClass: string
}> = {
  pendente: {
    label: "Pendente",
    icon: Clock,
    bgClass: "bg-warning/15",
    textClass: "text-warning-foreground",
    borderClass: "border-warning/30",
  },
  aceita: {
    label: "Aceita",
    icon: CheckCircle2,
    bgClass: "bg-success/15",
    textClass: "text-success",
    borderClass: "border-success/30",
  },
  rejeitada: {
    label: "Rejeitada",
    icon: XCircle,
    bgClass: "bg-destructive/15",
    textClass: "text-destructive",
    borderClass: "border-destructive/30",
  },
  concluida: {
    label: "Concluída",
    icon: Flag,
    bgClass: "bg-secondary/15",
    textClass: "text-secondary",
    borderClass: "border-secondary/30",
  },
}

// Mock de solicitações recebidas
const mockReceivedRequests = [
  {
    id: 1,
    service: "Desenvolvimento de Website",
    message: "Olá! Preciso de um site para minha loja de roupas. Gostaria de algo moderno e responsivo, com integração para pagamentos online.",
    requester: {
      name: "Maria Santos",
      avatar: "MS",
      rating: 4.8,
      completedJobs: 15,
    },
    tokens: 500,
    status: "pendente" as RequestStatus,
    date: "2024-01-15",
    deadline: "30 dias",
  },
  {
    id: 2,
    service: "App Mobile React Native",
    message: "Estou interessado em desenvolver um aplicativo para delivery de comida. Preciso de funcionalidades básicas como cardápio, carrinho e rastreamento.",
    requester: {
      name: "João Ferreira",
      avatar: "JF",
      rating: 4.5,
      completedJobs: 8,
    },
    tokens: 1200,
    status: "aceita" as RequestStatus,
    date: "2024-01-14",
    deadline: "45 dias",
  },
  {
    id: 3,
    service: "Desenvolvimento de Website",
    message: "Preciso de ajuda com um projeto urgente de landing page para campanha de marketing. Prazo curto mas pago bem!",
    requester: {
      name: "Ana Costa",
      avatar: "AC",
      rating: 5.0,
      completedJobs: 32,
    },
    tokens: 300,
    status: "concluida" as RequestStatus,
    date: "2024-01-10",
    deadline: "7 dias",
  },
  {
    id: 4,
    service: "App Mobile React Native",
    message: "Quero um app simples de lista de tarefas com sincronização na nuvem.",
    requester: {
      name: "Pedro Lima",
      avatar: "PL",
      rating: 3.9,
      completedJobs: 3,
    },
    tokens: 400,
    status: "rejeitada" as RequestStatus,
    date: "2024-01-12",
    deadline: "15 dias",
  },
]

// Mock de solicitações enviadas
const mockSentRequests = [
  {
    id: 5,
    service: "Design de Logotipo",
    message: "Olá! Estou iniciando uma startup de tecnologia e preciso de uma identidade visual moderna e minimalista. O nome da empresa é TechFlow.",
    provider: {
      name: "Ana Costa",
      avatar: "AC",
      rating: 4.8,
      completedJobs: 89,
    },
    tokens: 250,
    status: "pendente" as RequestStatus,
    date: "2024-01-16",
    deadline: "14 dias",
  },
  {
    id: 6,
    service: "Gestão de Redes Sociais",
    message: "Preciso de ajuda para gerenciar as redes sociais da minha empresa por 3 meses. Foco em Instagram e LinkedIn.",
    provider: {
      name: "Pedro Lima",
      avatar: "PL",
      rating: 4.9,
      completedJobs: 203,
    },
    tokens: 800,
    status: "aceita" as RequestStatus,
    date: "2024-01-13",
    deadline: "90 dias",
  },
  {
    id: 7,
    service: "Redação de Conteúdo SEO",
    message: "Gostaria de 10 artigos otimizados para SEO sobre tecnologia e inovação para meu blog corporativo.",
    provider: {
      name: "Maria Santos",
      avatar: "MS",
      rating: 4.7,
      completedJobs: 56,
    },
    tokens: 450,
    status: "concluida" as RequestStatus,
    date: "2024-01-05",
    deadline: "21 dias",
  },
  {
    id: 8,
    service: "Aulas Particulares de Matemática",
    message: "Preciso de aulas de cálculo para preparação de concurso.",
    provider: {
      name: "Lucia Mendes",
      avatar: "LM",
      rating: 5.0,
      completedJobs: 178,
    },
    tokens: 160,
    status: "rejeitada" as RequestStatus,
    date: "2024-01-08",
    deadline: "30 dias",
  },
]

// Função para formatar data de forma consistente (evita hydration mismatch)
function formatDateString(dateStr: string): string {
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
  const [year, month, day] = dateStr.split("-")
  return `${day} de ${months[parseInt(month, 10) - 1]}. de ${year}`
}

// Filtros disponíveis
const statusFilters: { value: RequestStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "pendente", label: "Pendentes" },
  { value: "aceita", label: "Aceitas" },
  { value: "rejeitada", label: "Rejeitadas" },
  { value: "concluida", label: "Concluídas" },
]

export default function SolicitacoesPage() {
  const [activeTab, setActiveTab] = useState<"recebidas" | "enviadas">("recebidas")
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "todos">("todos")
  const [receivedRequests, setReceivedRequests] = useState(mockReceivedRequests)
  const [sentRequests, setSentRequests] = useState(mockSentRequests)

  // Filtrar solicitações
  const filteredReceivedRequests = useMemo(() => {
    if (statusFilter === "todos") return receivedRequests
    return receivedRequests.filter(r => r.status === statusFilter)
  }, [receivedRequests, statusFilter])

  const filteredSentRequests = useMemo(() => {
    if (statusFilter === "todos") return sentRequests
    return sentRequests.filter(r => r.status === statusFilter)
  }, [sentRequests, statusFilter])

  // Contadores por status
  const receivedCounts = useMemo(() => ({
    total: receivedRequests.length,
    pendente: receivedRequests.filter(r => r.status === "pendente").length,
    aceita: receivedRequests.filter(r => r.status === "aceita").length,
    rejeitada: receivedRequests.filter(r => r.status === "rejeitada").length,
    concluida: receivedRequests.filter(r => r.status === "concluida").length,
  }), [receivedRequests])

  const sentCounts = useMemo(() => ({
    total: sentRequests.length,
    pendente: sentRequests.filter(r => r.status === "pendente").length,
    aceita: sentRequests.filter(r => r.status === "aceita").length,
    rejeitada: sentRequests.filter(r => r.status === "rejeitada").length,
    concluida: sentRequests.filter(r => r.status === "concluida").length,
  }), [sentRequests])

  const currentCounts = activeTab === "recebidas" ? receivedCounts : sentCounts

  // Handlers de ações
  const handleAccept = (id: number) => {
    setReceivedRequests(prev => 
      prev.map(r => r.id === id ? { ...r, status: "aceita" as RequestStatus } : r)
    )
  }

  const handleReject = (id: number) => {
    setReceivedRequests(prev => 
      prev.map(r => r.id === id ? { ...r, status: "rejeitada" as RequestStatus } : r)
    )
  }

  const handleComplete = (id: number) => {
    if (activeTab === "recebidas") {
      setReceivedRequests(prev => 
        prev.map(r => r.id === id ? { ...r, status: "concluida" as RequestStatus } : r)
      )
    } else {
      setSentRequests(prev => 
        prev.map(r => r.id === id ? { ...r, status: "concluida" as RequestStatus } : r)
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary-foreground sm:text-3xl text-balance">
            Minhas Solicitações
          </h1>
          <p className="mt-2 text-primary-foreground/80 text-pretty">
            Gerencie todas as solicitações de serviços recebidas e enviadas
          </p>
        </div>
      </section>

      {/* Tabs e Filtros */}
      <section className="border-b border-border bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab("recebidas")
                  setStatusFilter("todos")
                }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeTab === "recebidas"
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <Inbox className="h-4 w-4" />
                Recebidas
                <span className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs",
                  activeTab === "recebidas" 
                    ? "bg-secondary-foreground/20 text-secondary-foreground" 
                    : "bg-foreground/10 text-muted-foreground"
                )}>
                  {receivedCounts.total}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("enviadas")
                  setStatusFilter("todos")
                }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeTab === "enviadas"
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <Send className="h-4 w-4" />
                Enviadas
                <span className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs",
                  activeTab === "enviadas" 
                    ? "bg-secondary-foreground/20 text-secondary-foreground" 
                    : "bg-foreground/10 text-muted-foreground"
                )}>
                  {sentCounts.total}
                </span>
              </button>
            </div>

            {/* Filtro de Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilters.find(f => f.value === statusFilter)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {statusFilters.map((filter) => (
                  <DropdownMenuItem
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={cn(
                      "cursor-pointer",
                      statusFilter === filter.value && "bg-muted"
                    )}
                  >
                    <span className="flex-1">{filter.label}</span>
                    {filter.value !== "todos" && (
                      <span className="text-xs text-muted-foreground">
                        {currentCounts[filter.value as RequestStatus]}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Status Summary Cards */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["pendente", "aceita", "rejeitada", "concluida"] as RequestStatus[]).map((status) => {
            const config = statusConfig[status]
            const count = currentCounts[status]
            const Icon = config.icon
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? "todos" : status)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 transition-all duration-200",
                  statusFilter === status
                    ? `${config.bgClass} ${config.borderClass} shadow-sm`
                    : "border-border bg-card hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  config.bgClass
                )}>
                  <Icon className={cn("h-5 w-5", config.textClass)} />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-card-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Lista de Solicitações */}
      <section className="container mx-auto px-4 pb-8">
        <div className="space-y-4">
          {activeTab === "recebidas" ? (
            filteredReceivedRequests.length === 0 ? (
              <EmptyState type="recebidas" filter={statusFilter} />
            ) : (
              filteredReceivedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="recebidas"
                  onAccept={() => handleAccept(request.id)}
                  onReject={() => handleReject(request.id)}
                  onComplete={() => handleComplete(request.id)}
                />
              ))
            )
          ) : (
            filteredSentRequests.length === 0 ? (
              <EmptyState type="enviadas" filter={statusFilter} />
            ) : (
              filteredSentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="enviadas"
                  onComplete={() => handleComplete(request.id)}
                />
              ))
            )
          )}
        </div>
      </section>
    </div>
  )
}

// Componente de Estado Vazio
function EmptyState({ 
  type, 
  filter 
}: { 
  type: "recebidas" | "enviadas"
  filter: RequestStatus | "todos" 
}) {
  const Icon = type === "recebidas" ? Inbox : Send
  const filterLabel = filter === "todos" 
    ? "" 
    : ` com status "${statusConfig[filter].label.toLowerCase()}"`

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16">
      <Icon className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <p className="text-lg font-medium text-foreground">
        Nenhuma solicitação {type === "recebidas" ? "recebida" : "enviada"}
      </p>
      <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
        {type === "recebidas" 
          ? `Você ainda não recebeu solicitações${filterLabel}.`
          : `Você ainda não enviou solicitações${filterLabel}.`
        }
      </p>
    </div>
  )
}

// Componente de Card de Solicitação
interface RequestCardProps {
  request: {
    id: number
    service: string
    message: string
    requester?: {
      name: string
      avatar: string
      rating: number
      completedJobs: number
    }
    provider?: {
      name: string
      avatar: string
      rating: number
      completedJobs: number
    }
    tokens: number
    status: RequestStatus
    date: string
    deadline: string
  }
  type: "recebidas" | "enviadas"
  onAccept?: () => void
  onReject?: () => void
  onComplete?: () => void
}

function RequestCard({ request, type, onAccept, onReject, onComplete }: RequestCardProps) {
  const config = statusConfig[request.status]
  const StatusIcon = config.icon
  const user = type === "recebidas" ? request.requester : request.provider

  const formattedDate = formatDateString(request.date)

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
      config.borderClass
    )}>
      {/* Status Bar */}
      <div className={cn("h-1", config.bgClass)} />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* User Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-sm font-semibold text-secondary">
              {user?.avatar}
            </div>

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-semibold text-card-foreground">
                  {user?.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <span className="text-xs text-muted-foreground">
                    {user?.rating} ({user?.completedJobs} serviços)
                  </span>
                </div>
              </div>

              {/* Service Title */}
              <p className="text-sm font-medium text-secondary mb-2">
                {request.service}
              </p>

              {/* Message */}
              <div className="flex items-start gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {request.message}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Prazo: {request.deadline}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-warning" />
                  <span className="font-semibold text-card-foreground">
                    {request.tokens} tokens
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            {/* Status Badge */}
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
              config.bgClass,
              config.textClass,
              config.borderClass
            )}>
              <StatusIcon className="h-3.5 w-3.5" />
              {config.label}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {type === "recebidas" && request.status === "pendente" && (
                <>
                  <Button
                    size="sm"
                    onClick={onAccept}
                    className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <Check className="h-4 w-4" />
                    Aceitar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onReject}
                    className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                    Rejeitar
                  </Button>
                </>
              )}

              {request.status === "aceita" && (
                <Button
                  size="sm"
                  onClick={onComplete}
                  className="gap-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Flag className="h-4 w-4" />
                  Marcar como Concluída
                </Button>
              )}

              {request.status === "concluida" && (
                <span className="text-xs text-success flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Serviço finalizado
                </span>
              )}

              {request.status === "rejeitada" && (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <XCircle className="h-4 w-4" />
                  Solicitação recusada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
