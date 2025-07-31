# Franq Frontend Challenge

Sistema desenvolvido para o desafio técnico da vaga de Pessoa Engenheira de Software Sênior (Frontend React) na Franq.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)]
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)]
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)]
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss)]
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-themeable-262626)]
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Sobre o Projeto

Sistema web completo, com autenticação, integração com API financeira, exibição dinâmica de dados (tabelas e gráficos), dark/light theme, alta performance e código escalável, seguindo Clean Architecture, OOP e princípios SOLID.

**Funcionalidades:**
- Cadastro e login de usuários (persistência local)
- Proteção de rotas para usuários autenticados
- Consumo da API Twelve Data (dados financeiros em tempo real)
- Listagem, ordenação e filtros de dados
- Gráficos dinâmicos e responsivos
- Tema escuro/claro, feedback visual, responsividade

---

## 🌎 Sobre as APIs financeiras

> **Nota técnica:**  
> O projeto originalmente previa o uso da [HG Brasil Finance API](https://hgbrasil.com/status/finance/) para buscar dados financeiros.
> Porém, devido a políticas de **CORS** da HG Brasil (permitindo apenas requisições de backend), optamos por integrar a [Twelve Data API](https://twelvedata.com/documentation), que possibilita consumo direto via navegador, sem bloqueios, e fornece dados de mercado em tempo real.  
> Isso permitiu focar no frontend puro e acelerar a prototipação para o desafio técnico.

---

## 🚀 Principais Tecnologias

- **React 19 + Vite**
- **TypeScript 5**
- **TailwindCSS 4 + shadcn/ui + Radix UI**
- **Zustand** para estado global
- **React Router DOM 7** para rotas privadas/protegidas
- **@tanstack/react-query** para cache de requisições
- **Recharts** para gráficos de dados financeiros
- **React Hook Form + Zod** para formulários e validação
- **Axios** para integrações HTTP
- **Dayjs** para datas
- **Sonner** para toasts/feedbacks
- **Lucide-react** para ícones SVG

---

## 🏗️ Arquitetura e Organização

- **Clean Architecture:** Separação clara em `app`, `core`, `infrastructure`, `presentation`, `styles`, `utils`.
- **SOLID/OOP:** Entidades, contratos e casos de uso bem definidos.
- **Design System:** shadcn/ui + Tailwind + Radix UI, suporte nativo a dark/light.
- **Estado global:** Zustand.

---

## 🗂️ Estrutura de Pastas

```plaintext
src/
├── app/
│   ├── main.tsx              # Entry point do app
│   ├── providers/            # Providers globais (auth, theme, query...)
├── components/
│   ├── ui/                   # Componentes atômicos compartilháveis
├── core/
│   ├── domain/               # Entidades e tipos centrais do domínio
│   ├── repositories/         # Contratos/Interfaces dos repositórios
│   ├── use-cases/            # Casos de uso da aplicação
├── infrastructure/
│   ├── api/                  # Comunicação com APIs externas (ex: TwelveData)
│   ├── storage/              # Persistência local (auth, user, tokens)
├── presentation/
│   ├── components/           # Componentes de tela (ex: gráficos, tabelas)
│   ├── layouts/              # Estruturas de página (navbar, header)
│   ├── pages/                # Páginas principais do app (login, dashboard)
├── styles/
│   ├── index.css             # Estilos globais (Tailwind, resets)
├── utils/
│   ├── helpers/              # Funções auxiliares (ex: formatadores)
│   ├── hooks/                # Hooks reutilizáveis (useAuth, useTheme)
├── vite-env.d.ts             # Tipagem do ambiente Vite
```

---

## 🔒 Autenticação

- Cadastro e login 100% local (persistência via localStorage)
- Rotas protegidas usando context/hook customizado
- Redirect automático para login se não autenticado

---

## 📊 Consumo de API

- **Twelve Data API**: dados financeiros e de mercado em tempo real
- Exibição via tabelas, gráficos dinâmicos (Recharts) e filtros
- Interação reativa e UX moderna

---

## 💻 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/franq_frontend.git
cd franq_frontend
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Variáveis de ambiente

Renomeie `.env.example` para `.env` e preencha as variáveis da Twelve Data API.

### 4. Rodar o projeto localmente

```bash
npm run dev
# ou
yarn dev
```

---

## 📱 Responsividade e Temas

- Mobile-first
- Alternância entre tema escuro e claro
- Componentes themeable, animações suaves

---

## 💡 Diferenciais

- Clean Architecture real (por camadas)
- Código limpo, reutilizável e bem tipado
- Estado global com Zustand (pronto para projetos grandes)
- Testes e ESLint/Prettier prontos
- Feedback visual em todas as ações críticas
- UI inspirada na página oficial Franq ([be.franq.com.br/login](https://be.franq.com.br/login))

---

## 📄 Licença

MIT License.

---

> Desenvolvido por Bruno Onofre — 2025  
> Challenge Franq
