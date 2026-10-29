# Reauditoria — Olvida One

URL: `http://localhost:4173/`. Build de produção executado com `npm run build` antes de recarregar o preview e repetir os testes com o MCP `chrome-devtools`. Os screenshots de página inteira estão em `depois-360.png`, `depois-768.png` e `depois-1280.png`.

## Comparação das notas Lighthouse

| Dispositivo | Métrica | Antes | Depois |
| --- | --- | --- | --- |
| Mobile | Acessibilidade | Não obtida | Não obtida |
| Mobile | Boas práticas | Não obtida | Não obtida |
| Mobile | SEO | Não obtida | Não obtida |
| Desktop | Acessibilidade | Não obtida | Não obtida |
| Desktop | Boas práticas | Não obtida | Não obtida |
| Desktop | SEO | Não obtida | Não obtida |

`lighthouse_audit` (modo `navigation`) voltou a falhar nos dois dispositivos: `Protocol error (Network.emulateNetworkConditionsByRule): Invalid parameters Failed to deserialize params.offline - BINDINGS: mandatory field missing at position 120`. Uma tentativa adicional em modo `snapshot` também falhou com o mesmo erro. **Não foram retornadas notas nem lista de falhas do Lighthouse**, antes ou depois; não é possível calcular evolução.

## Comparação dos achados

| # anterior | Antes | Depois / evidência | Situação |
| --- | --- | --- | --- |
| 1 — foco após ESC | Foco em `<body>` após fechar o modal. | `press_key('Escape')` fechou o diálogo; `document.activeElement` foi `<button ... type="submit">Entrar na lista</button>`. | **Resolvido** na interação testada. |
| 2 — alvos menores que 44×44px | Marca, menu, cores, “Usar exemplo”, links do rodapé e links/CTA do cabeçalho medidos abaixo do limite. | Em 768×953: nenhum botão/link abaixo de 44×44. Em 1280×800: restaram “Preço” 38×44 e “FAQ” 26×44 no cabeçalho. Após pedir 360×800, a ferramenta mediu **1350×940**, com os mesmos dois alvos pequenos do cabeçalho; portanto o resultado desse print não é comparável aos 500×800 anteriores nem verifica 360px. | **Parcialmente resolvido**; dois links continuam estreitos em desktop. |
| 3 — SVGs | Três SVGs de benefícios sem alternativa explícita. | A inspeção DOM encontrou os mesmos três SVGs. | **Não corrigido**, conforme escopo. |
| 4 — checkbox | Checkbox 1×1px; `fill_form` não conseguiu interagir diretamente. | `fill_form` novamente falhou no checkbox com `Failed to interact with the element with uid 9_207. The element did not become interactive within the configured timeout.` Clicar no texto associado funcionou. | **Não corrigido**, conforme escopo. |
| 5 — ambiente de auditoria | Lighthouse, viewport 360px e movimento reduzido não verificáveis. | Atualizei o OpenCode CLI global de v2.1.4 para v2.2.0 (`opencode mcp list` mostrou `chrome-devtools connected`), mas `lighthouse_audit` e `emulate` continuam falhando com o erro de protocolo. `resize_page` continua sem garantir viewport 360px. | **Não resolvido**; limitação permanece fora do código da landing page. |

## Responsividade: medição após `resize_page`

O critério de overflow foi `document.documentElement.scrollWidth > window.innerWidth`; elementos além da viewport foram procurados pelos seus retângulos DOM. Alvos pequenos foram botões/links visíveis com largura **ou** altura inferior a 44px (sem compensar espaçamento entre alvos). Medidas arredondadas.

| Pedido | Viewport efetiva retornada | Scroll horizontal | Elementos ultrapassando a largura | Alvos < 44×44 |
| --- | --- | --- | --- | --- |
| 360×800 | **1350×940** | `false` (1350 = 1350) | Nenhum na viewport medida | Links “Preço” 38×44 e “FAQ” 26×44 |
| 768×1024 | **768×953** | `false` (768 = 768) | Nenhum | Nenhum |
| 1280×800 | **1280×800** | `false` (1280 = 1280) | Nenhum | Links “Preço” 38×44 e “FAQ” 26×44 |

O screenshot `depois-360.png` foi salvo após pedir 360×800, mas **mostra a viewport efetiva de 1350×940, não o layout de 360px**. Antes a mesma solicitação resultava em 500×800; esta diferença é uma regressão da **comparabilidade da medição**, não evidência de regressão de layout. Não se pode concluir sobre overflow ou alvos pequenos em 360px com esses dados.

## Estrutura, console e interações

