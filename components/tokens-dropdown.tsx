"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Star,
  Gift,
  ShoppingBag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TokenTransaction {
  id: string
  type: "ganho" | "gasto"
  description: string
  amount: number
  icon: typeof Coins
}

const recentTransactions: TokenTransaction[] = [
  {
    id: "1",
    type: "ganho",
    description: "Serviço de Design concluído",
    amount: 150,
    icon: CheckCircle2,
  },
  {
    id: "2",
    type: "gasto",
    description: "Solicitação enviada",
    amount: 2,
    icon: ArrowUpRight,
  },
  {
    id: "3",
    type: "ganho",
    description: "Bônus avaliação 5 estrelas",
    amount: 10,
    icon: Star,
  },
]

interface TokensDropdownProps {
  balance?: number
}

export function TokensDropdown({ balance = 1250 }: TokensDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Calcular ganhos e gastos recentes
  const totalGanhos = 1090
  const totalGastos = 6

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl bg-secondary/90 px-3 py-2 shadow-md hover:bg-secondary sm:px-4"
        >
          <Coins className="h-4 w-4 text-warning sm:h-5 sm:w-5" />
          <span className="font-bold text-secondary-foreground text-sm sm:text-base">
            {new Intl.NumberFormat("pt-BR").format(balance)}
          </span>
          <span className="hidden text-xs text-secondary-foreground/70 lg:inline">
            tokens
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0"
        sideOffset={8}
      >
        {/* Header com saldo */}
        <div className="bg-gradient-to-br from-warning/20 to-warning/5 px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/20 shadow-lg">
              <Coins className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Saldo disponível</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  {new Intl.NumberFormat("pt-BR").format(balance)}
                </span>
                <span className="text-sm text-muted-foreground">tokens</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats resumidos */}
        <div className="grid grid-cols-2 gap-2 p-3 border-b border-border">
          <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
            <ArrowDownLeft className="h-4 w-4 text-success" />
            <div>
              <p className="text-[10px] text-success">Ganhos</p>
              <p className="text-sm font-bold text-success">+{totalGanhos}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2">
            <ArrowUpRight className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-[10px] text-destructive">Gastos</p>
              <p className="text-sm font-bold text-destructive">-{totalGastos}</p>
            </div>
          </div>
        </div>

        {/* Transações recentes */}
        <div className="p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Transações recentes
          </p>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => {
              const isGanho = transaction.type === "ganho"
              const Icon = transaction.icon

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      isGanho ? "bg-success/10" : "bg-destructive/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isGanho ? "text-success" : "text-destructive"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins
                      className={cn(
                        "h-3.5 w-3.5",
                        isGanho ? "text-success" : "text-destructive"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isGanho ? "text-success" : "text-destructive"
                      )}
                    >
                      {isGanho ? "+" : "-"}{transaction.amount}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info de custo */}
        <div className="mx-3 mb-3 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Gift className="h-4 w-4 text-secondary" />
            <span>
              Solicitar um serviço custa apenas <span className="font-bold text-destructive">2 tokens</span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-2 space-y-1">
          <Button
            variant="default"
            className="w-full justify-center gap-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link href="/tokens/comprar">
              <ShoppingBag className="h-4 w-4" />
              Comprar Tokens
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-between text-sm font-medium text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link href="/tokens">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Ver histórico completo
              </span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
