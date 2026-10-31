# Newportgame

Catálogo oficial da Newportgame para traduções, restaurações e preservação de jogos clássicos, começando por SpellCaster e Kujaku Ou. O projeto distribui patches e documentação; não inclui ROMs comerciais completas.

## Executar no Replit

- O app web fica em `artifacts/newportgame`.
- Use o fluxo gerenciado `artifacts/newportgame: web`; ele inicia `pnpm --filter @workspace/newportgame run dev`.
- O serviço fornece `PORT` e `BASE_PATH` pela configuração do artefato. Não são necessárias variáveis secretas para iniciar o app.
- Instale dependências com `pnpm install --frozen-lockfile`.
- Verifique os tipos com `pnpm --filter @workspace/newportgame run typecheck`.
- Para executar manualmente fora do fluxo do Replit: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run dev`.
- Para gerar o build manualmente: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run build`.