- `take_snapshot` e `evaluate_script`: um único h1; seções em h2, subtítulos em h3, sem saltos observados. Nenhum controle visível sem nome acessível, nenhuma imagem `<img>` sem alternativa; permanecem três SVGs dos benefícios sem alternativa explícita.
- `list_console_messages` filtrando `error`, `warn`, `issue`: nenhuma mensagem, tanto antes quanto depois das interações.
- **Envio vazio:** erros para nome, e-mail e consentimento apareceram, com `aria-invalid="true"`; modal não abriu.
- **Envio válido:** nome “Teste Auditoria” e `auditoria@example.com`; consentimento selecionado clicando no texto do label. Modal “Você está na lista!” abriu; foco inicial no botão “Fechar”; posição fictícia aleatória nesta execução (#7340).
- **ESC:** modal fechou e o foco retornou ao botão de envio do formulário (antes: `<body>`).
- **FAQ:** ao abrir “Ele apaga memórias importantes?”, `aria-expanded` passou a `true` e o item anterior passou a `false`, tal como antes.
- **Menu:** após `resize_page(360,800)` usado nos testes de interação, `evaluate_script` registrou largura de **500px** (diferente dos 1350px vistos imediatamente após o screenshot da primeira medição). Nesta viewport de 500px, botão “Abrir menu” estava com `aria-expanded="false"`; clique mudou para `true`, label para “Fechar menu” e a navegação ficou visível. **360px real não testado**.
- **Movimento reduzido:** `emulate({prefersReducedMotion:'reduce', viewport:'360x800x1,mobile,touch'})` falhou com o erro de protocolo acima. `matchMedia('(prefers-reduced-motion: reduce)').matches` permaneceu `false`. Logo, não é possível concluir se a demo dispara flash com movimento reduzido. Não simulei o resultado.

## Não resolvido / possível piora

1. **Achado 5 continua aberto.** Atualizar o CLI e confirmar que o MCP conecta não consertou o erro `Network.emulateNetworkConditionsByRule`. Sem Lighthouse mobile/desktop e sem emulação confiável, não há notas nem resultado do flash sob `reduce`.
2. **Achado 2 é parcial.** “Preço” (38×44) e “FAQ” (26×44) ainda não passam no critério geométrico de 44×44 em desktop. Os demais alvos pequenos originalmente identificados não apareceram no reteste a 768 e 1280px. Verificação a 360px segue pendente.
3. **Achados 3 e 4 permanecem**, por escolha explícita de escopo. O reteste do checkbox falhou do mesmo modo.
4. **Limitação de medição piorou:** ao pedir 360×800, a primeira medição após screenshot retornou 1350×940 (antes 500×800); em outra medição após `resize_page` retornou 500px. Isso impede comparação visual direta dos arquivos “antes-360” e “depois-360”. Não há evidência de piora no site nos tamanhos efetivamente validados.

## Ferramentas MCP da reauditoria (ordem de invocação)

Além das chamadas abaixo, a investigação do ambiente usou `opencode --version`, `opencode mcp list` e atualização do CLI no terminal; elas não são chamadas às ferramentas do MCP.

1. `list_pages`
2. `lighthouse_audit` desktop, `snapshot` (tentativa diagnóstica; falhou)
3. `list_pages`
4. `emulate` movimento reduzido (tentativa diagnóstica; falhou)
5. `navigate_page` reload após `npm run build`
6. `lighthouse_audit` mobile (falhou)
7. `lighthouse_audit` desktop (falhou)
8. `resize_page` 360×800
9. `take_screenshot` `depois-360.png`
10. `evaluate_script` viewport, overflow e alvos
11. `resize_page` 768×1024
12. `take_screenshot` `depois-768.png`
13. `evaluate_script` viewport, overflow e alvos
14. `resize_page` 1280×800
15. `take_screenshot` `depois-1280.png`
16. `evaluate_script` viewport, overflow e alvos
17. `take_snapshot`
18. `evaluate_script` estrutura
19. `list_console_messages`
20. `click` submit vazio (primeiro UID expirou; falhou)
21. `take_snapshot` (UID atualizado)
22. `click` submit vazio
23. `evaluate_script` erros e modal
24. `take_snapshot`
25. `fill_form` nome, email e checkbox (falhou no checkbox)
26. `take_snapshot`
27. `click` label do checkbox
28. `click` submit válido
29. `wait_for` modal
30. `press_key` Escape
31. `evaluate_script` foco e modal
32. `click` FAQ
33. `evaluate_script` `aria-expanded` FAQ
34. `resize_page` 360×800
35. `take_snapshot` menu
36. `evaluate_script` menu fechado e largura
37. `click` menu
38. `evaluate_script` menu aberto
39. `emulate` viewport mobile e movimento reduzido (falhou)
40. `evaluate_script` largura e preferência de movimento
41. `list_console_messages`
