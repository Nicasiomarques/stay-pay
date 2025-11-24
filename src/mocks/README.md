# MirageJS API Mock Server

Este diretório contém a implementação completa de uma API mock usando MirageJS para a aplicação StayGo.

## 📁 Estrutura

```
src/mocks/
├── server.ts           # Configuração principal do servidor MirageJS
├── models.ts           # Definições dos modelos de dados
├── types.ts            # Interfaces TypeScript
├── factories.ts        # Factories para geração de dados
├── seeds.ts            # Dados iniciais (migrados de src/data/hotels.ts)
├── routes/             # Implementação dos endpoints
│   ├── hotels.ts       # Endpoints de hotéis e busca
│   ├── auth.ts         # Autenticação
│   ├── bookings.ts     # Reservas
│   ├── profile.ts      # Perfil do usuário
│   ├── favorites.ts    # Favoritos
│   ├── reviews.ts      # Avaliações
│   ├── payments.ts     # Pagamentos
│   └── notifications.ts # Notificações
└── README.md           # Esta documentação
```

## 🚀 Inicialização

O servidor MirageJS é inicializado automaticamente em modo desenvolvimento no arquivo `src/main.tsx`:

```typescript
if (import.meta.env.DEV) {
  makeServer({ environment: "development" });
}
```

## 📡 Endpoints Implementados

### 🏨 Hotéis (6 endpoints)

- `GET /api/hotels` - Buscar e filtrar hotéis
- `GET /api/hotels/:id` - Detalhes de um hotel
- `GET /api/hotels/:hotelId/rooms/availability` - Verificar disponibilidade
- `GET /api/hotels/featured` - Hotéis em destaque
- `GET /api/hotels/popular` - Hotéis populares (rating >= 4.7)
- `GET /api/destinations` - Destinos populares

### 🔐 Autenticação (6 endpoints)

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/forgot-password` - Solicitar reset de senha
- `POST /api/auth/reset-password` - Redefinir senha

### 📅 Reservas (5 endpoints)

- `POST /api/bookings` - Criar reserva
- `GET /api/bookings/:bookingId` - Detalhes da reserva
- `PATCH /api/bookings/:bookingId/cancel` - Cancelar reserva
- `GET /api/users/bookings` - Listar reservas do usuário
- `GET /api/users/bookings/upcoming` - Reservas futuras
- `GET /api/users/bookings/past` - Reservas passadas

### 👤 Perfil (4 endpoints)

- `GET /api/users/profile` - Obter perfil
- `PATCH /api/users/profile` - Atualizar perfil
- `POST /api/users/profile/avatar` - Upload de avatar
- `DELETE /api/users/profile` - Excluir conta

### ❤️ Favoritos (3 endpoints)

- `GET /api/users/favorites` - Listar favoritos
- `POST /api/users/favorites/:hotelId` - Adicionar favorito
- `DELETE /api/users/favorites/:hotelId` - Remover favorito

### ⭐ Avaliações (3 endpoints)

- `GET /api/hotels/:hotelId/reviews` - Listar reviews
- `POST /api/hotels/:hotelId/reviews` - Criar review
- `PATCH /api/reviews/:reviewId/helpful` - Marcar como útil

### 💳 Pagamentos (4 endpoints)

- `POST /api/payments/process` - Processar pagamento com cartão
- `POST /api/payments/mobile-money` - Pagamento via mobile money
- `GET /api/payments/:transactionId/status` - Status do pagamento
- `POST /api/payments/refund` - Processar reembolso

### 🔔 Notificações (2 endpoints)

- `GET /api/users/notifications` - Listar notificações
- `PATCH /api/users/notifications/:notificationId/read` - Marcar como lida

## 🔑 Autenticação

Endpoints protegidos requerem o header:

```
Authorization: Bearer {token}
```

### Usuário Demo

Para testes, use:

- **Email**: `joao@exemplo.com`
- **Senha**: `demo123`

Ou registre um novo usuário via `POST /api/auth/register`

## 📊 Dados Iniciais

O servidor é populado com:

- ✅ **12 hotéis** (migrados de `src/data/hotels.ts`)
- ✅ **1 usuário demo** (joao@exemplo.com)
- ✅ **Reviews de exemplo** para cada hotel

## 🛠️ Recursos

### Filtros de Busca

O endpoint `GET /api/hotels` suporta:

- `location` - Busca por localização ou nome
- `minPrice` / `maxPrice` - Faixa de preço
- `minRating` - Avaliação mínima
- `amenities` - Filtrar por comodidades
- `categories` - Filtrar por categoria (luxury, resort, hotel, inn, budget)
- `sortBy` - Ordenação (recomendado, preço, avaliação, distância)
- `page` / `limit` - Paginação

### Simulação de Latência

Todas as requisições têm um delay de **400ms** para simular requisições reais de rede.

### Tratamento de Erros

Respostas de erro seguem o formato:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem descritiva"
  }
}
```

Códigos HTTP comuns:

- `200` - Sucesso
- `201` - Criado
- `400` - Validação
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Não encontrado
- `409` - Conflito

## 🧪 Testando os Endpoints

### Exemplo: Login

```javascript
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "joao@exemplo.com",
    password: "demo123",
  }),
});

const { token, user } = await response.json();
```

### Exemplo: Buscar Hotéis

```javascript
const response = await fetch("/api/hotels?location=Luanda&minRating=4.5");
const { hotels } = await response.json();
```

### Exemplo: Criar Reserva

```javascript
const response = await fetch("/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    hotelId: 1,
    roomId: "1-1",
    checkIn: "2024-12-24T00:00:00Z",
    checkOut: "2024-12-28T00:00:00Z",
    guests: 2,
    // ... demais campos
  }),
});
```

## 🔧 Desenvolvimento

### Adicionar Novo Endpoint

1. Crie a função handler em `routes/{categoria}.ts`
2. Registre no `server.ts`:

```typescript
import { minhaNovaRoute } from './routes/minha-rota';

routes() {
  minhaNovaRoute(this);
}
```

### Modificar Dados Iniciais

Edite `seeds.ts` para adicionar/modificar dados iniciais.

### Adicionar Novo Model

1. Defina o tipo em `types.ts`
2. Adicione o modelo em `models.ts`
3. Crie factory em `factories.ts` (opcional)

## 📝 Notas

- O servidor só roda em **modo desenvolvimento** (`import.meta.env.DEV`)
- Dados são **reiniciados** a cada reload da página
- Para produção, substitua por uma API real
- Imagens do Unsplash são permitidas via `passthrough`

## 🎯 Próximos Passos

Para integrar com a aplicação:

1. ✅ Criar serviço HTTP (axios/fetch)
2. ✅ Substituir dados estáticos por chamadas API
3. ✅ Adicionar loading states
4. ✅ Implementar error handling
5. ✅ Adicionar interceptor de autenticação
6. ✅ Atualizar BookingContext para usar API

exemplo de uso dos endpoints @mocks/routes/test-endpoints.ts
