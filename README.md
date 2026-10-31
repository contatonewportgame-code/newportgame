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
