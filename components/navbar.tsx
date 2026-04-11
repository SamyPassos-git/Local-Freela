"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, Zap, FileText, Menu, X, LogIn, UserPlus, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { TokensDropdown } from "@/components/tokens-dropdown"

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/habilidades", label: "Habilidades", icon: Zap },
  { href: "/solicitacoes", label: "Solicitações", icon: FileText },
  { href: "/tokens", label: "Tokens", icon: Coins },
]

interface NavbarProps {
  tokenBalance?: number
  isLoggedIn?: boolean
}

export function Navbar({ tokenBalance = 1250, isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-primary shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary shadow-md">
            <Zap className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">
            Local Freela
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Notifications, Token Balance & Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Token Balance Dropdown */}
          <TokensDropdown balance={tokenBalance} />

          {/* Notifications Dropdown */}
          <NotificationsDropdown />

          {/* Auth Buttons - mostrado quando não logado */}
          {!isLoggedIn && (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:flex"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10 sm:hidden"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button
                  size="sm"
                  className="hidden bg-accent text-accent-foreground shadow-md hover:bg-accent/90 sm:flex"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Cadastrar
                </Button>
                <Button
                  size="icon"
                  className="bg-accent text-accent-foreground shadow-md hover:bg-accent/90 sm:hidden"
                >
                  <UserPlus className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-primary-foreground/10 bg-primary px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-secondary text-secondary-foreground shadow-md"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}

            {/* Auth Buttons Mobile */}
            {!isLoggedIn && (
              <div className="mt-4 flex flex-col gap-2 border-t border-primary-foreground/10 pt-4">
                <p className="px-4 text-xs text-primary-foreground/60">
                  Cadastre-se para acessar todas as funcionalidades
                </p>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-primary-foreground/80 transition-all duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <LogIn className="h-5 w-5" />
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground shadow-md transition-all duration-200 hover:bg-accent/90"
                >
                  <UserPlus className="h-5 w-5" />
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
