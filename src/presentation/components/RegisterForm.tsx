/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/utils/helpers/cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/utils/hooks/useTheme";

const RegisterSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterInput = z.infer<typeof RegisterSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema)
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data);
      toast.success("Cadastro realizado com sucesso! Você já está logado.");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao cadastrar.");
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen py-8 px-2 bg-muted", className)} {...props}>
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-border bg-card">
       <CardHeader className="text-center flex flex-col items-center">
          <img
            src={theme === "dark" ? "/assets/franq-inverted.svg" : "/assets/franq.svg"}
            alt="Franq"
            className="mx-auto w-36 h-20 mb-2"
            draggable={false}
          />
          <CardTitle className="text-xl font-semibold">Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os campos para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="h-12 rounded-lg px-4 text-base border focus:border-primary"
                {...register("name")}
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                className="h-12 rounded-lg px-4 text-base border focus:border-primary"
                {...register("email")}
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Sua senha"
                className="h-12 rounded-lg px-4 text-base border pr-10 focus:border-primary"
                {...register("password")}
                disabled={isSubmitting}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <div className="flex items-center justify-center text-sm mt-2">
              Já tem conta?{" "}
              <Link to="/login" className="ml-1 font-medium text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6 text-muted-foreground text-center text-xs">
        Franq - Senior Front End Software Engineer Test - by @brvnfr
      </div>
    </div>
  );
}
