# Auditoria antes das correções — Olvida One

URL: `http://localhost:4173/`. Inspeção via MCP `chrome-devtools`. Nenhum arquivo de código foi alterado nesta etapa. Os prints de página inteira estão em `antes-360.png`, `antes-768.png` e `antes-1280.png`.

## 1. Lighthouse

| Dispositivo | Acessibilidade | Boas práticas | SEO | Resultado |
| --- | --- | --- | --- | --- |
| Mobile | Não obtida | Não obtida | Não obtida | `lighthouse_audit` falhou |
| Desktop | Não obtida | Não obtida | Não obtida | `lighthouse_audit` falhou |

As duas chamadas falharam com `Protocol error (Network.emulateNetworkConditionsByRule): Invalid parameters Failed to deserialize params.offline - BINDINGS: mandatory field missing at position 120`. Uma primeira chamada mobile também falhou com `No page found` após o navegador reiniciar/reconectar; reconectei à página e repeti. **Não há notas nem lista de falhas do Lighthouse disponível**; achados abaixo são de inspeção independente, não do Lighthouse.

## 2. Responsividade e áreas de toque

`resize_page` ajusta a janela, mas a largura interna registrada por `evaluate_script` após pedir 360×800 foi **500×800**, provavelmente limitada pelo mínimo da janela neste ambiente. Portanto, `antes-360.png` **não comprova layout em viewport de 360px**. A tentativa de `emulate({viewport: '360x800x1,mobile,touch'})` falhou com o mesmo erro de protocolo acima. Em 768×1024, a viewport observada foi **768×953** (altura diferente da pedida); em 1280×800, **1280×800**.

| Tamanho solicitado | Viewport medida | `document.documentElement.scrollWidth > window.innerWidth` | Elementos que ultrapassam a largura |
| --- | --- | --- | --- |
| 360×800 | 500×800 | `false` (500 = 500) | Nenhum na viewport de 500px; 360px não verificado |
| 768×1024 | 768×953 | `false` (768 = 768) | Nenhum |
| 1280×800 | 1280×800 | `false` (1280 = 1280) | Nenhum |

Critério usado para alvos pequenos: retângulo visível de botão/link com **largura < 44px ou altura < 44px**, independentemente do espaçamento ao redor. Medidas arredondadas em px; controles com layout não visível foram excluídos.

| Alvo | 500px (pedido 360) | 768px | 1280px |
| --- | --- | --- | --- |
| Link da marca no cabeçalho | 103×31 | 103×31 | 103×31 |
| Botão abrir menu | 43×43 | 43×43 | Não visível |
| Botões das três cores do aparelho | 37×37 cada | 37×37 cada | 37×37 cada |
| Botão “Usar exemplo” | 85×28 | 85×28 | 85×28 |
| Link da marca no rodapé | 96×28 | 447×28 | 924×28 |
| Links “Benefícios”, “Como funciona”, “Produto” do rodapé | 60×20, 88×20, 46×20 | Mesmas dimensões | Mesmas dimensões |
| Links “Benefícios”, “Como funciona”, “Produto”, “Preço”, “FAQ” do cabeçalho | Não visíveis | Não visíveis | 68×37, 99×37, 52×37, 38×37, 26×37 |
| Botão “Entrar na lista” do cabeçalho | Não visível | Não visível | 121×41 |

## 3. Estrutura e console

`take_snapshot` mostrou **1 h1** (“Esqueça o que não precisa lembrar.”); os títulos principais das seções são h2, com subtítulos de benefícios, passos e planos em h3. Não foram observados saltos de nível na hierarquia inicial. A inspeção de controles visíveis (`button`, `a`, `input`, `select`, `textarea`) não encontrou nenhum sem nome acessível. Não foram encontradas imagens `<img>` sem alternativa; **três SVGs de benefícios** aparecem no DOM sem `aria-hidden`, `role="presentation"` ou nome próprio. Sua leitura real por leitor de tela não foi testada. `list_console_messages` com tipos `error`, `warn` e `issue` retornou **nenhuma mensagem** (antes e após as interações).

## 4. Interações observadas

