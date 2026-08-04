import { SUMMARY_STORAGE_KEY, SELECTED_SNACK_STORAGE_KEY, quizData, snackOptions } from "./data.js";

const SNACK_TOTAL_BITES = 4;

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
  const image = document.createElement("img");
  const badge = document.createElement("span");
  const randomTop = 5 + Math.round(Math.random() * 24);
  const randomLeft = 48 + Math.round(Math.random() * 20);
  const randomRotate = -10 + Math.round(Math.random() * 24);

  snackLayer.innerHTML = "";
  snackBitesRemaining = SNACK_TOTAL_BITES;
  snackBiteDirection = 1;
  sticker.type = "button";
  sticker.className = "snack-sticker selected-snack";
  sticker.dataset.snackId = selectedSnack.id;
  sticker.style.top = `${randomTop}%`;
  sticker.style.left = `${randomLeft}%`;
  sticker.style.setProperty("--rotate", `${randomRotate}deg`);
  sticker.setAttribute("aria-label", "선택한 간식 먹기");

  image.src = selectedSnack.src;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");

  badge.className = "snack-bite-badge";
  badge.textContent = `[${SNACK_TOTAL_BITES}/${SNACK_TOTAL_BITES}]`;
  sticker.append(image, badge);
  snackLayer.append(sticker);
}

function handleSnackClick(event) {
  const sticker = event.target.closest(".snack-sticker");
  if (!sticker || sticker.classList.contains("is-popping")) return;

  snackBitesRemaining -= 1;
  if (snackBitesRemaining > 0) {
    sticker.querySelector(".snack-bite-badge").textContent = `[${snackBitesRemaining}/${SNACK_TOTAL_BITES}]`;
    rotateSnackOnce(sticker);
    return;
  }

  rotateSnackOnce(sticker);
  window.setTimeout(() => {
    sticker.classList.add("is-popping");
  }, 140);
  window.setTimeout(() => {
    sticker.hidden = true;
    enableDoneScroll();
  }, 400);
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
