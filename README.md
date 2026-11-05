# NEWPORTGAME

Site e arquivos-fonte do projeto Newportgame. A aplicação web está em `artifacts/newportgame`.

## Desenvolvimento

```sh
pnpm install
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run dev
```

## Build de produção

```sh
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run build
```

O projeto distribui patches e documentação; não inclui ROMs comerciais completas.

## Hospedar na Vercel

- Importe este repositório na Vercel e mantenha o diretório raiz como a raiz do repositório. O `vercel.json` configura o build do workspace, a saída estática e o fallback das rotas do site.
- Esta etapa publica o catálogo público. O servidor Express e o login Google não são publicados/configurados por esse build.
- Para ativar login Google fora do Replit, será necessário configurar uma instância Clerk externa e hospedar/ajustar o serviço de autenticação; as credenciais devem ficar nos secrets da Vercel, nunca no código.
