# Newportgame

Catálogo oficial da Newportgame para traduções, restaurações e preservação de jogos clássicos, começando por SpellCaster e Kujaku Ou. O projeto distribui patches e documentação; não inclui ROMs comerciais completas.

## Executar no Replit

- O app web fica em `artifacts/newportgame`.
- Use o fluxo gerenciado `artifacts/newportgame: web`; ele inicia `pnpm --filter @workspace/newportgame run dev`.
- O serviço fornece `PORT` e `BASE_PATH` pela configuração do artefato.
- A autenticação usa Clerk gerenciado pelo Replit. As chaves são provisionadas no fluxo seguro do workspace; não as copie para arquivos `.env` nem para o código.
- Para permitir o login, ative Google no painel Auth do Replit nos ambientes de desenvolvimento e produção. O catálogo e os downloads continuam públicos.
- A página `/enviar-traducao` exige sessão autenticada. Ela é apenas um espaço reservado; o formulário de envio ainda não foi implementado.
- O servidor `artifacts/api-server: API Server` inclui o proxy Clerk necessário para a autenticação em produção.
- Instale dependências com `pnpm install --frozen-lockfile`.
- Verifique os tipos com `pnpm --filter @workspace/newportgame run typecheck`.
- Para executar manualmente fora do fluxo do Replit: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run dev`.
- Para gerar o build manualmente: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/newportgame run build`.
