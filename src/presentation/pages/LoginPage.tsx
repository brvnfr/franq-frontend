import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/utils/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const LoginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      navigate("/"); // Ou "/dashboard"
    } else {
      toast.error("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-2xl bg-white dark:bg-zinc-900">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Login Franq</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="w-full p-3 rounded-lg border bg-muted"
              disabled={isSubmitting}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="w-full p-3 rounded-lg border bg-muted"
              disabled={isSubmitting}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold rounded-xl py-3 hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Não tem conta?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
