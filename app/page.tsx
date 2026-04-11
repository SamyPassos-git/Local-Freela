"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { 
  Search,
  Coins,
  Trophy,
  Star,
  TrendingUp,
  Sparkles,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Wrench,
  BookOpen,
  X,
  MapPin,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

// Categorias de serviços
const categories = [
  { id: "todos", label: "Todos", icon: Sparkles },
  { id: "desenvolvimento", label: "Desenvolvimento", icon: Code },
  { id: "design", label: "Design", icon: Palette },
  { id: "redacao", label: "Redação", icon: PenTool },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "manutencao", label: "Manutenção", icon: Wrench },
  { id: "educacao", label: "Educação", icon: BookOpen },
]

// Mock de serviços/habilidades disponíveis
const mockServices = [
  {
    id: 1,
    title: "Desenvolvimento de Website",
    description: "Criação de sites modernos e responsivos com as melhores tecnologias do mercado.",
    category: "desenvolvimento",
    price: 500,
    location: "São Paulo, SP",
    rating: 4.9,
    reviews: 127,
    provider: "Carlos Silva",
    status: "ativo" as const,
  },
  {
    id: 2,
    title: "Design de Logotipo",
    description: "Identidade visual única e profissional para sua marca ou empresa.",
    category: "design",
    price: 250,
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    reviews: 89,
    provider: "Ana Costa",
    status: "ativo" as const,
  },
  {
    id: 3,
    title: "Redação de Conteúdo SEO",
    description: "Textos otimizados para buscadores que aumentam seu tráfego orgânico.",
    category: "redacao",
    price: 150,
    location: "Remoto",
    rating: 4.7,
    reviews: 56,
    provider: "Maria Santos",
    status: "ativo" as const,
  },
  {
    id: 4,
    title: "Gestão de Redes Sociais",
    description: "Estratégias completas para engajamento e crescimento nas redes sociais.",
    category: "marketing",
    price: 800,
    location: "Curitiba, PR",
    rating: 4.9,
    reviews: 203,
    provider: "Pedro Lima",
    status: "ativo" as const,
  },
  {
    id: 5,
    title: "Manutenção Elétrica Residencial",
    description: "Serviços elétricos com segurança e garantia para sua casa.",
    category: "manutencao",
    price: 120,
    location: "Belo Horizonte, MG",
    rating: 4.6,
    reviews: 42,
    provider: "João Ferreira",
    status: "pendente" as const,
  },
  {
    id: 6,
    title: "Aulas Particulares de Matemática",
    description: "Ensino personalizado para todos os níveis, do fundamental ao superior.",
    category: "educacao",
    price: 80,
    location: "Online",
    rating: 5.0,
    reviews: 178,
    provider: "Lucia Mendes",
    status: "ativo" as const,
  },
  {
    id: 7,
    title: "App Mobile React Native",
    description: "Desenvolvimento de aplicativos iOS e Android com uma única base de código.",
    category: "desenvolvimento",
    price: 1200,
    location: "Florianópolis, SC",
    rating: 4.8,
    reviews: 67,
    provider: "Rafael Tech",
    status: "ativo" as const,
  },
  {
    id: 8,
    title: "UI/UX Design Completo",
    description: "Design de interfaces intuitivas e experiências que encantam usuários.",
    category: "design",
    price: 600,
    location: "Porto Alegre, RS",
    rating: 4.9,
    reviews: 94,
    provider: "Fernanda Arte",
    status: "ativo" as const,
  },
  {
    id: 9,
    title: "Pintura Residencial",
    description: "Serviços de pintura interna e externa com acabamento profissional.",
    category: "manutencao",
    price: 200,
    location: "Campinas, SP",
    rating: 4.5,
    reviews: 31,
    provider: "Marcos Pintor",
    status: "concluido" as const,
  },
]

// Mock do ranking semanal
const weeklyRanking = [
  { position: 1, name: "Carlos Silva", points: 2850, avatar: "CS", trend: "up" },
  { position: 2, name: "Ana Costa", points: 2420, avatar: "AC", trend: "up" },
  { position: 3, name: "Pedro Lima", points: 2180, avatar: "PL", trend: "down" },
  { position: 4, name: "Maria Santos", points: 1950, avatar: "MS", trend: "up" },
  { position: 5, name: "João Ferreira", points: 1720, avatar: "JF", trend: "same" },
]

// Mock de destaques
const highlights = [
  { 
    id: 1, 
    title: "Promoção de Primavera", 
    description: "20% de desconto em tokens até domingo!",
    type: "promo" 
  },
  { 
    id: 2, 
    title: "Novo Prestador Verificado", 
    description: "Rafael Tech agora é verificado na plataforma.",
    type: "badge" 
  },
  { 
    id: 3, 
    title: "Meta Semanal", 
    description: "Complete 3 serviços e ganhe 100 tokens bônus!",
    type: "challenge" 
  },
]

