"use client"

import { useState } from "react"
import { 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Filter,
  Calendar,
  Star,
  Gift,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"

type TransactionType = "ganho" | "gasto"
type TransactionCategory = 
  | "servico_concluido" 
  | "solicitacao_enviada" 
  | "bonus_avaliacao" 
  | "bonus_cadastro"
  | "compra_tokens"
  | "indicacao"

interface Transaction {
  id: string
  type: TransactionType
  category: TransactionCategory
  description: string
  amount: number
  date: string
  relatedUser?: string
  relatedService?: string
}

// Função para formatar data de forma consistente
function formatDateString(dateStr: string): string {
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
  const [year, month, day] = dateStr.split("-")
  return `${day} de ${months[parseInt(month, 10) - 1]}. de ${year}`
}

// Dados mockados de transações
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "ganho",
    category: "servico_concluido",
    description: "Serviço de Design Gráfico concluído",
    amount: 150,
    date: "2026-04-09",
    relatedUser: "Carlos Silva",
    relatedService: "Design de Logo",
  },
  {
    id: "2",
    type: "gasto",
    category: "solicitacao_enviada",
    description: "Solicitação de serviço enviada",
    amount: 2,
    date: "2026-04-08",
    relatedUser: "Ana Beatriz",
    relatedService: "Desenvolvimento Web",
  },
  {
    id: "3",
    type: "ganho",
    category: "bonus_avaliacao",
    description: "Bônus por avaliação 5 estrelas",
    amount: 10,
    date: "2026-04-08",
    relatedUser: "Pedro Santos",
  },
  {
    id: "4",
    type: "gasto",
    category: "solicitacao_enviada",
    description: "Solicitação de serviço enviada",
    amount: 2,
    date: "2026-04-07",
    relatedUser: "Marina Costa",
    relatedService: "Fotografia",
  },
  {
    id: "5",
    type: "ganho",
    category: "servico_concluido",
    description: "Serviço de Consultoria concluído",
    amount: 200,
    date: "2026-04-06",
    relatedUser: "João Ferreira",
    relatedService: "Consultoria Financeira",
  },
  {
    id: "6",
    type: "ganho",
    category: "indicacao",
    description: "Bônus por indicação de usuário",
    amount: 50,
    date: "2026-04-05",
    relatedUser: "Fernanda Lima",
  },
  {
    id: "7",
    type: "gasto",
    category: "solicitacao_enviada",
    description: "Solicitação de serviço enviada",
    amount: 2,
    date: "2026-04-04",
    relatedUser: "Roberto Alves",
    relatedService: "Marketing Digital",
  },
  {
    id: "8",
    type: "ganho",
    category: "bonus_cadastro",
    description: "Bônus de boas-vindas",
    amount: 100,
    date: "2026-04-01",
  },
  {
    id: "9",
    type: "ganho",
    category: "compra_tokens",
    description: "Compra de pacote de tokens",
    amount: 500,
    date: "2026-03-28",
  },
  {
    id: "10",
    type: "ganho",
    category: "servico_concluido",
    description: "Serviço de Tradução concluído",
    amount: 80,
    date: "2026-03-25",
    relatedUser: "Lucia Mendes",
    relatedService: "Tradução EN-PT",
  },
]

const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "servico_concluido":
      return CheckCircle2
    case "solicitacao_enviada":
      return ArrowUpRight
    case "bonus_avaliacao":
      return Star
    case "bonus_cadastro":
      return Gift
    case "compra_tokens":
      return ShoppingBag
    case "indicacao":
      return Users
    default:
      return Coins
  }
}

const getCategoryLabel = (category: TransactionCategory): string => {
  switch (category) {
    case "servico_concluido":
      return "Serviço Concluído"
    case "solicitacao_enviada":
      return "Solicitação Enviada"
    case "bonus_avaliacao":
      return "Bônus Avaliação"
    case "bonus_cadastro":
      return "Bônus Cadastro"
    case "compra_tokens":
      return "Compra de Tokens"
    case "indicacao":
      return "Indicação"
    default:
      return "Transação"
  }
}

