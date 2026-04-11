"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Zap,
  Tag,
  Coins,
  CheckCircle,
  X,
  AlertTriangle,
  LayoutGrid,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface Skill {
  id: string
  title: string
  description: string
  category: string
  price: number
  status: "active" | "inactive" | "pending"
  createdAt: string
  views: number
  solicitations: number
}

const categories = [
  { value: "desenvolvimento", label: "Desenvolvimento", icon: "💻" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "marketing", label: "Marketing", icon: "📈" },
  { value: "redacao", label: "Redacao", icon: "✍️" },
  { value: "traducao", label: "Traducao", icon: "🌐" },
  { value: "consultoria", label: "Consultoria", icon: "💼" },
  { value: "suporte", label: "Suporte", icon: "🛠️" },
  { value: "outros", label: "Outros", icon: "📦" },
]

const initialSkills: Skill[] = [
  {
    id: "1",
    title: "Desenvolvimento de Sites React",
    description:
      "Criacao de sites modernos e responsivos utilizando React, Next.js e Tailwind CSS. Inclui otimizacao de performance e SEO.",
    category: "desenvolvimento",
    price: 150,
    status: "active",
    createdAt: "2024-01-15",
    views: 245,
    solicitations: 12,
  },
  {
    id: "2",
    title: "Design de Interfaces UI/UX",
    description:
      "Design de interfaces intuitivas e atraentes para aplicativos web e mobile. Prototipagem no Figma com entrega de arquivos editaveis.",
    category: "design",
    price: 120,
    status: "active",
    createdAt: "2024-01-20",
    views: 189,
    solicitations: 8,
  },
  {
    id: "3",
    title: "Gestao de Redes Sociais",
    description:
      "Gerenciamento completo de redes sociais incluindo criacao de conteudo, agendamento de posts e analise de metricas.",
    category: "marketing",
    price: 80,
    status: "pending",
    createdAt: "2024-02-01",
    views: 67,
    solicitations: 3,
  },
  {
    id: "4",
    title: "Redacao de Artigos SEO",
    description:
      "Criacao de artigos otimizados para SEO com pesquisa de palavras-chave e estruturacao para rankeamento organico.",
    category: "redacao",
    price: 45,
    status: "active",
    createdAt: "2024-02-10",
    views: 134,
    solicitations: 15,
  },
  {
    id: "5",
    title: "Traducao Tecnica Ingles-Portugues",
    description:
      "Traducao especializada de documentos tecnicos, manuais e artigos cientificos do ingles para portugues brasileiro.",
    category: "traducao",
    price: 60,
    status: "inactive",
    createdAt: "2024-01-05",
    views: 89,
    solicitations: 5,
  },
]

