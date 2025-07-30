/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/utils/helpers/cn"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/utils/hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"

const RegisterSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

type RegisterInput = z.infer<typeof RegisterSchema>

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data)
      toast.success("Cadastro realizado com sucesso! Você já está logado.")
      navigate("/")
    } catch (err: any) {
      toast.error(err?.message || "Erro ao cadastrar.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os campos para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  {...register("name")}
                  disabled={isSubmitting}
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Sua senha"
                  {...register("password")}
                  disabled={isSubmitting}
                  required
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
              <div className="text-center text-sm">
                Já tem conta?{" "}
                <Link to="/login" className="underline underline-offset-4 text-blue-600">
                  Faça login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Franq - Senior Front End Software Engineer Test - by @brvnfr
      </div>
    </div>
  )
}
