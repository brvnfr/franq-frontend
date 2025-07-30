import React from "react";
import { toast } from "sonner";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {

    toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="p-8 rounded-xl bg-white dark:bg-zinc-900 shadow-xl text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-red-600">Erro inesperado</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Algo deu errado. Recarregue a página ou entre em contato com o suporte.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