export default function HabilidadesPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Success toast state
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error"
  }>({ show: false, message: "", type: "success" })

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000)
  }

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === "all" || skill.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", price: "" })
    setFormErrors({})
    setEditingSkill(null)
  }

  const openCreateModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      title: skill.title,
      description: skill.description,
      category: skill.category,
      price: skill.price.toString(),
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const openDeleteDialog = (skill: Skill) => {
    setSkillToDelete(skill)
    setIsDeleteDialogOpen(true)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title.trim()) {
      errors.title = "Titulo e obrigatorio"
    } else if (formData.title.length < 5) {
      errors.title = "Titulo deve ter pelo menos 5 caracteres"
    }

    if (!formData.description.trim()) {
      errors.description = "Descricao e obrigatoria"
    } else if (formData.description.length < 20) {
      errors.description = "Descricao deve ter pelo menos 20 caracteres"
    }

    if (!formData.category) {
      errors.category = "Selecione uma categoria"
    }

    if (!formData.price) {
      errors.price = "Preco e obrigatorio"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Preco deve ser um numero positivo"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (editingSkill) {
      // Update existing skill
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === editingSkill.id
            ? {
                ...skill,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: Number(formData.price),
              }
            : skill
        )
      )
      showToast("Habilidade atualizada com sucesso!")
    } else {
      // Create new skill
      const newSkill: Skill = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
        views: 0,
        solicitations: 0,
      }
      setSkills((prev) => [newSkill, ...prev])
      showToast("Habilidade criada com sucesso!")
    }

    setIsSaving(false)
    setIsModalOpen(false)
    resetForm()
  }

  const handleDelete = async () => {
    if (!skillToDelete) return

    setIsDeleting(true)

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSkills((prev) => prev.filter((skill) => skill.id !== skillToDelete.id))
    showToast("Habilidade excluida com sucesso!")

    setIsDeleting(false)
    setIsDeleteDialogOpen(false)
    setSkillToDelete(null)
  }

  const toggleSkillStatus = async (skill: Skill) => {
    const newStatus = skill.status === "active" ? "inactive" : "active"
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, status: newStatus } : s))
    )
    showToast(
      newStatus === "active" ? "Habilidade ativada!" : "Habilidade desativada!"
    )
  }

  const getStatusBadge = (status: Skill["status"]) => {
    const styles = {
      active: "bg-success/10 text-success border-success/20",
      inactive: "bg-muted text-muted-foreground border-muted-foreground/20",
      pending: "bg-warning/10 text-warning border-warning/20",
    }
    const labels = {
      active: "Ativo",
      inactive: "Inativo",
      pending: "Pendente",
    }
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
          styles[status]
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            status === "active" && "bg-success",
            status === "inactive" && "bg-muted-foreground",
            status === "pending" && "bg-warning"
          )}
        />
        {labels[status]}
      </span>
    )
  }

  const getCategoryInfo = (categoryValue: string) => {
    return (
      categories.find((c) => c.value === categoryValue) || {
        label: categoryValue,
        icon: "📦",
      }
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={cn(
            "fixed right-4 top-20 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300",
            toast.type === "success"
              ? "border-success/20 bg-success/10 text-success"
              : "border-destructive/20 bg-destructive/10 text-destructive"
          )}
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Minhas Habilidades
              </h1>
              <p className="mt-1 text-muted-foreground">
                Gerencie os servicos que voce oferece na plataforma
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <Plus className="h-5 w-5" />
              Nova Habilidade
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {skills.length}
                </p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {skills.filter((s) => s.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">Ativas</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Coins className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {skills.reduce((acc, s) => acc + s.solicitations, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Solicitacoes</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/50 p-2">
                <Tag className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(skills.map((s) => s.category)).size}
                </p>
                <p className="text-xs text-muted-foreground">Categorias</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-9 w-9"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-9 w-9"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Skills Grid/List */}
        {filteredSkills.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 py-16">
            <div className="rounded-full bg-muted p-4">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Nenhuma habilidade encontrada
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm || filterCategory !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Comece adicionando sua primeira habilidade"}
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Button onClick={openCreateModal} className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Habilidade
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => {
              const categoryInfo = getCategoryInfo(skill.category)
              return (
                <div
                  key={skill.id}
                  className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {/* Category Banner */}
                  <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{categoryInfo.icon}</span>
                      {categoryInfo.label}
                    </span>
                    {getStatusBadge(skill.status)}
                  </div>

                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground">
                      {skill.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {skill.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{skill.views} visualizacoes</span>
                      <span>{skill.solicitations} solicitacoes</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4 flex items-center gap-2">
                      <Coins className="h-5 w-5 text-warning" />
                      <span className="text-xl font-bold text-foreground">
                        {skill.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        tokens
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(skill)}
                        className="flex-1 gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSkillStatus(skill)}
                        className={cn(
                          "flex-1",
                          skill.status === "active"
                            ? "text-muted-foreground hover:bg-muted"
                            : "text-success hover:bg-success/10"
                        )}
                      >
                        {skill.status === "active" ? "Desativar" : "Ativar"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDeleteDialog(skill)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSkills.map((skill) => {
              const categoryInfo = getCategoryInfo(skill.category)
              return (
                <div
                  key={skill.id}
                  className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{categoryInfo.icon}</span>
                        {categoryInfo.label}
                      </span>
                      {getStatusBadge(skill.status)}
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {skill.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{skill.views} visualizacoes</span>
                      <span>{skill.solicitations} solicitacoes</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-warning" />
                      <span className="font-bold text-foreground">
                        {skill.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        tokens
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(skill)}
                        className="gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="hidden sm:inline">Editar</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDeleteDialog(skill)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Editar Habilidade" : "Nova Habilidade"}
            </DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Atualize as informacoes da sua habilidade"
                : "Preencha os dados para criar uma nova habilidade"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Titulo <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Ex: Desenvolvimento de Sites React"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={cn(formErrors.title && "border-destructive")}
              />
              {formErrors.title && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  {formErrors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Descricao <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Descreva detalhadamente o servico que voce oferece..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={cn(
                  "min-h-[100px]",
                  formErrors.description && "border-destructive"
                )}
              />
              <div className="flex items-center justify-between">
                {formErrors.description ? (
                  <p className="flex items-center gap-1 text-xs text-destructive">
                    <AlertTriangle className="h-3 w-3" />
                    {formErrors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-muted-foreground">
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Categoria <span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    formErrors.category && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.category && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  {formErrors.category}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Preco em Tokens <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warning" />
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className={cn("pl-9", formErrors.price && "border-destructive")}
                />
              </div>
              {formErrors.price && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  {formErrors.price}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 bg-primary text-primary-foreground"
            >
              {isSaving ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  {editingSkill ? "Atualizar" : "Criar Habilidade"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Excluir Habilidade
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir{" "}
              <strong>{skillToDelete?.title}</strong>? Esta acao nao pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
