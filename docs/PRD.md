# PRD — TI Corporation EquipHub (proposta para validação)

**Status:** rascunho elaborado a partir das aulas 8–10. Não foi fornecido PRD próprio da TI Corporation.

## Problema

Para uma organização com equipamentos compartilhados, o controle informal não oferece uma visão única sobre quem retirou cada ativo e quando precisa devolvê-lo.

## Objetivo da versão 1

Permitir que um operador veja o inventário, cadastre equipamentos e pessoas, registre empréstimos e devoluções, consulte prazos e exporte um resumo operacional.

## Regras propostas, sujeitas a validação

- Um equipamento não pode possuir dois empréstimos ativos.
- Um colaborador pode ter no máximo 3 equipamentos emprestados simultaneamente (número citado como exemplo nas aulas).
- Um equipamento em manutenção não pode ser emprestado.
- A previsão de devolução não pode anteceder a data de retirada.
- Um empréstimo devolvido conserva seu registro histórico.
- Dados de demonstração são fictícios; não usar como números reais da TI Corporation.

## Fora do escopo

SSO, autorização granular, notificações, integrações de patrimônio, compras, inventário por QR Code, gestão de reparos, assinaturas digitais, aplicativo nativo.

## Restrições

Front e backend em repositórios distintos, deploy Vercel; banco persistente só depois de configurar Supabase e migração; nenhum segredo em repositório público.
