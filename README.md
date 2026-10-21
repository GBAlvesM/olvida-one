# Olvida One

> *Esqueça o que não precisa lembrar.*

Landing page fictícia criada para apresentar e "vender" o **Olvida One**, um aparelho de bolso que apaga lembranças triviais. Projeto acadêmico: nenhum produto é vendido e nenhum dado é coletado.

## Integrantes

- Gabriel Alves Miguel
- Enrico Assef Antonucci Ferreira


## Sobre o produto

O **Olvida One** é um aparelho de bolso fictício que, com um único flash de luz suave, apaga apenas as pequenas lembranças que atrapalham o seu dia. Ele tem três modos:

- **Modo Cringe:** apaga micos e constrangimentos (aquele áudio de 4 minutos mandado no grupo errado).
- **Modo Spoiler:** apaga spoilers acidentais (o final da série ouvido no elevador).
- **Modo Jingle:** apaga músicas grudentas (o comercial que não sai da cabeça).

O aparelho só funciona em quem o aciona, ou seja, o consentimento faz parte do design. O público-alvo são pessoas com vida digital intensa (grupos de WhatsApp, reuniões, séries, redes sociais) e a proposta é vender alívio mental com humor.

A landing page apresenta o produto com identidade visual própria, benefícios, explicação de como funciona, uma demonstração interativa do "esquecimento", depoimentos fictícios, planos e preços, FAQ e uma lista de espera funcional (simulada).


## Jornada de construção

### Ideia inicial

A ideia nasceu de uma conversa entre nós dois sobre momentos constrangedores que já vivemos. No meio dela, descobrimos que tínhamos em comum o gosto pelo filme *MIB: Homens de Preto* e a pergunta apareceu sozinha: **e se existisse um aparelho para apagar esse tipo de lembrança?**

A escolha do tema foi certeira: batemos o martelo de primeira, sem disputa entre ideias.

A discussão de verdade foi sobre **como adaptar** o conceito. Consideramos três caminhos:

1. Reproduzir o apagador de memórias do filme de forma literal.
2. Criar um aparelho original, inspirado no conceito, que atua apenas em quem o usa.
3. Fazer um aplicativo de "esquecer", sem produto físico.

Ficamos com o **caminho 2**. O enunciado pede um produto *inventado*, e uma cópia do aparelho do filme não seria isso. Além disso, o repositório é público e usar nomes e identidade de uma obra de terceiros seria arriscado. Por fim, apagar a memória *dos outros* sem consentimento é problemático mesmo como piada. O nome **Olvida** vem do verbo "olvidar", que significa esquecer.


### Pesquisa e referências

Pesquisamos como o apagador de memórias funciona no filme e o que dele poderíamos adaptar. Os pontos que mais nos chamaram atenção:

- **O flash de luz:** o efeito depende de a pessoa ver a luz. Virou o "pulso" do Olvida One, só que adaptado para ser **único e suave**, evitando efeito estroboscópico por questão de acessibilidade.
- **A regulagem de quanto será apagado:** no filme, o operador ajusta o alcance do apagamento. Em vez de ajustar tempo, criamos **três modos temáticos** (Cringe, Spoiler e Jingle), que são mais claros e mais engraçados para o público.
- **O formato compacto, de bastão, com lente e seletor:** observamos o design físico do aparelho para separar o que era essencial do que podia ser reinventado. O resultado foi uma cápsula alongada, com lente circular e anel seletor, desenhada do zero e sem imagens de terceiros.
- **A "frase de cobertura" depois do apagamento:** virou o humor da demonstração interativa: *"Memória apagada. Do que estávamos falando mesmo?"*
- **Quem opera x quem é afetado:** no filme, o aparelho age sobre os outros. Invertemos isso: no Olvida One, **só o próprio usuário é afetado**.


### Ferramentas utilizadas

- **OpenCode** como ambiente de desenvolvimento assistido por IA
- **React** (com Vite), **HTML** e **CSS Modules**, praticamente todo o código gerado no OpenCode
- **Arquitetura FSD (Feature-Sliced Design)**
- **GPT-5 mini, GPT 6-Luna e GPT 5.6-Sol**, acessados via Foundry
- **Git e GitHub** para versionamento e entrega

Não utilizamos Figma nem ferramentas de geração de imagens: toda representação visual do produto é feita em código.


### Uso de IA

**GPT-5 mini: estrutura e implementação inicial.** Gerou a estrutura base do projeto e a primeira versão da página. O resultado funcionou, mas **não ficou satisfatório visualmente**.

**GPT 6-Luna e GPT 5.6-Sol: melhorias e evolução visual.** Entraram na segunda etapa para refinar o UI/UX e elevar o nível do protótipo.

**Por que GPT?** Principalmente pela **disponibilidade de uso no Foundry**.

**Por que trocamos de modelo?** Para escalar as alçadas: começamos com um modelo mais leve para montar a base e subimos para modelos mais capazes quando precisávamos de resultados mais robustos e de maior qualidade visual.

**O que foi mantido, alterado e descartado**

- **Mantido:** o conceito do produto, a arquitetura FSD e a organização da página em seções, conforme o planejamento inicial.
- **Alterado:** a paleta de cores e boa parte do visual, com mudanças sugeridas pelos modelos mais avançados.
- **Descartado:** a sugestão da IA de criar **fotos do produto**. Preferimos simular o produto em código, direto na página, para ter mais controle sobre o resultado.


### Evolução da solução

Do primeiro protótipo até a versão final, **todo o UI/UX foi transformado**. A primeira versão era funcional, mas visualmente comum. A versão final é uma landing page de respeito, que representa bem um produto e dá até vontade de comprar.

Principais mudanças:

- **Reformulação completa do UI/UX**, com uma apresentação muito mais cuidada.
- **Mudanças na paleta de cores**, a partir de sugestões da IA.
- **Produto representado em código**, e não por imagens.

Decisões em que **não seguimos a IA**: nas duas etapas do projeto optamos por não usar fotos geradas do produto. Mantivemos a simulação em código para ter controle total sobre a aparência do Olvida One.


### Resultado final

Avaliamos o resultado como **muito satisfatório**, considerando os modelos utilizados e o tempo disponível. A página comunica bem o produto e tem uma experiência de navegação completa, com demo interativa e lista de espera. Se o Olvida fosse um produto real, já teríamos uma boa base para apresentá-lo ao público e começar a validar o interesse.

Se tivéssemos mais tempo, faríamos diferente:

- **Ajustes pontuais no site**, refinando detalhes de layout e interação.
- **Validação mais robusta da marca**, incluindo checar se o nome Olvida já é usado ou registrado.
- **Desenho do produto com mais calma**, explorando melhor o design físico do aparelho.
- **Coleta de feedbacks de uso** com pessoas reais, para aplicar melhorias.


## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
```

---

*Olvida One é um produto fictício criado para um projeto acadêmico. Nada é vendido e nenhum dado é coletado.*
