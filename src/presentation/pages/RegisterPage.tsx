import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/utils/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const RegisterSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
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
      toast.error(err.message || "Erro ao cadastrar.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-2xl bg-white dark:bg-zinc-900">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Cadastro Franq</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              {...register("name")}
              className="w-full p-3 rounded-lg border bg-muted"
              disabled={isSubmitting}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

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
              Cadastrar
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Já tem conta?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
