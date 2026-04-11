"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import { SkillBadge } from "@/components/skill-badge"
import {
  Star,
  Coins,
  Edit,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Award,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock user data
const userData = {
  id: "1",
  name: "Carlos Silva",
  bio: "Desenvolvedor Full Stack com mais de 5 anos de experiencia. Especializado em React, Node.js e TypeScript. Apaixonado por criar solucoes inovadoras e interfaces incriveis.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  location: "Sao Paulo, SP",
  memberSince: "Janeiro 2024",
  rating: 4.8,
  totalReviews: 47,
  tokenBalance: 2450,
  completedJobs: 34,
  activeJobs: 3,
  level: "Profissional",
  verified: true,
}

// Mock services/skills data
const userServices = [
  {
    id: "1",
    title: "Desenvolvimento de Sites",
    description: "Criacao de sites modernos e responsivos com React e Next.js",
    category: "Tecnologia",
    price: 150,
    status: "ativo" as const,
    requests: 12,
  },
  {
    id: "2",
    title: "APIs RESTful",
    description: "Desenvolvimento de APIs robustas com Node.js e Express",
    category: "Tecnologia",
    price: 120,
    status: "ativo" as const,
    requests: 8,
  },
  {
    id: "3",
    title: "Consultoria Tecnica",
    description: "Consultoria para projetos de software e arquitetura",
    category: "Consultoria",
    price: 200,
    status: "pendente" as const,
    requests: 3,
  },
]

// Mock history data
const historyData = {
  sent: [
    {
      id: "1",
      title: "Design de Logo",
      provider: "Ana Costa",
      providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
      date: "15 Mar 2024",
      status: "concluido" as const,
      tokens: 80,
    },
    {
      id: "2",
      title: "Edicao de Video",
      provider: "Pedro Santos",
      providerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      date: "10 Mar 2024",
      status: "ativo" as const,
      tokens: 150,
    },
    {
      id: "3",
      title: "Traducao de Documento",
      provider: "Maria Lima",
      providerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      date: "05 Mar 2024",
      status: "pendente" as const,
      tokens: 60,
    },
  ],
  received: [
    {
      id: "4",
      title: "Desenvolvimento de Site",
      requester: "Tech Solutions",
      requesterAvatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop",
      date: "18 Mar 2024",
      status: "ativo" as const,
      tokens: 300,
    },
    {
      id: "5",
      title: "API de Pagamentos",
      requester: "E-commerce Plus",
      requesterAvatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=50&h=50&fit=crop",
      date: "12 Mar 2024",
      status: "concluido" as const,
      tokens: 250,
    },
    {
      id: "6",
      title: "Consultoria em Cloud",
      requester: "Startup XYZ",
      requesterAvatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=50&h=50&fit=crop",
      date: "01 Mar 2024",
      status: "concluido" as const,
      tokens: 180,
    },
  ],
}

// Mock reviews data
const reviewsData = [
  {
    id: "1",
    reviewer: "Tech Solutions",
    reviewerAvatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop",
    rating: 5,
    comment: "Excelente profissional! Entregou o projeto antes do prazo e com qualidade impecavel. Recomendo fortemente.",
    date: "20 Mar 2024",
    service: "Desenvolvimento de Site",
  },
  {
    id: "2",
    reviewer: "E-commerce Plus",
    reviewerAvatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=50&h=50&fit=crop",
    rating: 5,
    comment: "Carlos e muito competente e comunicativo. A API ficou perfeita e a documentacao estava completa.",
    date: "15 Mar 2024",
    service: "API de Pagamentos",
  },
  {
    id: "3",
    reviewer: "Startup XYZ",
    reviewerAvatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=50&h=50&fit=crop",
    rating: 4,
    comment: "Otima consultoria! Nos ajudou a entender melhor nossas opcoes de infraestrutura. Muito didatico.",
    date: "05 Mar 2024",
    service: "Consultoria em Cloud",
  },
  {
    id: "4",
    reviewer: "Digital Agency",
    reviewerAvatar: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=50&h=50&fit=crop",
    rating: 5,
    comment: "Trabalho impecavel! O Carlos tem um conhecimento tecnico impressionante e e muito profissional.",
    date: "28 Fev 2024",
    service: "Desenvolvimento de Site",
  },
]

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= Math.floor(rating)
              ? "fill-warning text-warning"
              : star <= rating
              ? "fill-warning/50 text-warning"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

export default function PerfilPage() {
  const [historyTab, setHistoryTab] = useState<"sent" | "received">("received")

  return (
    <main className="min-h-screen bg-background pb-12">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="container mx-auto px-4 pb-24 pt-8">
          {/* Token Balance Banner */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Coins className="h-5 w-5 text-warning" />
              <span className="font-bold text-white">
                {new Intl.NumberFormat("pt-BR").format(userData.tokenBalance)}
              </span>
              <span className="text-sm text-white/70">tokens</span>
            </div>
            <Link href="/perfil/editar">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 shadow-md"
              >
                <Edit className="h-4 w-4" />
                Editar Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4">
        {/* Profile Card - Overlapping Header */}
        <Card className="-mt-20 mb-8 overflow-hidden border-0 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-card shadow-lg sm:h-32 sm:w-32">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="bg-secondary text-2xl text-secondary-foreground">
                    {userData.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {userData.verified && (
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground shadow-md">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-2 flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {userData.name}
                  </h1>
                  <Badge className="bg-secondary/15 text-secondary border-secondary/30">
                    <Award className="mr-1 h-3 w-3" />
                    {userData.level}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
                  <StarRating rating={userData.rating} size="lg" />
                  <span className="font-semibold text-foreground">
                    {userData.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({userData.totalReviews} avaliacoes)
                  </span>
                </div>

                {/* Bio */}
                <p className="mb-4 max-w-2xl text-muted-foreground">
                  {userData.bio}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {userData.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Membro desde {userData.memberSince}
                  </div>
                </div>
              </div>

              {/* Stats Cards - Desktop */}
              <div className="hidden gap-3 lg:flex">
                <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-5 py-3">
                  <span className="text-2xl font-bold text-foreground">
                    {userData.completedJobs}
                  </span>
                  <span className="text-xs text-muted-foreground">Concluidos</span>
                </div>
                <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-5 py-3">
                  <span className="text-2xl font-bold text-success">
                    {userData.activeJobs}
                  </span>
                  <span className="text-xs text-muted-foreground">Ativos</span>
                </div>
              </div>
            </div>

            {/* Stats Cards - Mobile */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
              <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-xl font-bold text-foreground">
                  {userData.completedJobs}
                </span>
                <span className="text-xs text-muted-foreground">Concluidos</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-xl font-bold text-success">
                  {userData.activeJobs}
                </span>
                <span className="text-xs text-muted-foreground">Ativos</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-xl font-bold text-warning">
                  {userData.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">Avaliacao</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-xl font-bold text-secondary">
                  {userData.totalReviews}
                </span>
                <span className="text-xs text-muted-foreground">Reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="habilidades" className="w-full">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto bg-card shadow-sm sm:w-auto">
            <TabsTrigger value="habilidades" className="gap-2">
              <Zap className="h-4 w-4" />
              <span>Habilidades</span>
            </TabsTrigger>
            <TabsTrigger value="historico" className="gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Historico</span>
            </TabsTrigger>
            <TabsTrigger value="avaliacoes" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Avaliacoes</span>
            </TabsTrigger>
          </TabsList>

          {/* Habilidades Tab */}
          <TabsContent value="habilidades">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userServices.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-secondary/30"
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {service.category}
                      </Badge>
                      <StatusBadge status={service.status} showIcon={false} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-secondary font-semibold">
                        <Coins className="h-4 w-4 text-warning" />
                        {service.price} tokens
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        {service.requests} solicitacoes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Service Card */}
              <Card className="group flex min-h-[200px] cursor-pointer items-center justify-center border-2 border-dashed border-border bg-muted/20 transition-all duration-300 hover:border-secondary/50 hover:bg-muted/40">
                <CardContent className="flex flex-col items-center gap-2 p-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
                    <Zap className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-muted-foreground group-hover:text-foreground">
                    Adicionar Servico
                  </span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Historico Tab */}
          <TabsContent value="historico">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">Historico de Solicitacoes</CardTitle>
                  <div className="flex rounded-lg bg-muted p-1">
                    <button
                      onClick={() => setHistoryTab("received")}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        historyTab === "received"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ArrowDownLeft className="h-4 w-4" />
                      Recebidas
                    </button>
                    <button
                      onClick={() => setHistoryTab("sent")}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        historyTab === "sent"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Enviadas
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {historyTab === "received"
                    ? historyData.received.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-secondary/30 hover:shadow-sm"
                        >
                          <Avatar className="h-12 w-12 border-2 border-border">
                            <AvatarImage src={item.requesterAvatar} alt={item.requester} />
                            <AvatarFallback>
                              {item.requester.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              De: {item.requester}
                            </p>
                          </div>
                          <div className="hidden flex-col items-end gap-1 sm:flex">
                            <div className="flex items-center gap-1.5 font-semibold text-success">
                              <Coins className="h-4 w-4 text-warning" />
                              +{item.tokens}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {item.date}
                            </span>
                          </div>
                          <StatusBadge status={item.status} />
                        </div>
                      ))
                    : historyData.sent.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-secondary/30 hover:shadow-sm"
                        >
                          <Avatar className="h-12 w-12 border-2 border-border">
                            <AvatarImage src={item.providerAvatar} alt={item.provider} />
                            <AvatarFallback>
                              {item.provider.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Para: {item.provider}
                            </p>
                          </div>
                          <div className="hidden flex-col items-end gap-1 sm:flex">
                            <div className="flex items-center gap-1.5 font-semibold text-destructive">
                              <Coins className="h-4 w-4 text-warning" />
                              -{item.tokens}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {item.date}
                            </span>
                          </div>
                          <StatusBadge status={item.status} />
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avaliacoes Tab */}
          <TabsContent value="avaliacoes">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Summary Card */}
              <Card className="lg:col-span-2">
                <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between">
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                    <div className="text-5xl font-bold text-foreground">
                      {userData.rating.toFixed(1)}
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <StarRating rating={userData.rating} size="lg" />
                      <span className="mt-1 text-sm text-muted-foreground">
                        Baseado em {userData.totalReviews} avaliacoes
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">98%</div>
                      <div className="text-xs text-muted-foreground">Satisfacao</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">95%</div>
                      <div className="text-xs text-muted-foreground">Recomendariam</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-xs text-muted-foreground">No prazo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {reviewsData.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={review.reviewerAvatar} alt={review.reviewer} />
                          <AvatarFallback>
                            {review.reviewer.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {review.reviewer}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {review.service}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
