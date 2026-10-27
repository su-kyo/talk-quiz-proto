import { SUMMARY_STORAGE_KEY, SELECTED_SNACK_STORAGE_KEY, SNACK_SPRITE_FRAMES, quizData, snackOptions } from "./data.js";

// 한 번 누를 때마다 스프라이트 한 장면씩 — 마지막 장면(다 먹음)을 잠깐 보여 준 뒤 사라진다.
const SNACK_TOTAL_BITES = SNACK_SPRITE_FRAMES - 1;
const SNACK_EMPTY_HOLD_MS = 520;

let snackBitesRemaining = SNACK_TOTAL_BITES;
let snackBiteDirection = 1;

// 저장된 요약이 없을 때 quizData에서 정답 요약을 만들어 보여준다.
const fallbackSummary = quizData.map((question) => ({
  question: question.question,
  answerText: question.type === "ox" ? `정답은 ${question.answer}입니다.` : question.answer,
  hadWrongAttempt: false,
}));

function readSummary() {
  try {
    const savedSummary = JSON.parse(sessionStorage.getItem(SUMMARY_STORAGE_KEY) || "[]");
    return Array.isArray(savedSummary) && savedSummary.length ? savedSummary : fallbackSummary;
  } catch (error) {
    console.warn("[TalkQuiz:Done] summary read failed", error);
    return fallbackSummary;
  }
}

function createResultCard(summary) {
  const card = document.createElement("article");
  card.className = "done-card";
  card.classList.toggle("had-wrong", Boolean(summary.hadWrongAttempt));

  if (!summary.hadWrongAttempt) {
    const icon = document.createElement("img");
    icon.className = "done-thumb";
    icon.src = "./icon_thumbsup.svg";
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    card.append(icon);
  }

  card.append(
    createCardRow("Q", summary.question, "question-row", "done-question"),
    createCardRow("A", summary.answerText, "answer-row", "done-answer"),
  );
  return card;
}

function createCardRow(label, text, rowClassName, textClassName) {
  const row = document.createElement("div");
  row.className = `done-card-row ${rowClassName}`;

  const badge = document.createElement("span");
  badge.className = "done-card-badge";
  badge.textContent = label;
  badge.setAttribute("aria-hidden", "true");

  const content = document.createElement("p");
  content.className = `done-card-text ${textClassName}`;
  content.textContent = text;

  row.append(badge, content);
  return row;
}

function renderSummary() {
  const doneCards = document.querySelector("#doneCards");
  doneCards.innerHTML = "";
  readSummary().forEach((summary) => {
    doneCards.append(createResultCard(summary));
  });
}

function readSelectedSnack() {
  try {
    const savedSnack = JSON.parse(sessionStorage.getItem(SELECTED_SNACK_STORAGE_KEY) || "null");
    const matchingSnack = snackOptions.find((snack) => snack.id === savedSnack?.id);
    return matchingSnack || snackOptions[2];
  } catch (error) {
    console.warn("[TalkQuiz:Done] selected snack read failed", error);
    return snackOptions[2];
  }
}

function renderSelectedSnack() {
  const snackLayer = document.querySelector("#snackLayer");
  const selectedSnack = readSelectedSnack();
  const sticker = document.createElement("button");
  const sprite = document.createElement("span");
  // 크기는 화면 짧은 변의 50~60%, 위치는 화면 안 아무 곳.
  const layerRect = snackLayer.getBoundingClientRect();
  const size = Math.min(layerRect.width, layerRect.height) * (0.5 + Math.random() * 0.1);
  const randomTop = Math.random() * Math.max(layerRect.height - size, 0);
  const randomLeft = Math.random() * Math.max(layerRect.width - size, 0);
  const randomRotate = -10 + Math.round(Math.random() * 24);

  snackLayer.innerHTML = "";
  snackBitesRemaining = SNACK_TOTAL_BITES;
  snackBiteDirection = 1;
  sticker.type = "button";
  sticker.className = "snack-sticker selected-snack";
  sticker.dataset.snackId = selectedSnack.id;
  sticker.style.width = `${Math.round(size)}px`;
  sticker.style.top = `${Math.round(randomTop)}px`;
  sticker.style.left = `${Math.round(randomLeft)}px`;
  sticker.style.setProperty("--rotate", `${randomRotate}deg`);
  sticker.setAttribute("aria-label", `${selectedSnack.alt} 먹기`);

  sprite.className = "snack-sprite";
  sprite.style.backgroundImage = `url("${selectedSnack.sprite}")`;
  sprite.setAttribute("aria-hidden", "true");
  setSnackFrame(sprite, 0);

  sticker.append(sprite);
  snackLayer.append(sticker);
}

function setSnackFrame(sprite, frame) {
  sprite.style.backgroundPositionX = `${(frame / (SNACK_SPRITE_FRAMES - 1)) * 100}%`;
}

function handleSnackClick(event) {
  const sticker = event.target.closest(".snack-sticker");
  if (!sticker || sticker.classList.contains("is-finished")) return;

  snackBitesRemaining -= 1;
  setSnackFrame(sticker.querySelector(".snack-sprite"), SNACK_TOTAL_BITES - snackBitesRemaining);
  rotateSnackOnce(sticker);
  if (snackBitesRemaining > 0) return;

  sticker.classList.add("is-finished");
  window.setTimeout(() => {
    sticker.classList.add("is-popping");
  }, SNACK_EMPTY_HOLD_MS);
  window.setTimeout(() => {
    sticker.hidden = true;
    enableDoneScroll();
  }, SNACK_EMPTY_HOLD_MS + 260);
}

function rotateSnackOnce(sticker) {
  sticker.style.setProperty("--rotate", `${snackBiteDirection * 15}deg`);
  snackBiteDirection *= -1;
}

function enableDoneScroll() {
  document.querySelector(".screen-done")?.classList.add("is-scrollable");
}

document.querySelector("#snackLayer").addEventListener("click", handleSnackClick);
renderSummary();
renderSelectedSnack();
