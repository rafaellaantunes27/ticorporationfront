# Regras do frontend

## Quando aplicar

Ao alterar componentes React, CSS, comportamento visual ou recursos gráficos em `frontend/src/`.

## Orientações

- Siga `../layout.md` como referência visual normativa e reutilize tokens compartilhados existentes.
- Não introduza valores visuais locais recorrentes sem justificativa compatível com o layout.
- Preserve acessibilidade, responsividade e comunicação semântica dos estados; cor não deve ser o único indicador.
- Não exponha segredos do backend nem use variáveis privadas no bundle do navegador; siga `../../docs/rules/SECRETS.md`.
- Não substitua falhas da fonte real por dados fictícios silenciosos.
- Registre evidências e limitações no handoff conforme `../../docs/rules/spec-flow.md`.
