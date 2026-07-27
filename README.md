# treinoApp

App de treino de academia — cadastro de treinos, exercícios, séries (peso/reps
ou tempo), cronômetro e busca de exercícios com prévia em vídeo/gif via API
externa (wger.de). PWA, funciona offline e é instalável no celular.

## Estrutura

```
treinoApp/
├── WebApi/    → Node + Express + Prisma (back-end, porta 3001)
└── WebApp/    → Vite + React + TSX + PWA (front-end, porta 5173)
```

## Início rápido

```bash
# 1. WebApi
cd WebApi
cp .env.example .env      # já vem copiado, mas confira os valores
npm install
npx prisma migrate dev --name init
npm run dev                # http://localhost:3001

# 2. WebApp (outro terminal)
cd ../WebApp
cp .env.example .env      # já vem copiado, confira VITE_API_URL
npm install
npm run dev                # http://localhost:5173
```

## Stack
- **Front-end:** Vite + React + TypeScript (TSX) + vite-plugin-pwa
- **Back-end:** Node + Express + Prisma ORM
- **Banco:** SQLite (dev) — trocar `provider` no schema.prisma pra Postgres em produção
- **Auth:** JWT (login/registro; logout limpa o token no client)
- **API de exercícios:** wger.de (proxy no back-end em `/api/exercises`)
- **Offline:** Service Worker (Workbox via vite-plugin-pwa) + cache da API

## Próximos passos sugeridos
1. Trocar os ícones placeholder em `WebApp/public/icons/`
2. Implementar a UI de cadastro de exercício + série na `WorkoutDetailPage`
3. Ligar o `ExerciseSearch` ao endpoint `/api/exercises/search` pra mostrar o gif/vídeo
4. Adicionar IndexedDB (ex: biblioteca `idb`) pra fila de sincronização offline
