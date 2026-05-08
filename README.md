# RPG de Estudos

Um prototipo de plataforma de ensino em formato de RPG classico, feito com HTML, CSS e JavaScript puro. A ideia e transformar uma aula em uma pequena jornada: o jogador anda pelo mapa, conversa com NPCs, responde desafios de fixacao e enfrenta um boss final com perguntas sobre o tema estudado.

## Funcionalidades

- Mapa em grade com movimento por teclado ou botoes.
- NPCs com falas educativas em modal central.
- Desafios entre NPCs para reforcar o conteudo anterior.
- Boss final com quiz configuravel.
- Tela de vitoria com confetes.
- Editor visual de mapa com terrenos:
  - grama, onde o player pode andar;
  - pedra, que funciona como parede;
  - portal, que teleporta em pares;
  - apagar, que remove o bloco especial e volta para grama.
- Editor de conteudo para:
  - tema da aula;
  - quantidade de NPCs;
  - nome, fala e desafio de cada NPC;
  - nome e posicao do boss;
  - quantidade de perguntas do boss;
  - alternativas e resposta correta.
- Presets prontos com preview visual do mapa.
- Presets personalizados editaveis.
- Banco local usando `localStorage` para salvar aulas criadas pelo usuario.

## Como Rodar

Como o projeto e estatico, basta abrir o `index.html` no navegador.

Para rodar com servidor local:

```bash
python -m http.server 5500
```

Depois acesse:

```txt
http://127.0.0.1:5500/index.html
```

## Estrutura

```txt
.
|-- index.html
|-- styles.css
|-- game.js
`-- README.md
```

- `index.html`: estrutura das telas, modais e editores.
- `styles.css`: layout, mapa, editor visual, modais e animacoes.
- `game.js`: regras do jogo, editor, presets, banco local e persistencia.

## Como Usar

1. Abra a aba `Presets`.
2. Escolha um preset pronto ou crie uma copia editavel.
3. Va para `Mestre`.
4. Em `Conteudo e Quiz`, edite NPCs, falas, desafios e perguntas.
5. Em `Mapa`, desenhe o mapa e posicione player, NPCs e boss.
6. Salve como aula no banco local ou como preset personalizado.
7. Volte para `Jogo` e teste a experiencia.

## Persistencia

O projeto usa `localStorage`, entao os dados ficam salvos no navegador usado. Existem tres tipos de dados:

- rascunho atual da aula;
- aulas salvas no banco local;
- presets personalizados.

Os presets padrao ficam no codigo e nao sao alterados. Para editar um preset padrao, use `Editar copia`, que cria uma versao personalizada.

## Regras dos Portais

Portais funcionam em pares. Se houver um numero impar de portais no mapa, o app mostra um aviso pedindo para adicionar outro portal ou remover o portal solto.

Durante o jogo, ao pisar em um portal, o player e teleportado para o portal par.

## Proximos Passos

- Exportar/importar aulas como arquivo JSON.
- Adicionar sprites ou imagens personalizadas para player, NPCs e boss.
- Criar sistema de inventario ou recompensas.
- Separar o JavaScript em modulos.
- Trocar `localStorage` por IndexedDB ou backend real quando o projeto crescer.

## Licenca

Projeto em desenvolvimento para estudo e experimentacao.