export default function TokensPage() {
  const [filter, setFilter] = useState<"todos" | "ganho" | "gasto">("todos")
  const [transactions] = useState<Transaction[]>(mockTransactions)

  // Cálculos de estatísticas
  const totalBalance = 1250
  const totalGanhos = transactions
    .filter((t) => t.type === "ganho")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalGastos = transactions
    .filter((t) => t.type === "gasto")
    .reduce((sum, t) => sum + t.amount, 0)
  const servicosConcluidos = transactions.filter(
    (t) => t.category === "servico_concluido"
  ).length

  // Filtrar transações
  const filteredTransactions = transactions.filter((t) => {
    if (filter === "todos") return true
    return t.type === filter
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/20 shadow-lg">
              <Coins className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meus Tokens</h1>
              <p className="text-muted-foreground">
                Gerencie seus tokens e acompanhe suas transações
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Saldo Atual */}
          <Card className="relative overflow-hidden border-2 border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8">
              <div className="h-full w-full rounded-full bg-warning/10" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-warning">
                <Coins className="h-4 w-4" />
                Saldo Atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {new Intl.NumberFormat("pt-BR").format(totalBalance)}
                </span>
                <span className="text-lg text-muted-foreground">tokens</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Disponível para usar
              </p>
              <Link href="/tokens/comprar">
                <Button className="mt-4 w-full gap-2" size="sm">
                  <Coins className="h-4 w-4" />
                  Comprar Tokens
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Total de Ganhos */}
          <Card className="border-success/30 bg-gradient-to-br from-success/5 to-transparent">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-success">
                <ArrowDownLeft className="h-4 w-4" />
                Total de Ganhos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-success">
                  +{new Intl.NumberFormat("pt-BR").format(totalGanhos)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>

          {/* Total de Gastos */}
          <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-destructive">
                <ArrowUpRight className="h-4 w-4" />
                Total de Gastos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-destructive">
                  -{new Intl.NumberFormat("pt-BR").format(totalGastos)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>

          {/* Serviços Concluídos */}
          <Card className="border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-secondary">
                <TrendingUp className="h-4 w-4" />
                Serviços Concluídos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {servicosConcluidos}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {/* Como Ganhar Tokens */}
          <Card className="border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Sparkles className="h-5 w-5" />
                Como Ganhar Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Conclua serviços</span>
                    <span className="ml-2 text-sm text-success">+50 a +500 tokens</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                    <Star className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Receba 5 estrelas</span>
                    <span className="ml-2 text-sm text-success">+10 tokens</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                    <Users className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Indique amigos</span>
                    <span className="ml-2 text-sm text-success">+50 tokens</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Custo de Serviços */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Clock className="h-5 w-5" />
                Custo de Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Solicitar serviço</span>
                    <span className="ml-2 text-sm text-destructive">-2 tokens</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 opacity-50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Destaque premium</span>
                    <span className="ml-2 text-sm text-muted-foreground">Em breve</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Histórico de Transações */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  Histórico de Transações
                </CardTitle>
                <CardDescription>
                  Todas as suas movimentações de tokens
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={filter}
                  onValueChange={(value) => setFilter(value as "todos" | "ganho" | "gasto")}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="ganho">Ganhos</SelectItem>
                    <SelectItem value="gasto">Gastos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Coins className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Nenhuma transação encontrada
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Não há transações com o filtro selecionado
                  </p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category)
                  const isGanho = transaction.type === "ganho"

                  return (
                    <div
                      key={transaction.id}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50",
                        isGanho ? "border-success/20" : "border-destructive/20"
                      )}
                    >
                      {/* Ícone */}
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                          isGanho ? "bg-success/10" : "bg-destructive/10"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6",
                            isGanho ? "text-success" : "text-destructive"
                          )}
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">
                            {transaction.description}
                          </p>
                          <Badge
                            variant="outline"
                            className={cn(
                              "shrink-0 text-xs",
                              isGanho
                                ? "border-success/30 text-success"
                                : "border-destructive/30 text-destructive"
                            )}
                          >
                            {getCategoryLabel(transaction.category)}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatDateString(transaction.date)}</span>
                          {transaction.relatedUser && (
                            <>
                              <span>•</span>
                              <span>{transaction.relatedUser}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Valor */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Coins
                          className={cn(
                            "h-5 w-5",
                            isGanho ? "text-success" : "text-destructive"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xl font-bold",
                            isGanho ? "text-success" : "text-destructive"
                          )}
                        >
                          {isGanho ? "+" : "-"}
                          {transaction.amount}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Botão Carregar Mais */}
            {filteredTransactions.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Carregar mais transações
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
