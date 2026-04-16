const SUMMARY_STORAGE_KEY = "talkQuizSummary";
const SELECTED_SNACK_STORAGE_KEY = "talkQuizSelectedSnack";
const SNACK_TOTAL_BITES = 4;

const snackOptions = [
  { id: "snack-01", src: "./snack-01.png", alt: "선택한 간식" },
  { id: "snack-02", src: "./snack-02.png?v=20260416-2", alt: "선택한 간식" },
  { id: "snack-03", src: "./snack-03.png", alt: "선택한 간식" },
  { id: "snack-04", src: "./snack-04.png", alt: "선택한 간식" },
  { id: "snack-05", src: "./snack-05.png", alt: "선택한 간식" },
  { id: "snack-06", src: "./snack-06.png", alt: "선택한 간식" },
];

let snackBitesRemaining = SNACK_TOTAL_BITES;
let snackBiteDirection = 1;

const fallbackSummary = [
  {
    question: "글을 읽고, 글쓴이가 가장 먼저 권하는 실천 방법으로 알맞은 것을 고르세요.",
    answerText: "음식을 먹을 수 있을 만큼만 덜기",
    hadWrongAttempt: false,
  },
  {
    question: "이 글은 음식을 남기면 음식물 쓰레기가 되어 지구를 병들게 할 수 있다고 말하고 있습니다.",
    answerText: "정답은 O입니다.",
    hadWrongAttempt: false,
  },
  {
    question: "다음 중 글의 내용과 다른 것을 고르세요.",
    answerText: "음식물 쓰레기는 지구와는 큰 관련이 없다.",
    hadWrongAttempt: false,
  },
  {
    question: "이 글에 따르면 육식을 늘리는 것은 지구를 지키는 좋은 방법입니다.",
    answerText: "정답은 X입니다.",
    hadWrongAttempt: false,
  },
  {
    question: "이 글을 통해 알 수 있는 내용으로 가장 알맞은 것을 고르세요.",
    answerText: "건강하고 행복한 지구를 위해 식탁에서의 약속을 실천해야 한다.",
    hadWrongAttempt: false,
  },
];

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
