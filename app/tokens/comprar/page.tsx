"use client"

import { useState } from "react"
import { 
  Coins, 
  CreditCard, 
  QrCode,
  Copy,
  Check,
  ChevronLeft,
  Sparkles,
  Shield,
  Clock,
  CheckCircle2,
  Loader2,
  X
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"

type PaymentMethod = "pix" | "credit_card"
type PaymentStatus = "idle" | "processing" | "success" | "error"

interface TokenPackage {
  id: string
  tokens: number
  price: number
  popular?: boolean
  bonus?: number
}

const tokenPackages: TokenPackage[] = [
  { id: "1", tokens: 10, price: 5 },
  { id: "2", tokens: 25, price: 10, popular: true, bonus: 5 },
  { id: "3", tokens: 50, price: 18 },
  { id: "4", tokens: 100, price: 30, bonus: 20 },
]

export default function ComprarTokensPage() {
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [pixCopied, setPixCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  // Dados do cartão
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const currentBalance = 1250

  const handleSelectPackage = (pkg: TokenPackage) => {
    setSelectedPackage(pkg)
    setShowModal(true)
    setPaymentStatus("idle")
    setPaymentMethod("pix")
    setPixCopied(false)
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvv("")
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPackage(null)
    setPaymentStatus("idle")
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890")
    setPixCopied(true)
    setTimeout(() => setPixCopied(false), 3000)
  }

  const handlePayment = () => {
    setPaymentStatus("processing")
    
    // Simular processamento
    setTimeout(() => {
      setPaymentStatus("success")
    }, 2500)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/tokens" 
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para Tokens
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/20 shadow-lg">
              <Coins className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Comprar Tokens</h1>
              <p className="text-muted-foreground">
                Adquira tokens para solicitar serviços na plataforma
              </p>
            </div>
          </div>
        </div>

        {/* Saldo Atual */}
        <Card className="mb-8 border-2 border-warning/30 bg-gradient-to-r from-warning/10 via-warning/5 to-transparent">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/20">
                <Coins className="h-7 w-7 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seu saldo atual</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {new Intl.NumberFormat("pt-BR").format(currentBalance)}
                  </span>
                  <span className="text-lg text-muted-foreground">tokens</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-warning/30 text-warning">
              <Sparkles className="mr-1 h-3 w-3" />
              Premium
            </Badge>
          </CardContent>
        </Card>

        {/* Pacotes de Tokens */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Escolha um pacote</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tokenPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={cn(
                  "relative cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
                  pkg.popular && "border-2 border-secondary ring-2 ring-secondary/20",
                  selectedPackage?.id === pkg.id && "border-2 border-primary"
                )}
                onClick={() => handleSelectPackage(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground shadow-lg">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                {pkg.bonus && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-success text-success-foreground shadow-lg">
                      +{pkg.bonus} bônus
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-center justify-center">
                    <div className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl",
                      pkg.popular ? "bg-secondary/20" : "bg-warning/20"
                    )}>
                      <Coins className={cn(
                        "h-8 w-8",
                        pkg.popular ? "text-secondary" : "text-warning"
                      )} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">{pkg.tokens}</span>
                    <span className="ml-1 text-lg text-muted-foreground">tokens</span>
                  </div>
                  {pkg.bonus && (
                    <p className="mb-2 text-sm text-success">
                      + {pkg.bonus} tokens de bônus
                    </p>
                  )}
                  <div className="mt-4 rounded-xl bg-muted/50 px-4 py-2">
                    <span className="text-2xl font-bold text-foreground">
                      R$ {pkg.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    R$ {(pkg.price / pkg.tokens).toFixed(2).replace(".", ",")} por token
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefícios */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-lg">Por que comprar tokens?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Acesso a profissionais</p>
                  <p className="text-sm text-muted-foreground">
                    Envie solicitações para freelancers qualificados
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Transação segura</p>
                  <p className="text-sm text-muted-foreground">
                    Pagamentos protegidos e criptografados
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Tokens não expiram</p>
                  <p className="text-sm text-muted-foreground">
                    Use quando quiser, sem prazo de validade
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Pagamento */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <CardTitle>Finalizar Compra</CardTitle>
              <CardDescription>
                Revise seu pedido e escolha a forma de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentStatus === "success" ? (
                // Tela de Sucesso
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    Pagamento Confirmado!
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Seus tokens foram adicionados ao seu saldo
                  </p>
                  <div className="mb-6 rounded-xl bg-success/10 px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Coins className="h-6 w-6 text-success" />
                      <span className="text-2xl font-bold text-success">
                        +{selectedPackage.tokens + (selectedPackage.bonus || 0)} tokens
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleCloseModal} className="w-full">
                    Voltar para Tokens
                  </Button>
                </div>
              ) : (
                <>
                  {/* Resumo do Pedido */}
                  <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/20">
                          <Coins className="h-6 w-6 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {selectedPackage.tokens} tokens
                          </p>
                          {selectedPackage.bonus && (
                            <p className="text-sm text-success">
                              + {selectedPackage.bonus} tokens de bônus
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">
                          R$ {selectedPackage.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Método de Pagamento */}
                  <div className="mb-6">
                    <Label className="mb-3 block text-sm font-medium">
                      Forma de pagamento
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pix")}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                          paymentMethod === "pix"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <QrCode className={cn(
                          "h-6 w-6",
                          paymentMethod === "pix" ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className={cn(
                          "text-sm font-medium",
                          paymentMethod === "pix" ? "text-primary" : "text-foreground"
                        )}>
                          PIX
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("credit_card")}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                          paymentMethod === "credit_card"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <CreditCard className={cn(
                          "h-6 w-6",
                          paymentMethod === "credit_card" ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className={cn(
                          "text-sm font-medium",
                          paymentMethod === "credit_card" ? "text-primary" : "text-foreground"
                        )}>
                          Cartão
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Formulário PIX */}
                  {paymentMethod === "pix" && (
                    <div className="space-y-4">
                      {/* QR Code Placeholder */}
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30">
                          <div className="text-center">
                            <QrCode className="mx-auto mb-2 h-16 w-16 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">QR Code PIX</p>
                          </div>
                        </div>
                        
                        {/* Copiar Código */}
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={handleCopyPix}
                        >
                          {pixCopied ? (
                            <>
                              <Check className="h-4 w-4 text-success" />
                              Código copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copiar código PIX
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Status de Pagamento */}
                      <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
                        <div className="flex items-center gap-3">
                          {paymentStatus === "processing" ? (
                            <Loader2 className="h-5 w-5 animate-spin text-warning" />
                          ) : (
                            <Clock className="h-5 w-5 text-warning" />
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              Aguardando pagamento
                            </p>
                            <p className="text-sm text-muted-foreground">
                              O pagamento será confirmado automaticamente
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Simular Pagamento (para demo) */}
                      <Button 
                        className="w-full" 
                        onClick={handlePayment}
                        disabled={paymentStatus === "processing"}
                      >
                        {paymentStatus === "processing" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          "Simular Pagamento PIX"
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Formulário Cartão */}
                  {paymentMethod === "credit_card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Como está no cartão"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            maxLength={5}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            maxLength={4}
                            type="password"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full gap-2" 
                        onClick={handlePayment}
                        disabled={paymentStatus === "processing" || !cardNumber || !cardName || !cardExpiry || !cardCvv}
                      >
                        {paymentStatus === "processing" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4" />
                            Pagar R$ {selectedPackage.price.toFixed(2).replace(".", ",")}
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        <Shield className="mr-1 inline h-3 w-3" />
                        Pagamento seguro e criptografado
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
