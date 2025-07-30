import React from "react";
import { useAuth } from "@/utils/hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center bg-muted">
      <header className="w-full flex items-center justify-between p-6 bg-white shadow dark:bg-zinc-900">
        <h1 className="text-xl font-bold text-blue-600">Bem-vindo(a), {user?.name || "usuário"}!</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          onClick={logout}
        >
          Sair
        </button>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 flex flex-col gap-8">
        {/* Aqui vão as tabelas e gráficos do desafio */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Dashboard Financeiro</h2>
          <div className="p-8 bg-white rounded-xl shadow-xl min-h-[200px] dark:bg-zinc-800">
            <span className="text-muted-foreground">
              Dados da API aparecerão aqui...
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
