# Instruções para agentes — Newportgame

## Commit e envio ao GitHub

Após concluir cada alteração solicitada neste projeto, faça o commit e o push antes de encerrar a tarefa. Não acumule alterações de pedidos diferentes para enviar depois.

1. Confira a branch atual, `git status`, os arquivos alterados e o estado mais recente da branch `main` no GitHub.
2. Execute as verificações adequadas à alteração e revise o diff.
3. Inclua somente os arquivos relacionados ao pedido. Não adicione segredos, arquivos `.env`, saídas geradas ou mudanças não relacionadas.
4. Crie um commit com uma mensagem curta e descritiva.
5. Envie o commit para `main` neste repositório: <https://github.com/contatonewportgame-code/newportgame>.
6. Confirme que o GitHub recebeu o commit e informe ao usuário o identificador curto do commit.

## Segurança e conflitos

- Nunca use `push --force`, reescreva o histórico compartilhado ou substitua alterações de outros colaboradores.
- Antes do push, busque as alterações mais recentes do GitHub. Se a branch tiver avançado, integre e revise as mudanças antes de enviar. Se houver conflito que não possa ser resolvido com segurança, pare e explique o problema.
- O remoto `gitsafe-backup` do ambiente Replit não é o repositório público do GitHub. Não envie diretamente o histórico local para o GitHub se os históricos forem diferentes.
- Se não houver um remoto GitHub configurado, use o fluxo autorizado disponível no ambiente. Quando necessário, clone a branch `main` do repositório de destino, copie apenas os arquivos alterados após conferir possíveis mudanças remotas, e faça o commit e o push nessa cópia.
- Nunca solicite, exponha ou grave credenciais do GitHub. Se não for possível enviar por falta de acesso ou erro, não diga que o push foi feito; preserve as alterações locais e informe o que impediu o envio.
