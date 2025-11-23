
  # StayGo Hotel Booking App UI

  ![PWA Ready](https://img.shields.io/badge/PWA-Ready-success)
  ![React](https://img.shields.io/badge/React-18.3.1-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
  ![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF)

  Progressive Web App para reservas de hotéis com design mobile-first. Baseado no design Figma disponível em https://www.figma.com/design/HhhgjHUfiMTXW1zE8e7KDH/StayGo-Hotel-Booking-App-UI.

  ## ✨ Características

  - 📱 **PWA Completo**: Instalável, funciona offline
  - 🎨 **Design Mobile-First**: Otimizado para dispositivos móveis
  - ⚡ **Performance**: Vite + SWC para builds ultra-rápidos
  - 🌐 **Offline-First**: Cache inteligente com Service Worker
  - 🔄 **Auto-atualização**: Notificações de novas versões
  - 🎯 **TypeScript**: Tipagem completa
  - 🎭 **Radix UI**: Componentes acessíveis e modernos

  ## 🚀 Quick Start

  ### Instalar Dependências
  ```bash
  npm i
  # ou
  pnpm i
  ```

  ### Desenvolvimento
  ```bash
  npm run dev
  ```
  Abre automaticamente em `http://localhost:3000`

  ### Build de Produção
  ```bash
  npm run build
  ```
  Gera build otimizado na pasta `build/`

  ## 📱 PWA Features

  Este app é um Progressive Web App completo:

  - ✅ Instalável em qualquer dispositivo
  - ✅ Funciona 100% offline após primeira visita
  - ✅ Cache inteligente de imagens (30 dias)
  - ✅ Prompt de atualização controlado pelo usuário
  - ✅ Service Worker com Workbox

  **📱 Como usar no celular**: Ver [MOBILE-PWA-GUIDE.md](MOBILE-PWA-GUIDE.md)

  **📖 Documentação completa**: Ver [PWA.md](PWA.md)

  ## 🛠️ Tech Stack

  - **React 18.3.1** com TypeScript
  - **Vite 6.3.5** com plugin SWC
  - **vite-plugin-pwa** para funcionalidade PWA
  - **Tailwind CSS 4.1.3**
  - **Radix UI** para componentes
  - **React Router DOM** para navegação
  - **Lucide React** para ícones

  ## 📂 Estrutura do Projeto

  ```
  StayGo Hotel Booking App UI/
  ├── public/              # Assets estáticos e ícones PWA
  ├── src/
  │   ├── components/      # Componentes React
  │   │   ├── ui/         # Componentes base (Radix UI)
  │   │   └── ...         # Componentes customizados
  │   ├── context/        # Context API (BookingContext)
  │   ├── screens/        # Páginas/rotas
  │   ├── data/           # Dados estáticos (hotéis)
  │   ├── registerSW.ts   # Service Worker
  │   └── main.tsx        # Entry point
  ├── vite.config.ts      # Configuração Vite + PWA
  └── PWA.md             # Documentação PWA
  ```

  ## 📖 Documentação

  - **[CLAUDE.md](CLAUDE.md)**: Guia de arquitetura para desenvolvedores
  - **[PWA.md](PWA.md)**: Guia completo de PWA e offline features
  - **[public/README.md](public/README.md)**: Instruções sobre ícones PWA

  ## 🎨 Design System

  - **Cor Primária**: `#0E64D2` (azul)
  - **Background**: `neutral-50`
  - **Bordas**: `rounded-2xl`, `rounded-xl`
  - **Sombras**: `shadow-sm`, `shadow-xl`

  ## 📝 License

  Baseado no design Figma StayGo Hotel Booking App UI
