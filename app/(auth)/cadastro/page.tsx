"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, UserPlus, Mail, Lock, User, FileText, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

interface FormErrors {
  name?: string
  email?: string
  password?: string
  bio?: string
  photo?: string
  general?: string
}

export default function CadastroPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    photo: null as File | null,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Digite um email válido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    if (formData.bio && formData.bio.length > 300) {
      newErrors.bio = "A bio deve ter no máximo 300 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    // Simular chamada de API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulação de cadastro bem-sucedido
    setIsLoading(false)
    router.push("/login")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: "A imagem deve ter no máximo 5MB" }))
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, photo: "O arquivo deve ser uma imagem" }))
        return
      }

      setFormData((prev) => ({ ...prev, photo: file }))
      setErrors((prev) => ({ ...prev, photo: undefined }))
      
      // Criar preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }))
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-border/50">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Crie sua conta
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para começar
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <FieldGroup className="gap-5">
            {/* Upload de Foto */}
            <Field data-invalid={!!errors.photo}>
              <FieldLabel>Foto de Perfil</FieldLabel>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border shadow-md">
                      <Image
                        src={photoPreview}
                        alt="Preview da foto"
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 transition-colors"
                      aria-label="Remover foto"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {photoPreview ? "Trocar foto" : "Escolher foto"}
                  </Button>
                  <FieldDescription className="mt-1.5 text-xs">
                    JPG, PNG ou GIF. Máx. 5MB.
                  </FieldDescription>
                </div>
              </div>
              {errors.photo && <FieldError>{errors.photo}</FieldError>}
            </Field>

            {/* Campo Nome */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">
                Nome <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  aria-invalid={!!errors.name}
                  disabled={isLoading}
                />
              </div>
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            {/* Campo Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  aria-invalid={!!errors.email}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            {/* Campo Senha */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">
                Senha <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  aria-invalid={!!errors.password}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            {/* Campo Bio */}
            <Field data-invalid={!!errors.bio}>
              <FieldLabel htmlFor="bio">
                Bio
              </FieldLabel>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Conte um pouco sobre você e suas habilidades..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="min-h-[100px] pl-10 resize-none"
                  aria-invalid={!!errors.bio}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                {errors.bio ? (
                  <FieldError>{errors.bio}</FieldError>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Opcional - máximo 300 caracteres
                  </span>
                )}
                <span className={`text-xs ${formData.bio.length > 300 ? "text-destructive" : "text-muted-foreground"}`}>
                  {formData.bio.length}/300
                </span>
              </div>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Criando conta...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Criar conta
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link 
              href="/login" 
              className="font-medium text-secondary hover:text-secondary/80 hover:underline transition-colors"
            >
              Faça login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