// Saldo de tokens do usuário
const userTokens = 1250

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isSearching, setIsSearching] = useState(false)

  // Filtrar serviços baseado na busca e categoria
  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = 
        selectedCategory === "todos" || service.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Simular busca com delay
  const handleSearch = (value: string) => {
    setIsSearching(true)
    setSearchQuery(value)
    setTimeout(() => setIsSearching(false), 300)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section com Saldo de Tokens */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-8 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl text-balance">
                Encontre o serviço ideal para você
              </h1>
              <p className="mt-2 text-primary-foreground/80 max-w-xl text-pretty">
                Conectamos prestadores de serviço qualificados com clientes que precisam de soluções. Explore habilidades, solicite serviços e transforme projetos em realidade.
              </p>
            </div>
            
            {/* Saldo de Tokens Destacado */}
            <div className="flex items-center gap-4 rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-4 sm:p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-warning/20">
                <Coins className="h-8 w-8 text-warning" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">Seu saldo</p>
                <p className="text-3xl font-bold text-primary-foreground">
                  {new Intl.NumberFormat("pt-BR").format(userTokens)}
                </p>
                <p className="text-xs text-primary-foreground/60">tokens disponíveis</p>
              </div>
            </div>
          </div>

          {/* Barra de Busca */}
          <div className="mt-8 relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar por habilidade, serviço ou profissional..."
                className="w-full rounded-2xl border-0 bg-card py-4 pl-12 pr-12 text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filtros por Categoria */}
      <section className="border-b border-border bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isSelected
                      ? "bg-secondary text-secondary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Ranking e Destaques */}
          <aside className="order-2 lg:order-1 lg:col-span-1 space-y-6">
            {/* Ranking Semanal */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-warning" />
                <h2 className="font-semibold text-card-foreground">Top da Semana</h2>
              </div>
              <div className="space-y-3">
                {weeklyRanking.map((user) => (
                  <div
                    key={user.position}
                    className={cn(
                      "flex items-center gap-3 rounded-xl p-3 transition-colors",
                      user.position <= 3 ? "bg-muted/50" : "hover:bg-muted/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                        user.position === 1 && "bg-warning text-warning-foreground",
                        user.position === 2 && "bg-muted-foreground/30 text-foreground",
                        user.position === 3 && "bg-warning/40 text-warning-foreground",
                        user.position > 3 && "bg-muted text-muted-foreground"
                      )}
                    >
                      {user.position}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Intl.NumberFormat("pt-BR").format(user.points)} pts
                      </p>
                    </div>
                    {user.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Destaques */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-secondary" />
                <h2 className="font-semibold text-card-foreground">Destaques</h2>
              </div>
              <div className="space-y-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className={cn(
                      "rounded-xl p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                      highlight.type === "promo" && "bg-success/10 border border-success/20",
                      highlight.type === "badge" && "bg-secondary/10 border border-secondary/20",
                      highlight.type === "challenge" && "bg-warning/10 border border-warning/20"
                    )}
                  >
                    <p className="text-sm font-medium text-card-foreground">
                      {highlight.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de Serviços */}
          <main className="order-1 lg:order-2 lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedCategory === "todos" 
                    ? "Todos os Serviços" 
                    : categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredServices.length} serviço{filteredServices.length !== 1 && "s"} encontrado{filteredServices.length !== 1 && "s"}
                </p>
              </div>
            </div>

            {filteredServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-foreground">Nenhum serviço encontrado</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tente ajustar sua busca ou filtros
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("todos")
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Componente de Card de Serviço
interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    category: string
    price: number
    location: string
    rating: number
    reviews: number
    provider: string
    status: "ativo" | "pendente" | "concluido"
  }
}

function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300",
        isHovered && "shadow-lg shadow-secondary/10 -translate-y-1 border-secondary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Top Bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <StatusBadge status={service.status} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Provider & Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-xs font-medium text-secondary">
            {service.provider.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground truncate">
              {service.provider}
            </p>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="text-xs text-muted-foreground">
                {service.rating} ({service.reviews})
              </span>
            </div>
          </div>
        </div>

        {/* Location & Category */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span className="capitalize">{service.category}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Coins className="h-5 w-5 text-warning" />
            <span className="text-lg font-bold text-card-foreground">
              {service.price}
            </span>
            <span className="text-xs text-muted-foreground">tokens</span>
          </div>
          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg transition-all duration-200"
          >
            Solicitar
          </Button>
        </div>
      </div>
    </div>
  )
}
