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

const LoginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof LoginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    const user = await login(data.email, data.password);
    if (user) {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } else {
      toast.error("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen py-8 px-2 bg-muted", className)} {...props}>
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-border bg-card">
        <CardHeader className="text-center">
          <img
            src={theme === "dark" ? "/assets/franq-inverted.svg" : "/assets/franq.svg"}
            alt="Franq"
            className="mx-auto w-36 h-20 mb-2"
            draggable={false}
          />
          <CardTitle className="text-xl font-semibold">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Acesse com seu e-mail e senha cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                placeholder="Senha"
                autoComplete="current-password"
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <div className="flex items-center justify-center text-sm mt-2">
              Não tem conta?{" "}
              <Link to="/register" className="ml-1 font-medium text-primary hover:underline">
                Cadastre-se
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