- **Formulário vazio:** ao clicar em “Entrar na lista”, surgiram erros para nome (“Informe seu nome com pelo menos 2 caracteres.”), e-mail (“Informe um e-mail válido.”) e consentimento (“Confirme que entendeu que o produto é fictício.”). Os campos ficaram com `invalid="true"` na árvore de acessibilidade.
- **Formulário válido:** preenchi nome “Teste Auditoria”, e-mail `auditoria@example.com` e marquei consentimento; o modal “Você está na lista!” abriu com posição fictícia (#1409 nesta execução) e foco no botão “Fechar”. `fill_form` conseguiu preencher nome e e-mail mas falhou no checkbox: `Failed to interact with the element with uid 1_496. The element did not become interactive within the configured timeout.` O checkbox mede 1×1px e foi marcado clicando no texto do seu `<label>` com o MCP.
- **ESC no modal:** fechou o modal; `document.activeElement` passou a ser **`<body>`**, não o botão que disparou o envio.
- **FAQ:** após clicar em “Ele apaga memórias importantes?”, seu `aria-expanded` mudou de `false` para `true`, e a pergunta anteriormente aberta mudou para `false`.
- **Menu responsivo:** com largura interna de **500px** (não 360px), “Abrir menu” tinha `aria-expanded="false"`; após o clique passou a `true`, o nome mudou para “Fechar menu” e a navegação ficou visível. Comportamento exato em 360px não comprovado.
- **Movimento reduzido:** `emulate({prefersReducedMotion:'reduce'})` falhou com o mesmo erro de protocolo de rede acima. `matchMedia('(prefers-reduced-motion: reduce)').matches` continuou `false`. **Não foi possível verificar se o botão “Esquecer agora” dispara flash sob preferência de movimento reduzido**; nenhum resultado foi inferido.

## 5. Achados para priorização

Gravidade é uma sugestão de priorização, não uma nota Lighthouse. Os caminhos são componentes prováveis identificados no repositório.

| # | Gravidade | Onde (arquivo/componente provável) | Descrição | Sugestão de correção |
| --- | --- | --- | --- | --- |
| 1 | Média | `src/shared/ui/Modal.jsx` / `src/features/waitlist-signup/ui/SuccessModal.jsx` | Ao fechar modal com ESC, o foco voltou para `<body>`, não para o acionador. | Guardar elemento previamente focado/acionador e restaurar foco ao fechar. |
| 2 | Média | `src/widgets/site-header/SiteHeader.module.css`, `src/widgets/site-footer/SiteFooter.module.css`, `src/widgets/product/ProductSection.module.css`, `src/widgets/memory-demo/MemoryDemo.module.css` | Vários links/botões medidos abaixo de 44×44px nas viewports efetivamente medidas; detalhes na tabela. | Aumentar área clicável com padding/min-width/min-height, verificando layout e espaçamento. |
| 3 | Baixa | `src/widgets/benefits/Benefits.jsx` | Três SVGs de benefícios sem alternativa própria nem indicação explícita de decoração no DOM. | Se decorativos, usar `aria-hidden="true"`; se informativos, atribuir nome acessível. |
| 4 | Baixa | `src/features/waitlist-signup/ui/WaitlistForm.module.css` | Checkbox real mede 1×1px; a interação direta via `fill_form` falhou, embora clicar no texto associado tenha funcionado. Não foi testado como falha de interação humana. | Conferir área efetiva do `<label>` e teclado/leitor de tela antes de decidir ajuste. |
| 5 | Média (verificação pendente) | Ferramenta MCP / ambiente de teste | Lighthouse mobile e desktop, viewport real de 360px e emulação de movimento reduzido ficaram bloqueados; não há notas nem conclusão sobre flash em modo reduzido. | Corrigir/atualizar integração Chrome DevTools MCP/Chrome e repetir a auditoria antes de concluir esses itens. |

## 6. Ferramentas do MCP chamadas, em ordem

Chamadas com falha são mantidas nesta lista; leituras/edições de arquivos locais não são ferramentas MCP. Quando executadas na mesma chamada de `execute`, a ordem abaixo é a ordem de invocação.

1. `list_pages`
2. `navigate_page` (página 1)
3. `lighthouse_audit` mobile (página 1; falhou: página perdida)
4. `list_pages`
5. `navigate_page` (página 2)
6. `lighthouse_audit` mobile (falha de protocolo)
7. `lighthouse_audit` desktop (falha de protocolo)
8. `resize_page` 360×800
9. `take_screenshot` (caminho absoluto; MCP informou caminho malformado; não gerou arquivo em `docs/mcp/`)
10. `evaluate_script` (largura, overflow, alvos pequenos)
11. `take_screenshot` (`antes-360.png`, caminho relativo)
12. `emulate` viewport 360 (falha de protocolo)
13. `resize_page` 768×1024
14. `take_screenshot` (`antes-768.png`)
15. `evaluate_script` (largura, overflow, alvos pequenos)
16. `resize_page` 1280×800
17. `take_screenshot` (`antes-1280.png`)
18. `evaluate_script` (largura, overflow, alvos pequenos)
19. `take_snapshot` (árvore detalhada)
20. `evaluate_script` (títulos, nomes, imagens/SVGs)
21. `list_console_messages`
22. `click` (formulário vazio)
23. `fill_form` (nome e e-mail; falha no checkbox)
24. `take_snapshot` (estado após tentativa de preencher)
25. `evaluate_script` (dimensões do checkbox e label)
26. `click` (texto associado ao checkbox)
27. `click` (enviar formulário válido)
28. `wait_for` (abertura do modal)
29. `press_key` (Escape)
30. `evaluate_script` (modal fechado e foco)
31. `click` (FAQ)
32. `evaluate_script` (`aria-expanded` do FAQ)
33. `resize_page` 360×800
34. `take_snapshot` (menu responsivo)
35. `evaluate_script` (estado antes de abrir menu)
36. `click` (abrir menu)
37. `evaluate_script` (estado após abrir menu)
38. `emulate` (`prefersReducedMotion: reduce`; falha de protocolo)
39. `evaluate_script` (preferência de movimento ainda falsa)
40. `list_console_messages`
