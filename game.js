const maxNpcCount = 6;
const maxQuestionCount = 10;
const mapLimits = { min: 6, max: 16 };
const terrainTypes = ["grass", "stone", "portal"];
const draftStorageKey = "studyRpgContent";
const savedLessonsStorageKey = "studyRpgSavedLessons";
const customPresetsStorageKey = "studyRpgCustomPresets";

const fallbackNpcPositions = [
  { x: 6, y: 2 },
  { x: 2, y: 5 },
  { x: 8, y: 7 },
  { x: 4, y: 8 },
  { x: 8, y: 4 },
  { x: 5, y: 6 }
];

const defaultContent = {
  topic: "Introducao a HTML",
  map: {
    width: 11,
    height: 11,
    playerStart: { x: 2, y: 2 },
    boss: { name: "Guardiao das Tags", x: 7, y: 9 },
    tiles: makeTiles(11, 11, [
      ...makeBorderPoints(11, 11),
      { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
      { x: 3, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
      { x: 3, y: 6 }, { x: 5, y: 7 }, { x: 6, y: 7 }
    ])
  },
  npcs: [
    makeNpc("Guia", "HTML e a estrutura da pagina. Use tags como header, main, section e footer para organizar o conteudo.", 6, 2, "Qual tag costuma representar o conteudo principal da pagina?", ["main", "aside", "span"], 0),
    makeNpc("Ferreiro", "Tags semanticas ajudam pessoas, navegadores e leitores de tela a entenderem cada parte da pagina.", 2, 5, "Por que usar tags semanticas?", ["Para organizar significado e acessibilidade", "Para apagar o CSS", "Para bloquear links"], 0),
    makeNpc("Alquimista", "A tag a cria links, img exibe imagens, e button representa acoes clicaveis dentro da interface.", 8, 7, "Qual tag e mais indicada para criar um link?", ["button", "a", "section"], 1)
  ],
  questions: [
    { question: "Qual tag costuma representar o conteudo principal da pagina?", options: ["main", "aside", "span"], answer: 0 },
    { question: "Qual tag e mais indicada para criar um link?", options: ["button", "a", "section"], answer: 1 },
    { question: "Por que usar tags semanticas?", options: ["Para deixar o CSS impossivel", "Para organizar significado e acessibilidade", "Para remover o JavaScript"], answer: 1 }
  ]
};

const presets = [
  defaultContent,
  {
    topic: "Fundamentos de CSS",
    map: {
      width: 12,
      height: 10,
      playerStart: { x: 1, y: 1 },
      boss: { name: "Cascata Sombria", x: 10, y: 8 },
      tiles: makeTiles(12, 10, [
        ...makeBorderPoints(12, 10),
        { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
        { x: 7, y: 2 }, { x: 8, y: 2 }, { x: 6, y: 5 }, { x: 6, y: 6 },
        { x: 8, y: 6 }, { x: 9, y: 6 }
      ], [{ x: 10, y: 1 }, { x: 1, y: 8 }])
    },
    npcs: [
      makeNpc("Pintora", "Seletores escolhem quais elementos recebem estilos. Classes comecam com ponto, como .card.", 5, 1, "Qual seletor aponta para uma classe chamada card?", [".card", "#card", "card()"], 0),
      makeNpc("Arquiteto", "Box model soma conteudo, padding, borda e margem para definir o espaco de cada elemento.", 2, 6, "Qual propriedade cria espaco interno?", ["margin", "padding", "display"], 1),
      makeNpc("Tecela", "Flexbox organiza elementos em uma direcao principal e ajuda a alinhar itens com rapidez.", 9, 4, "Qual propriedade liga o flexbox?", ["display: flex", "position: flex", "grid: flex"], 0)
    ],
    questions: [
      { question: "Qual seletor aponta para uma classe chamada card?", options: [".card", "#card", "card()"], answer: 0 },
      { question: "Qual propriedade cria espaco interno?", options: ["margin", "padding", "display"], answer: 1 },
      { question: "Qual propriedade liga o flexbox?", options: ["display: flex", "position: flex", "grid: flex"], answer: 0 }
    ]
  },
  {
    topic: "Logica de JavaScript",
    map: {
      width: 13,
      height: 11,
      playerStart: { x: 1, y: 9 },
      boss: { name: "Bug Final", x: 11, y: 1 },
      tiles: makeTiles(13, 11, [
        ...makeBorderPoints(13, 11),
        { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 },
        { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 9, y: 8 }, { x: 10, y: 8 }
      ], [{ x: 6, y: 1 }, { x: 11, y: 9 }])
    },
    npcs: [
      makeNpc("Mentora", "Variaveis guardam valores. Use let quando o valor pode mudar e const quando a referencia nao muda.", 3, 9, "Qual palavra cria uma variavel que pode mudar?", ["const", "let", "return"], 1),
      makeNpc("Sentinela", "Condicionais como if executam caminhos diferentes conforme uma expressao verdadeira ou falsa.", 6, 6, "Qual estrutura testa uma condicao?", ["if", "for", "push"], 0),
      makeNpc("Oraculo", "Arrays guardam listas. O metodo push adiciona um novo item ao final da lista.", 10, 4, "Qual metodo adiciona item ao final de um array?", ["map", "push", "trim"], 1),
      makeNpc("Guardia", "Funcoes agrupam instrucoes reutilizaveis e podem receber parametros.", 4, 2, "O que uma funcao ajuda a fazer?", ["Reutilizar instrucoes", "Apagar o HTML", "Trocar o navegador"], 0)
    ],
    questions: [
      { question: "Qual palavra cria uma variavel que pode mudar?", options: ["const", "let", "return"], answer: 1 },
      { question: "Qual estrutura testa uma condicao?", options: ["if", "for", "push"], answer: 0 },
      { question: "Qual metodo adiciona item ao final de um array?", options: ["map", "push", "trim"], answer: 1 }
    ]
  }
];

const state = {
  player: { x: 0, y: 0 },
  learnedNpcIds: new Set(),
  completedChallengeIds: new Set(),
  quizIndex: 0,
  quizMode: "boss",
  pendingNpcId: null,
  selectedTerrain: "grass",
  positionPick: null,
  teleportCooldown: null,
  content: loadContent()
};

state.player = { ...state.content.map.playerStart };

const elements = {
  map: document.querySelector("#map"),
  themeTitle: document.querySelector("#themeTitle"),
  learnedCount: document.querySelector("#learnedCount"),
  npcTotal: document.querySelector("#npcTotal"),
  bossStatus: document.querySelector("#bossStatus"),
  message: document.querySelector("#message"),
  dialogue: document.querySelector("#dialogue"),
  topicInput: document.querySelector("#topicInput"),
  mapWidthInput: document.querySelector("#mapWidthInput"),
  mapHeightInput: document.querySelector("#mapHeightInput"),
  pickPlayerPosition: document.querySelector("#pickPlayerPosition"),
  playerPositionPreview: document.querySelector("#playerPositionPreview"),
  bossNameInput: document.querySelector("#bossNameInput"),
  pickBossPosition: document.querySelector("#pickBossPosition"),
  bossPositionPreview: document.querySelector("#bossPositionPreview"),
  npcCountInput: document.querySelector("#npcCountInput"),
  npcEditorList: document.querySelector("#npcEditorList"),
  questionCountInput: document.querySelector("#questionCountInput"),
  questionEditorList: document.querySelector("#questionEditorList"),
  saveContent: document.querySelector("#saveContent"),
  saveMapContent: document.querySelector("#saveMapContent"),
  resetContent: document.querySelector("#resetContent"),
  fillGrass: document.querySelector("#fillGrass"),
  terrainEditorMap: document.querySelector("#terrainEditorMap"),
  terrainTools: document.querySelectorAll("[data-terrain]"),
  savedLessonName: document.querySelector("#savedLessonName"),
  saveLessonToDb: document.querySelector("#saveLessonToDb"),
  clearLessonDraft: document.querySelector("#clearLessonDraft"),
  savedLessonList: document.querySelector("#savedLessonList"),
  customPresetName: document.querySelector("#customPresetName"),
  saveCustomPreset: document.querySelector("#saveCustomPreset"),
  useCurrentAsPresetName: document.querySelector("#useCurrentAsPresetName"),
  presetList: document.querySelector("#presetList"),
  quizModal: document.querySelector("#quizModal"),
  quizTitle: document.querySelector("#quizTitle"),
  quizQuestion: document.querySelector("#quizQuestion"),
  quizOptions: document.querySelector("#quizOptions"),
  closeQuiz: document.querySelector("#closeQuiz"),
  npcModal: document.querySelector("#npcModal"),
  npcModalTitle: document.querySelector("#npcModalTitle"),
  npcModalText: document.querySelector("#npcModalText"),
  closeNpcModal: document.querySelector("#closeNpcModal"),
  portalModal: document.querySelector("#portalModal"),
  continuePortal: document.querySelector("#continuePortal"),
  removeLoosePortal: document.querySelector("#removeLoosePortal"),
  victoryOverlay: document.querySelector("#victoryOverlay"),
  victoryTitle: document.querySelector("#victoryTitle"),
  victoryText: document.querySelector("#victoryText"),
  positionModal: document.querySelector("#positionModal"),
  positionTitle: document.querySelector("#positionTitle"),
  positionHelp: document.querySelector("#positionHelp"),
  positionPickerMap: document.querySelector("#positionPickerMap"),
  positionSelection: document.querySelector("#positionSelection"),
  confirmPosition: document.querySelector("#confirmPosition"),
  cancelPosition: document.querySelector("#cancelPosition"),
  navButtons: document.querySelectorAll("[data-page-target]"),
  pages: document.querySelectorAll(".page-view"),
  masterTabs: document.querySelectorAll("[data-master-tab]"),
  masterPanels: document.querySelectorAll(".master-panel")
};

function makeNpc(name, text, x, y, question, options, answer) {
  return { name, text, x, y, challenge: { question, options, answer } };
}

function makeTiles(width, height, stonePoints = [], portalPoints = []) {
  const tiles = Array.from({ length: width * height }, () => "grass");
  stonePoints.forEach((point) => setTileInArray(tiles, width, height, point.x, point.y, "stone"));
  portalPoints.forEach((point) => setTileInArray(tiles, width, height, point.x, point.y, "portal"));
  return tiles;
}

function makeBorderPoints(width, height) {
  const points = [];
  for (let x = 0; x < width; x += 1) points.push({ x, y: 0 }, { x, y: height - 1 });
  for (let y = 1; y < height - 1; y += 1) points.push({ x: 0, y }, { x: width - 1, y });
  return points;
}

function setTileInArray(tiles, width, height, x, y, terrain) {
  if (x >= 0 && y >= 0 && x < width && y < height) tiles[y * width + x] = terrain;
}

function loadContent() {
  const saved = localStorage.getItem(draftStorageKey);
  if (!saved) return structuredClone(defaultContent);

  try {
    return normalizeContent(JSON.parse(saved));
  } catch {
    return structuredClone(defaultContent);
  }
}

function normalizeContent(content) {
  const map = normalizeMap(content.map);
  return {
    topic: content.topic || defaultContent.topic,
    map,
    npcs: normalizeNpcs(content.npcs, content.npcCount, map),
    questions: normalizeQuestions(content.questions, defaultContent.questions)
  };
}

function normalizeMap(map = {}) {
  const width = clampNumber(map.width, mapLimits.min, mapLimits.max, defaultContent.map.width);
  const height = clampNumber(map.height, mapLimits.min, mapLimits.max, defaultContent.map.height);
  const tiles = normalizeTiles(map, width, height);

  return {
    width,
    height,
    playerStart: clampPoint(map.playerStart || defaultContent.map.playerStart, width, height),
    boss: {
      name: map.boss?.name || map.bossName || defaultContent.map.boss.name,
      ...clampPoint(map.boss || defaultContent.map.boss, width, height)
    },
    tiles
  };
}

function normalizeTiles(map, width, height) {
  if (Array.isArray(map.tiles)) {
    return Array.from({ length: width * height }, (_, index) => terrainTypes.includes(map.tiles[index]) ? map.tiles[index] : "grass");
  }

  return makeTiles(width, height, Array.isArray(map.obstacles) ? map.obstacles : defaultContent.map.tiles
    .map((terrain, index) => terrain === "stone" ? { x: index % defaultContent.map.width, y: Math.floor(index / defaultContent.map.width) } : null)
    .filter(Boolean));
}

function normalizeNpcs(npcs, npcCount, map) {
  const list = Array.isArray(npcs) ? npcs : [];
  const count = clampNpcCount(npcCount || list.length || defaultContent.npcs.length);

  return Array.from({ length: count }, (_, index) => {
    const fallback = defaultContent.npcs[index] || {};
    const fallbackPosition = fallbackNpcPositions[index] || { x: 1, y: 1 };
    const npc = list[index] || fallback;

    return {
      name: npc.name || `NPC ${index + 1}`,
      text: npc.text || "Estude este conceito antes do boss.",
      ...clampPoint({ x: npc.x ?? fallback.x ?? fallbackPosition.x, y: npc.y ?? fallback.y ?? fallbackPosition.y }, map.width, map.height),
      challenge: normalizeQuestion(npc.challenge || fallback.challenge || defaultChallenge(index), defaultChallenge(index))
    };
  });
}

function normalizeQuestions(questions, fallbackQuestions) {
  const list = Array.isArray(questions) ? questions : [];
  const valid = list.map((item, index) => normalizeQuestion(item, fallbackQuestions[index])).filter(Boolean);
  return valid.length > 0 ? valid.slice(0, maxQuestionCount) : structuredClone(fallbackQuestions);
}

function normalizeQuestion(item, fallback) {
  const base = fallback || { question: "Qual alternativa esta correta?", options: ["A correta", "A incorreta"], answer: 0 };
  if (!item || !item.question || !Array.isArray(item.options) || item.options.length < 2) return structuredClone(base);

  const options = item.options.slice(0, 4).map((option) => String(option || "").trim()).filter(Boolean);
  if (options.length < 2) return structuredClone(base);

  return {
    question: item.question,
    options,
    answer: Number.isInteger(item.answer) && item.answer >= 0 && item.answer < options.length ? item.answer : 0
  };
}

function defaultChallenge(index) {
  return {
    question: `Qual foi a ideia principal do NPC ${index + 1}?`,
    options: ["A explicacao anterior", "Um assunto aleatorio", "Pular o estudo"],
    answer: 0
  };
}

function clampNpcCount(value) {
  return clampNumber(value, 1, maxNpcCount, defaultContent.npcs.length);
}

function clampQuestionCount(value) {
  return clampNumber(value, 1, maxQuestionCount, defaultContent.questions.length);
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function clampPoint(point, width, height) {
  return {
    x: clampNumber(point.x, 0, width - 1, 1),
    y: clampNumber(point.y, 0, height - 1, 1)
  };
}

function render() {
  elements.themeTitle.textContent = state.content.topic;
  elements.learnedCount.textContent = state.learnedNpcIds.size;
  elements.npcTotal.textContent = state.content.npcs.length;
  elements.bossStatus.textContent = canFightBoss() ? `${state.content.map.boss.name} liberado` : `${state.content.map.boss.name} bloqueado`;

  renderGameMap();
  renderEditor();
  renderTerrainEditor();
  renderSavedLessons();
  renderPresets();
}

function renderGameMap() {
  const { width, height } = state.content.map;
  setupGrid(elements.map, width, height);
  elements.map.innerHTML = "";

  forEachTile((x, y) => {
    const tile = document.createElement("div");
    tile.className = `tile ${getTerrain(x, y)}`;
    const npcIndex = state.content.npcs.findIndex((npc) => npc.x === x && npc.y === y);
    const isPlayer = state.player.x === x && state.player.y === y;
    const isBoss = state.content.map.boss.x === x && state.content.map.boss.y === y;

    if (npcIndex >= 0) tile.appendChild(createSprite("npc", state.content.npcs[npcIndex].name[0] || "N", state.learnedNpcIds.has(npcIndex)));
    if (isBoss) tile.appendChild(createSprite("boss", state.content.map.boss.name[0] || "B"));
    if (isPlayer) tile.appendChild(createSprite("player", "P"));
    elements.map.appendChild(tile);
  });
}

function setupGrid(container, width, height) {
  container.style.gridTemplateColumns = `repeat(${width}, minmax(24px, 1fr))`;
  container.style.gridTemplateRows = `repeat(${height}, minmax(24px, 1fr))`;
  container.style.aspectRatio = `${width} / ${height}`;
}

function forEachTile(callback) {
  for (let y = 0; y < state.content.map.height; y += 1) {
    for (let x = 0; x < state.content.map.width; x += 1) callback(x, y);
  }
}

function getTerrain(x, y) {
  return state.content.map.tiles[y * state.content.map.width + x] || "grass";
}

function setTerrain(x, y, terrain) {
  state.content.map.tiles[y * state.content.map.width + x] = terrain;
}

function createSprite(type, label, learned = false) {
  const sprite = document.createElement("span");
  sprite.className = `sprite ${type}${learned ? " learned" : ""}`;
  sprite.textContent = label.toUpperCase();
  return sprite;
}

function renderEditor() {
  elements.topicInput.value = state.content.topic;
  elements.mapWidthInput.value = state.content.map.width;
  elements.mapHeightInput.value = state.content.map.height;
  elements.bossNameInput.value = state.content.map.boss.name;
  elements.playerPositionPreview.textContent = `Player em X ${state.content.map.playerStart.x}, Y ${state.content.map.playerStart.y}`;
  elements.bossPositionPreview.textContent = `${state.content.map.boss.name} em X ${state.content.map.boss.x}, Y ${state.content.map.boss.y}`;
  renderNpcCountOptions();
  renderNpcEditorList(state.content.npcs);
  renderQuestionCountOptions();
  renderQuestionEditorList(state.content.questions);
}

function renderNpcCountOptions() {
  renderCountOptions(elements.npcCountInput, maxNpcCount, state.content.npcs.length, "NPC");
}

function renderQuestionCountOptions() {
  renderCountOptions(elements.questionCountInput, maxQuestionCount, state.content.questions.length, "pergunta");
}

function renderCountOptions(select, max, selected, label) {
  if (select.children.length !== max) {
    select.innerHTML = "";
    for (let count = 1; count <= max; count += 1) {
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent = `${count} ${label}${count > 1 ? "s" : ""}`;
      select.appendChild(option);
    }
  }
  select.value = String(selected);
}

function renderNpcEditorList(npcs, preserveCurrentValues = false) {
  const count = clampNpcCount(elements.npcCountInput.value || npcs.length);
  const currentNpcs = preserveCurrentValues ? mergeNpcEditorValues(npcs) : npcs;
  elements.npcEditorList.innerHTML = "";

  Array.from({ length: count }, (_, index) => {
    const npc = currentNpcs[index] || defaultContent.npcs[index] || makeNpc(`NPC ${index + 1}`, "Estude este conceito antes do boss.", 1, 1, "Qual alternativa esta correta?", ["A correta", "A incorreta"], 0);
    const card = document.createElement("section");
    card.className = "npc-editor-card";
    card.dataset.npcCard = index;
    card.innerHTML = `
      <div class="position-row">
        <h3>NPC ${index + 1}</h3>
        <button type="button" class="ghost" data-pick-npc="${index}">Selecionar no mapa</button>
      </div>
      <p class="position-preview" data-npc-position="${index}">X ${npc.x}, Y ${npc.y}</p>
      <input type="hidden" data-npc-x="${index}" value="${npc.x}">
      <input type="hidden" data-npc-y="${index}" value="${npc.y}">
      <label>Nome<input type="text" data-npc-name="${index}"></label>
      <label>Conteudo da fala<textarea rows="4" data-npc-text="${index}"></textarea></label>
      <label>Desafio para liberar o proximo NPC<input type="text" data-challenge-question="${index}"></label>
      <div class="option-grid">
        <label>Alternativa 1<input type="text" data-challenge-option="${index}" data-option-index="0"></label>
        <label>Correta?<input type="radio" name="challenge-${index}" data-challenge-correct="${index}" value="0"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 2<input type="text" data-challenge-option="${index}" data-option-index="1"></label>
        <label>Correta?<input type="radio" name="challenge-${index}" data-challenge-correct="${index}" value="1"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 3<input type="text" data-challenge-option="${index}" data-option-index="2"></label>
        <label>Correta?<input type="radio" name="challenge-${index}" data-challenge-correct="${index}" value="2"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 4<input type="text" data-challenge-option="${index}" data-option-index="3"></label>
        <label>Correta?<input type="radio" name="challenge-${index}" data-challenge-correct="${index}" value="3"></label>
      </div>
    `;

    card.querySelector("[data-npc-name]").value = npc.name;
    card.querySelector("[data-npc-text]").value = npc.text;
    card.querySelector("[data-challenge-question]").value = npc.challenge.question;
    fillOptionInputs(card, `[data-challenge-option="${index}"]`, `[data-challenge-correct="${index}"]`, npc.challenge);
    elements.npcEditorList.appendChild(card);
  });
}

function renderQuestionEditorList(questions, preserveCurrentValues = false) {
  const count = clampQuestionCount(elements.questionCountInput.value || questions.length);
  const currentQuestions = preserveCurrentValues ? mergeQuestionEditorValues(questions) : questions;
  elements.questionEditorList.innerHTML = "";

  Array.from({ length: count }, (_, index) => {
    const question = currentQuestions[index] || defaultContent.questions[index] || defaultChallenge(index);
    const card = document.createElement("section");
    card.className = "question-editor-card";
    card.innerHTML = `
      <h3>Pergunta ${index + 1}</h3>
      <label>Pergunta<input type="text" data-question-text="${index}"></label>
      <div class="option-grid">
        <label>Alternativa 1<input type="text" data-question-option="${index}" data-option-index="0"></label>
        <label>Correta?<input type="radio" name="boss-question-${index}" data-question-correct="${index}" value="0"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 2<input type="text" data-question-option="${index}" data-option-index="1"></label>
        <label>Correta?<input type="radio" name="boss-question-${index}" data-question-correct="${index}" value="1"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 3<input type="text" data-question-option="${index}" data-option-index="2"></label>
        <label>Correta?<input type="radio" name="boss-question-${index}" data-question-correct="${index}" value="2"></label>
      </div>
      <div class="option-grid">
        <label>Alternativa 4<input type="text" data-question-option="${index}" data-option-index="3"></label>
        <label>Correta?<input type="radio" name="boss-question-${index}" data-question-correct="${index}" value="3"></label>
      </div>
    `;

    card.querySelector("[data-question-text]").value = question.question;
    fillOptionInputs(card, `[data-question-option="${index}"]`, `[data-question-correct="${index}"]`, question);
    elements.questionEditorList.appendChild(card);
  });
}

function fillOptionInputs(card, optionSelector, correctSelector, question) {
  [...card.querySelectorAll(optionSelector)].forEach((input) => {
    input.value = question.options[Number(input.dataset.optionIndex)] || "";
  });
  const correct = card.querySelector(`${correctSelector}[value="${question.answer}"]`);
  if (correct) correct.checked = true;
}

function renderTerrainEditor() {
  const { width, height } = state.content.map;
  setupGrid(elements.terrainEditorMap, width, height);
  elements.terrainEditorMap.innerHTML = "";

  forEachTile((x, y) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `editor-tile ${getTerrain(x, y)}`;
    tile.dataset.x = x;
    tile.dataset.y = y;
    addMarkers(tile, x, y);
    elements.terrainEditorMap.appendChild(tile);
  });
}

function addMarkers(tile, x, y) {
  const npcIndex = state.content.npcs.findIndex((npc) => npc.x === x && npc.y === y);
  if (state.content.map.playerStart.x === x && state.content.map.playerStart.y === y) tile.appendChild(createMarker("P", "marker-player"));
  if (state.content.map.boss.x === x && state.content.map.boss.y === y) tile.appendChild(createMarker("B", "marker-boss"));
  if (npcIndex >= 0) tile.appendChild(createMarker(String(npcIndex + 1), "marker-npc"));
}

function createMarker(text, className) {
  const marker = document.createElement("span");
  marker.className = `tile-marker ${className}`;
  marker.textContent = text;
  return marker;
}

function renderPresets() {
  elements.presetList.innerHTML = "";
  const allPresets = [
    ...presets.map((preset, index) => ({ id: `factory-${index}`, name: preset.topic, content: preset, type: "factory" })),
    ...loadCustomPresets().map((preset) => ({ ...preset, type: "custom" }))
  ];

  allPresets.forEach((preset) => {
    const card = document.createElement("section");
    card.className = "preset-card";
    const isCustom = preset.type === "custom";
    card.innerHTML = `
      <h3>${preset.name}</h3>
      <div class="preset-preview" aria-label="Previa do mapa ${preset.name}"></div>
      <p>${preset.content.npcs.length} NPCs, mapa ${preset.content.map.width}x${preset.content.map.height}, ${preset.content.questions.length} perguntas de boss. ${isCustom ? "Editavel" : "Padrao"}</p>
      <div class="saved-lesson-actions">
        <button type="button" data-preset-id="${preset.id}">${isCustom ? "Carregar" : "Usar preset"}</button>
        ${isCustom ? `<button type="button" class="ghost" data-edit-preset="${preset.id}">Editar</button><button type="button" class="ghost" data-copy-preset="${preset.id}">Duplicar</button><button type="button" class="ghost" data-delete-preset="${preset.id}">Excluir</button>` : `<button type="button" class="ghost" data-fork-preset="${preset.id}">Editar copia</button>`}
      </div>
    `;
    elements.presetList.appendChild(card);
    renderPresetPreview(card.querySelector(".preset-preview"), preset.content);
  });
}

function renderPresetPreview(container, preset) {
  container.style.gridTemplateColumns = `repeat(${preset.map.width}, 1fr)`;
  preset.map.tiles.forEach((terrain) => {
    const tile = document.createElement("span");
    tile.className = `preview-tile ${terrain}`;
    container.appendChild(tile);
  });
}

function renderSavedLessons() {
  const lessons = loadSavedLessons();
  elements.savedLessonList.innerHTML = "";

  if (lessons.length === 0) {
    const empty = document.createElement("p");
    empty.className = "position-preview";
    empty.textContent = "Nenhuma aula salva ainda.";
    elements.savedLessonList.appendChild(empty);
    return;
  }

  lessons.forEach((lesson) => {
    const card = document.createElement("section");
    card.className = "saved-lesson-card";
    const content = document.createElement("div");
    const title = document.createElement("h3");
    const details = document.createElement("p");
    const actions = document.createElement("div");
    const loadButton = document.createElement("button");
    const copyButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    title.textContent = lesson.name;
    details.textContent = `${lesson.content.npcs.length} NPCs, ${lesson.content.questions.length} perguntas, atualizado em ${formatDate(lesson.updatedAt)}`;
    actions.className = "saved-lesson-actions";
    loadButton.type = "button";
    loadButton.dataset.loadLesson = lesson.id;
    loadButton.textContent = "Carregar";
    copyButton.type = "button";
    copyButton.className = "ghost";
    copyButton.dataset.copyLesson = lesson.id;
    copyButton.textContent = "Duplicar";
    deleteButton.type = "button";
    deleteButton.className = "ghost";
    deleteButton.dataset.deleteLesson = lesson.id;
    deleteButton.textContent = "Excluir";

    content.append(title, details);
    actions.append(loadButton, copyButton, deleteButton);
    card.append(content, actions);
    elements.savedLessonList.appendChild(card);
  });
}

function mergeNpcEditorValues(fallbackNpcs) {
  const values = readNpcsFromEditor();
  return values.length > 0 ? values : fallbackNpcs;
}

function mergeQuestionEditorValues(fallbackQuestions) {
  const values = readQuestionsFromEditor();
  return values.length > 0 ? values : fallbackQuestions;
}

function movePlayer(direction) {
  const movement = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }[direction];
  if (!movement || !elements.quizModal.classList.contains("hidden")) return;

  const next = { x: state.player.x + movement.x, y: state.player.y + movement.y };
  if (!canWalk(next.x, next.y)) {
    setMessage("Um obstaculo bloqueia o caminho.");
    return;
  }

  state.player = next;
  renderGameMap();
  checkInteraction();
  state.teleportCooldown = null;
}

function canWalk(x, y) {
  const { width, height } = state.content.map;
  return x >= 0 && y >= 0 && x < width && y < height && getTerrain(x, y) !== "stone";
}

function checkInteraction() {
  const npcIndex = state.content.npcs.findIndex((npc) => npc.x === state.player.x && npc.y === state.player.y);
  if (npcIndex >= 0) {
    tryTalkToNpc(npcIndex);
    return;
  }

  if (state.player.x === state.content.map.boss.x && state.player.y === state.content.map.boss.y) {
    startBossFight();
    return;
  }

  if (getTerrain(state.player.x, state.player.y) === "portal") {
    teleportFromPortal();
    return;
  }

  setMessage("Explore o mapa, encontre os NPCs e colete conhecimento.");
}

function teleportFromPortal() {
  const portals = getPortalPoints();
  const currentIndex = portals.findIndex((point) => point.x === state.player.x && point.y === state.player.y);

  if (currentIndex < 0) return;
  if (state.teleportCooldown === `${state.player.x},${state.player.y}`) return;

  const pairIndex = currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
  const destination = portals[pairIndex];

  if (!destination) {
    setMessage("Este portal esta sem par. Complete a dupla no editor do mestre.");
    return;
  }

  state.teleportCooldown = `${destination.x},${destination.y}`;
  state.player = { ...destination };
  setMessage("O portal brilhou e voce apareceu em outro ponto do mapa.");
  renderGameMap();
}

function getPortalPoints() {
  const portals = [];
  forEachTile((x, y) => {
    if (getTerrain(x, y) === "portal") portals.push({ x, y });
  });
  return portals;
}

function tryTalkToNpc(id) {
  if (id > 0 && !state.learnedNpcIds.has(id - 1)) {
    setMessage("Fale com o NPC anterior antes de avancar nesta aula.");
    return;
  }

  if (id > 0 && !state.completedChallengeIds.has(id - 1)) {
    state.pendingNpcId = id;
    openChallenge(id - 1);
    return;
  }

  talkToNpc(id);
}

function talkToNpc(id) {
  const npc = state.content.npcs[id];
  state.learnedNpcIds.add(id);
  elements.learnedCount.textContent = state.learnedNpcIds.size;
  elements.bossStatus.textContent = canFightBoss() ? `${state.content.map.boss.name} liberado` : `${state.content.map.boss.name} bloqueado`;
  setMessage(`${npc.name} compartilhou uma explicacao.`);
  openNpcModal(npc);
  renderGameMap();
}

function openNpcModal(npc) {
  elements.npcModalTitle.textContent = npc.name;
  elements.npcModalText.textContent = npc.text;
  elements.npcModal.classList.remove("hidden");
}

function canFightBoss() {
  return state.learnedNpcIds.size >= state.content.npcs.length;
}

function startBossFight() {
  if (!canFightBoss()) {
    setMessage(`${state.content.map.boss.name} ainda e forte demais. Fale com todos os NPCs primeiro.`);
    return;
  }

  state.quizMode = "boss";
  state.quizIndex = 0;
  openQuiz(`Desafio: ${state.content.map.boss.name}`, state.content.questions[0]);
}

function openChallenge(previousNpcId) {
  state.quizMode = "challenge";
  state.quizIndex = previousNpcId;
  openQuiz("Desafio de fixacao", state.content.npcs[previousNpcId].challenge);
}

function openQuiz(title, question) {
  elements.quizTitle.textContent = title;
  elements.quizModal.classList.remove("hidden");
  showQuestion(question);
}

function showQuestion(current) {
  elements.quizQuestion.textContent = current.question;
  elements.quizOptions.innerHTML = "";

  shuffleOptions(current.options).forEach(({ option, originalIndex }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.dataset.answerIndex = originalIndex;
    button.addEventListener("click", () => answerQuestion(originalIndex));
    elements.quizOptions.appendChild(button);
  });
}

function shuffleOptions(options) {
  const shuffled = options.map((option, originalIndex) => ({ option, originalIndex }));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function answerQuestion(index) {
  const current = state.quizMode === "boss" ? state.content.questions[state.quizIndex] : state.content.npcs[state.quizIndex].challenge;
  const buttons = [...elements.quizOptions.querySelectorAll("button")];
  const isCorrect = index === current.answer;

  if (!isCorrect && state.quizMode === "boss") {
    buttons.forEach((button) => {
      button.disabled = true;
      if (Number(button.dataset.answerIndex) === index) button.classList.add("wrong");
    });

    window.setTimeout(() => {
      state.quizIndex = 0;
      setMessage(`Resposta errada. ${state.content.map.boss.name} se recuperou e o desafio reiniciou.`);
      closeQuiz();
    }, 650);
    return;
  }

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    const answerIndex = Number(button.dataset.answerIndex);
    if (answerIndex === current.answer) button.classList.add("correct");
    if (answerIndex === index && !isCorrect) button.classList.add("wrong");
  });

  window.setTimeout(() => {
    if (!isCorrect) {
      setMessage(state.quizMode === "boss" ? "Voce errou uma pergunta do boss. Revise e tente de novo." : "Quase. Revise a fala anterior e tente liberar o proximo NPC de novo.");
      closeQuiz();
      return;
    }

    if (state.quizMode === "challenge") {
      state.completedChallengeIds.add(state.quizIndex);
      const pendingNpcId = state.pendingNpcId;
      state.pendingNpcId = null;
      closeQuiz();
      talkToNpc(pendingNpcId);
      return;
    }

    state.quizIndex += 1;
    if (state.quizIndex >= state.content.questions.length) {
      celebrateVictory();
      closeQuiz();
      return;
    }

    showQuestion(state.content.questions[state.quizIndex]);
  }, 850);
}

function celebrateVictory() {
  setMessage(`${state.content.map.boss.name} derrotado! Voce dominou: ${state.content.topic}.`);
  elements.victoryTitle.textContent = `${state.content.map.boss.name} derrotado!`;
  elements.victoryText.textContent = `Voce concluiu ${state.content.topic}. Hora de salvar esse XP mental.`;
  elements.victoryOverlay.classList.remove("hidden");
  elements.victoryOverlay.querySelectorAll(".confetti").forEach((piece) => piece.remove());

  const colors = ["#79a8ff", "#76d977", "#f0d66b", "#ef6b73", "#8e7dff"];
  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 700}ms`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    elements.victoryOverlay.appendChild(piece);
  }

  window.setTimeout(() => {
    elements.victoryOverlay.classList.add("hidden");
  }, 4200);
}

function closeQuiz() {
  elements.quizModal.classList.add("hidden");
}

function saveContentFromEditor() {
  if (!validatePortalPairs()) return;

  const nextContent = collectContentFromEditor();
  applyContent(nextContent, "Conteudo salvo. O mapa reiniciou para voce estudar o novo tema.");
}

function saveMapFromEditor() {
  if (!validatePortalPairs()) return;

  const currentNpcs = readNpcsFromEditor();
  const currentQuestions = readQuestionsFromEditor();
  const nextContent = normalizeContent({
    topic: elements.topicInput.value.trim() || state.content.topic,
    map: readMapFromEditor(),
    npcCount: currentNpcs.length,
    npcs: currentNpcs,
    questions: currentQuestions
  });
  applyContent(nextContent, "Mapa salvo. O jogo reiniciou na nova configuracao.");
}

function resizeMapInEditor() {
  state.content.map = readMapFromEditor();
  state.content.npcs = readNpcsFromEditor();
  state.player = clampPoint(state.player, state.content.map.width, state.content.map.height);
  elements.playerPositionPreview.textContent = `Player em X ${state.content.map.playerStart.x}, Y ${state.content.map.playerStart.y}`;
  elements.bossPositionPreview.textContent = `${elements.bossNameInput.value || state.content.map.boss.name} em X ${state.content.map.boss.x}, Y ${state.content.map.boss.y}`;
  renderTerrainEditor();
  renderGameMap();
}

function readMapFromEditor() {
  const width = clampNumber(elements.mapWidthInput.value, mapLimits.min, mapLimits.max, state.content.map.width);
  const height = clampNumber(elements.mapHeightInput.value, mapLimits.min, mapLimits.max, state.content.map.height);
  return resizeMap({
    width,
    height,
    playerStart: state.content.map.playerStart,
    boss: { name: elements.bossNameInput.value.trim() || state.content.map.boss.name, x: state.content.map.boss.x, y: state.content.map.boss.y },
    tiles: state.content.map.tiles
  }, width, height);
}

function collectContentFromEditor() {
  return normalizeContent({
    topic: elements.topicInput.value.trim(),
    map: readMapFromEditor(),
    npcCount: clampNpcCount(elements.npcCountInput.value),
    npcs: readNpcsFromEditor(),
    questions: readQuestionsFromEditor()
  });
}

function resizeMap(map, width, height) {
  const tiles = Array.from({ length: width * height }, (_, index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    return x < map.width && y < map.height ? map.tiles[y * map.width + x] || "grass" : "grass";
  });

  return {
    width,
    height,
    playerStart: clampPoint(map.playerStart, width, height),
    boss: { name: map.boss.name, ...clampPoint(map.boss, width, height) },
    tiles
  };
}

function applyContent(content, message) {
  state.content = normalizeContent(content);
  state.learnedNpcIds.clear();
  state.completedChallengeIds.clear();
  state.pendingNpcId = null;
  state.player = { ...state.content.map.playerStart };
  localStorage.setItem(draftStorageKey, JSON.stringify(state.content));
  elements.dialogue.innerHTML = "";
  setMessage(message);
  render();
}

function readNpcsFromEditor() {
  return [...elements.npcEditorList.querySelectorAll(".npc-editor-card")].map((card, index) => {
    const optionInputs = [...card.querySelectorAll(`[data-challenge-option="${index}"]`)];
    const options = optionInputs.map((input) => input.value.trim()).filter(Boolean);
    const checked = card.querySelector(`[data-challenge-correct="${index}"]:checked`);

    return {
      name: card.querySelector("[data-npc-name]").value.trim() || `NPC ${index + 1}`,
      text: card.querySelector("[data-npc-text]").value.trim() || "Estude este conceito antes do boss.",
      ...clampPoint({ x: card.querySelector("[data-npc-x]").value, y: card.querySelector("[data-npc-y]").value }, state.content.map.width, state.content.map.height),
      challenge: normalizeQuestion({
        question: card.querySelector("[data-challenge-question]").value.trim(),
        options,
        answer: checked ? Number(checked.value) : 0
      }, defaultChallenge(index))
    };
  });
}

function readQuestionsFromEditor() {
  return [...elements.questionEditorList.querySelectorAll(".question-editor-card")].map((card, index) => {
    const options = [...card.querySelectorAll(`[data-question-option="${index}"]`)].map((input) => input.value.trim()).filter(Boolean);
    const checked = card.querySelector(`[data-question-correct="${index}"]:checked`);

    return normalizeQuestion({
      question: card.querySelector("[data-question-text]").value.trim(),
      options,
      answer: checked ? Number(checked.value) : 0
    }, defaultContent.questions[index] || defaultChallenge(index));
  });
}

function openPositionPicker(kind, index = null) {
  state.positionPick = {
    kind,
    index,
    selected: getCurrentPosition(kind, index)
  };
  elements.positionTitle.textContent = kind === "npc" ? `Selecionar posicao do NPC ${index + 1}` : kind === "boss" ? "Selecionar posicao do boss" : "Selecionar inicio do player";
  elements.positionHelp.textContent = "Clique em um bloco do mini mapa e confirme.";
  elements.positionModal.classList.remove("hidden");
  renderPositionPicker();
}

function getCurrentPosition(kind, index) {
  if (kind === "npc") {
    const card = elements.npcEditorList.querySelector(`[data-npc-card="${index}"]`);
    return {
      x: Number(card.querySelector("[data-npc-x]").value),
      y: Number(card.querySelector("[data-npc-y]").value)
    };
  }
  if (kind === "boss") return { x: state.content.map.boss.x, y: state.content.map.boss.y };
  return { ...state.content.map.playerStart };
}

function renderPositionPicker() {
  const { width, height } = state.content.map;
  setupGrid(elements.positionPickerMap, width, height);
  elements.positionPickerMap.innerHTML = "";
  elements.positionSelection.textContent = `Selecionado: X ${state.positionPick.selected.x}, Y ${state.positionPick.selected.y}`;

  forEachTile((x, y) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `picker-tile ${getTerrain(x, y)}${state.positionPick.selected.x === x && state.positionPick.selected.y === y ? " selected" : ""}`;
    tile.dataset.x = x;
    tile.dataset.y = y;
    addMarkers(tile, x, y);
    elements.positionPickerMap.appendChild(tile);
  });
}

function confirmPositionPick() {
  if (!state.positionPick) return;
  const { kind, index, selected } = state.positionPick;

  if (kind === "npc") {
    const card = elements.npcEditorList.querySelector(`[data-npc-card="${index}"]`);
    card.querySelector("[data-npc-x]").value = selected.x;
    card.querySelector("[data-npc-y]").value = selected.y;
    card.querySelector(`[data-npc-position="${index}"]`).textContent = `X ${selected.x}, Y ${selected.y}`;
    state.content.npcs[index].x = selected.x;
    state.content.npcs[index].y = selected.y;
  }

  if (kind === "boss") {
    state.content.map.boss.x = selected.x;
    state.content.map.boss.y = selected.y;
    elements.bossPositionPreview.textContent = `${elements.bossNameInput.value || state.content.map.boss.name} em X ${selected.x}, Y ${selected.y}`;
  }

  if (kind === "player") {
    state.content.map.playerStart = selected;
    elements.playerPositionPreview.textContent = `Player em X ${selected.x}, Y ${selected.y}`;
  }

  state.positionPick = null;
  elements.positionModal.classList.add("hidden");
  renderTerrainEditor();
  renderGameMap();
}

function resetContent() {
  localStorage.removeItem(draftStorageKey);
  applyContent(defaultContent, "Exemplo restaurado.");
}

function setMessage(text) {
  elements.message.textContent = text;
}

function validatePortalPairs() {
  if (getPortalPoints().length % 2 === 0) return true;

  showPortalPrompt();
  return false;
}

function showPortalPrompt() {
  elements.portalModal.classList.remove("hidden");
}

function removeLoosePortal() {
  const portals = getPortalPoints();
  const loose = portals[portals.length - 1];
  if (loose) setTerrain(loose.x, loose.y, "grass");
  elements.portalModal.classList.add("hidden");
  renderTerrainEditor();
  renderGameMap();
}

function loadSavedLessons() {
  try {
    const parsed = JSON.parse(localStorage.getItem(savedLessonsStorageKey) || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.map((lesson) => ({
      id: lesson.id,
      name: lesson.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      content: normalizeContent(lesson.content)
    })).filter((lesson) => lesson.id && lesson.name && lesson.content);
  } catch {
    return [];
  }
}

function saveSavedLessons(lessons) {
  localStorage.setItem(savedLessonsStorageKey, JSON.stringify(lessons));
}

function loadCustomPresets() {
  try {
    const parsed = JSON.parse(localStorage.getItem(customPresetsStorageKey) || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.map((preset) => ({
      id: preset.id,
      name: preset.name,
      createdAt: preset.createdAt,
      updatedAt: preset.updatedAt,
      content: normalizeContent(preset.content)
    })).filter((preset) => preset.id && preset.name && preset.content);
  } catch {
    return [];
  }
}

function saveCustomPresets(presetsToSave) {
  localStorage.setItem(customPresetsStorageKey, JSON.stringify(presetsToSave));
}

function getPresetById(id) {
  if (id.startsWith("factory-")) {
    const index = Number(id.replace("factory-", ""));
    const preset = presets[index];
    return preset ? { id, name: preset.topic, content: preset, type: "factory" } : null;
  }

  const preset = loadCustomPresets().find((item) => item.id === id);
  return preset ? { ...preset, type: "custom" } : null;
}

function saveCurrentAsCustomPreset() {
  if (!validatePortalPairs()) return;

  const content = collectContentFromEditor();
  const name = (elements.customPresetName.value || content.topic || "Preset sem nome").trim();
  const customPresets = loadCustomPresets();
  const existing = customPresets.find((preset) => preset.name.toLowerCase() === name.toLowerCase());
  const now = new Date().toISOString();

  if (existing) {
    existing.content = content;
    existing.updatedAt = now;
  } else {
    customPresets.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name,
      content,
      createdAt: now,
      updatedAt: now
    });
  }

  saveCustomPresets(customPresets);
  elements.customPresetName.value = name;
  applyContent(content, `Preset editavel "${name}" salvo.`);
}

function loadPresetById(id, messagePrefix = "Preset carregado") {
  const preset = getPresetById(id);
  if (!preset) return;

  elements.customPresetName.value = preset.name;
  applyContent(preset.content, `${messagePrefix}: "${preset.name}".`);
  showPage("masterPage");
}

function forkFactoryPreset(id) {
  const preset = getPresetById(id);
  if (!preset) return;

  const now = new Date().toISOString();
  const name = `${preset.name} editavel`;
  const customPresets = loadCustomPresets();
  customPresets.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    content: structuredClone(preset.content),
    createdAt: now,
    updatedAt: now
  });
  saveCustomPresets(customPresets);
  elements.customPresetName.value = name;
  applyContent(preset.content, `Copia editavel criada para "${preset.name}".`);
  showPage("masterPage");
}

function copyCustomPreset(id) {
  const customPresets = loadCustomPresets();
  const preset = customPresets.find((item) => item.id === id);
  if (!preset) return;

  const now = new Date().toISOString();
  customPresets.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: `${preset.name} copia`,
    content: structuredClone(preset.content),
    createdAt: now,
    updatedAt: now
  });
  saveCustomPresets(customPresets);
  renderPresets();
}

function deleteCustomPreset(id) {
  const customPresets = loadCustomPresets();
  const preset = customPresets.find((item) => item.id === id);
  if (!preset) return;

  if (!window.confirm(`Excluir preset "${preset.name}"?`)) return;
  saveCustomPresets(customPresets.filter((item) => item.id !== id));
  renderPresets();
}

function saveCurrentLessonToDb() {
  if (!validatePortalPairs()) return;

  const content = collectContentFromEditor();
  const name = (elements.savedLessonName.value || content.topic || "Aula sem nome").trim();
  const lessons = loadSavedLessons();
  const existing = lessons.find((lesson) => lesson.name.toLowerCase() === name.toLowerCase());
  const now = new Date().toISOString();

  if (existing) {
    existing.content = content;
    existing.updatedAt = now;
  } else {
    lessons.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name,
      content,
      createdAt: now,
      updatedAt: now
    });
  }

  saveSavedLessons(lessons);
  elements.savedLessonName.value = name;
  applyContent(content, `Aula "${name}" salva no banco local.`);
}

function loadLessonFromDb(id) {
  const lesson = loadSavedLessons().find((item) => item.id === id);
  if (!lesson) return;

  elements.savedLessonName.value = lesson.name;
  applyContent(lesson.content, `Aula "${lesson.name}" carregada do banco local.`);
  showPage("masterPage");
}

function copyLessonInDb(id) {
  const lessons = loadSavedLessons();
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;

  const now = new Date().toISOString();
  lessons.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: `${lesson.name} copia`,
    content: structuredClone(lesson.content),
    createdAt: now,
    updatedAt: now
  });
  saveSavedLessons(lessons);
  renderSavedLessons();
}

function deleteLessonFromDb(id) {
  const lessons = loadSavedLessons();
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;

  if (!window.confirm(`Excluir "${lesson.name}" do banco local?`)) return;
  saveSavedLessons(lessons.filter((item) => item.id !== id));
  renderSavedLessons();
}

function formatDate(value) {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function showPage(pageId) {
  elements.pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  elements.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.pageTarget === pageId));
}

function showMasterTab(panelId) {
  elements.masterPanels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  elements.masterTabs.forEach((button) => button.classList.toggle("active", button.dataset.masterTab === panelId));
}

document.addEventListener("keydown", (event) => {
  const keyMap = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
  const direction = keyMap[event.key];
  if (direction && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
    event.preventDefault();
    movePlayer(direction);
  }
});

document.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => movePlayer(button.dataset.move)));
elements.navButtons.forEach((button) => button.addEventListener("click", () => showPage(button.dataset.pageTarget)));
elements.masterTabs.forEach((button) => button.addEventListener("click", () => showMasterTab(button.dataset.masterTab)));

elements.npcCountInput.addEventListener("change", () => renderNpcEditorList(state.content.npcs, true));
elements.questionCountInput.addEventListener("change", () => renderQuestionEditorList(state.content.questions, true));
elements.saveContent.addEventListener("click", saveContentFromEditor);
elements.saveMapContent.addEventListener("click", saveMapFromEditor);
elements.resetContent.addEventListener("click", resetContent);
elements.saveLessonToDb.addEventListener("click", saveCurrentLessonToDb);
elements.saveCustomPreset.addEventListener("click", saveCurrentAsCustomPreset);
elements.useCurrentAsPresetName.addEventListener("click", () => {
  elements.customPresetName.value = elements.topicInput.value || state.content.topic;
});
elements.clearLessonDraft.addEventListener("click", () => {
  elements.savedLessonName.value = "";
  localStorage.removeItem(draftStorageKey);
  applyContent(defaultContent, "Novo rascunho iniciado. Suas aulas salvas continuam no banco local.");
});
elements.closeQuiz.addEventListener("click", closeQuiz);
elements.closeNpcModal.addEventListener("click", () => elements.npcModal.classList.add("hidden"));
elements.continuePortal.addEventListener("click", () => {
  state.selectedTerrain = "portal";
  elements.portalModal.classList.add("hidden");
  elements.terrainTools.forEach((item) => item.classList.toggle("active", item.dataset.terrain === "portal"));
});
elements.removeLoosePortal.addEventListener("click", removeLoosePortal);
elements.pickBossPosition.addEventListener("click", () => openPositionPicker("boss"));
elements.pickPlayerPosition.addEventListener("click", () => openPositionPicker("player"));
elements.cancelPosition.addEventListener("click", () => elements.positionModal.classList.add("hidden"));
elements.confirmPosition.addEventListener("click", confirmPositionPick);
elements.fillGrass.addEventListener("click", () => {
  state.content.map.tiles = state.content.map.tiles.map(() => "grass");
  renderTerrainEditor();
});

elements.npcEditorList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-pick-npc]");
  if (button) openPositionPicker("npc", Number(button.dataset.pickNpc));
});

elements.terrainTools.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedTerrain = button.dataset.terrain;
    elements.terrainTools.forEach((item) => item.classList.toggle("active", item === button));
  });
});

elements.terrainEditorMap.addEventListener("click", (event) => {
  const tile = event.target.closest(".editor-tile");
  if (!tile) return;
  const terrain = state.selectedTerrain === "erase" ? "grass" : state.selectedTerrain;
  setTerrain(Number(tile.dataset.x), Number(tile.dataset.y), terrain);
  renderTerrainEditor();

  if (terrain === "portal" && getPortalPoints().length % 2 === 1) {
    showPortalPrompt();
  }
});

elements.positionPickerMap.addEventListener("click", (event) => {
  const tile = event.target.closest(".picker-tile");
  if (!tile || !state.positionPick) return;
  state.positionPick.selected = { x: Number(tile.dataset.x), y: Number(tile.dataset.y) };
  renderPositionPicker();
});

elements.mapWidthInput.addEventListener("change", resizeMapInEditor);
elements.mapHeightInput.addEventListener("change", resizeMapInEditor);

elements.presetList.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-preset-id]");
  const editButton = event.target.closest("[data-edit-preset]");
  const forkButton = event.target.closest("[data-fork-preset]");
  const copyButton = event.target.closest("[data-copy-preset]");
  const deleteButton = event.target.closest("[data-delete-preset]");

  if (loadButton) loadPresetById(loadButton.dataset.presetId);
  if (editButton) loadPresetById(editButton.dataset.editPreset, "Preset editavel carregado para edicao");
  if (forkButton) forkFactoryPreset(forkButton.dataset.forkPreset);
  if (copyButton) copyCustomPreset(copyButton.dataset.copyPreset);
  if (deleteButton) deleteCustomPreset(deleteButton.dataset.deletePreset);
});

elements.savedLessonList.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load-lesson]");
  const copyButton = event.target.closest("[data-copy-lesson]");
  const deleteButton = event.target.closest("[data-delete-lesson]");

  if (loadButton) loadLessonFromDb(loadButton.dataset.loadLesson);
  if (copyButton) copyLessonInDb(copyButton.dataset.copyLesson);
  if (deleteButton) deleteLessonFromDb(deleteButton.dataset.deleteLesson);
});

showMasterTab("contentEditor");
render();
