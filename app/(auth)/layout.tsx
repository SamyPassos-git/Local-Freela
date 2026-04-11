import { Zap } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header simples */}
      <header className="flex items-center justify-center py-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Local Freela
          </span>
        </Link>
      </header>

      {/* Conteúdo centralizado */}
      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        {children}
      </main>

      {/* Footer simples */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2026 Local Freela. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
