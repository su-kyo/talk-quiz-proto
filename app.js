export const ARTICLE_TEXT = `급식 시간에 여러분의 식판 위에 어떤 음식들이 올라왔나요? 고소한 밥과 국에 맛있는 고기 반찬, 신선한 채소 반찬 등이 떠오르지요. 맛있게 모두 먹은 음식도 있고, 먹지 못하거나 싫어해서 남긴 음식도 있었을 거예요. 그런데 우리가 남긴 음식들은 모두 음식물 쓰레기가 되어 지구를 병들게 해요.

음식물 쓰레기를 줄이려면 어떻게 해야 할까요? 먼저, 음식을 남기지 않도록 노력해 봐요. 음식은 먹을 수 있을 만큼만 덜고, 남기지 않도록 골고루 먹어요. 그리고 육식보다 채식을 하는 것도 지구를 지키는 방법이에요. 고기를 만들려면 동물들을 길러야 하는데, 그 동물들이 살 곳과 먹이를 만드는 과정에서 지구에 해로운 가스가 나오기 때문이에요.

건강하고 행복한 지구를 위해 식탁에서 지켜야 할 약속들을 오늘부터 실천해 봐요.`;

export const INTRO_TEXT =
  "안녕! 나는 아콘이야. 오늘은 글을 읽고 음식물 쓰레기를 줄이는 방법에 대해 함께 이야기해 보자!";

export const REACTION_TEXT = "아하, 이제 이해됐어요!";

export const quizData = [
  {
    type: "text",
    question: "글을 읽고, 글쓴이가 가장 먼저 권하는 실천 방법으로 알맞은 것을 고르세요.",
    choices: [
      "먹고 싶은 음식만 골라 먹기",
      "음식을 먹을 수 있을 만큼만 덜기",
      "고기 반찬을 더 많이 먹기",
    ],
    answer: "음식을 먹을 수 있을 만큼만 덜기",
    explanation:
      "이 글에서는 음식물 쓰레기를 줄이기 위한 첫 번째 방법으로 음식을 남기지 않도록 노력하자고 했습니다. 그래서 먹을 수 있을 만큼만 덜어 남기지 않는 태도가 중요합니다.",
  },
  {
    type: "ox",
    question:
      "이 글은 음식을 남기면 음식물 쓰레기가 되어 지구를 병들게 할 수 있다고 말하고 있습니다.",
    choices: ["O", "X"],
    answer: "O",
    explanation:
      "글의 첫 부분에서 우리가 남긴 음식이 모두 음식물 쓰레기가 되어 지구를 병들게 한다고 설명하고 있습니다. 따라서 이 문장은 글의 내용과 같습니다.",
  },
  {
    type: "text",
    question: "다음 중 글의 내용과 다른 것을 고르세요.",
    choices: [
      "채식을 하는 것도 지구를 지키는 방법이다.",
      "동물을 기르는 과정에서는 지구에 해로운 가스가 나오기도 한다.",
      "음식물 쓰레기는 지구와는 큰 관련이 없다.",
    ],
    answer: "음식물 쓰레기는 지구와는 큰 관련이 없다.",
    explanation:
      "글에서는 음식물 쓰레기가 지구를 병들게 한다고 분명히 말하고 있습니다. 따라서 음식물 쓰레기가 지구와 큰 관련이 없다는 3번은 글의 내용과 다릅니다.",
  },
  {
    type: "ox",
    question: "이 글에 따르면 육식을 늘리는 것은 지구를 지키는 좋은 방법입니다.",
    choices: ["O", "X"],
    answer: "X",
    explanation:
      "글에서는 육식보다 채식을 하는 것이 지구를 지키는 방법이라고 설명합니다. 고기를 만들기 위해 동물을 기르는 과정에서 지구에 해로운 가스가 나오기 때문입니다.",
  },
  {
    type: "text",
    question: "이 글을 통해 알 수 있는 내용으로 가장 알맞은 것을 고르세요.",
    choices: [
      "건강하고 행복한 지구를 위해 식탁에서의 약속을 실천해야 한다.",
      "급식은 맛있는 음식만 골라서 먹는 것이 가장 중요하다.",
      "채소 반찬은 남겨도 음식물 쓰레기가 되지 않는다.",
    ],
    answer: "건강하고 행복한 지구를 위해 식탁에서의 약속을 실천해야 한다.",
    explanation:
      "이 글은 음식물 쓰레기를 줄이고 지구를 지키기 위해 식탁에서 실천할 수 있는 약속들을 소개하고 있습니다. 따라서 글의 중심 생각은 1번이 가장 잘 드러냅니다.",
  },
];

export const RIVE_CONFIG = {
  src: "./foodtruck-edit.riv",
  runtimeScript: "./vendor/rive/rive.js",
  wasm: "./vendor/rive/rive.wasm",
  defaultAspectRatio: 16 / 9,
  viewModelName: "FoodtruckVM",
  stateMachineName: "FoodtruckSM",
  triggers: {
    talking: "goTalking",
    waiting: "goWaiting",
    correct: "goCorrect",
    wrong: "goWrong",
  },
};

export const RESIZE_SNAPSHOT_CONFIG = {
  idleMs: 120,
  fadeMs: 150,
  finalCoverDelayMs: 280,
};

export const SUMMARY_STORAGE_KEY = "talkQuizSummary";
export const SELECTED_SNACK_STORAGE_KEY = "talkQuizSelectedSnack";
export const SKIP_TO_LAST_STORAGE_KEY = "talkQuizSkipToLast";
export const SNACK_COUNTDOWN_SECONDS = 5;

export const SNACK_PROMPT_TEXT = "문제를 잘 맞췄으니 원하는 간식을 하나 골라보세요!";

export const snackOptions = [
  { id: "snack-01", src: "./snack-01.png", alt: "핫도그" },
  { id: "snack-02", src: "./snack-02.png?v=20260416-2", alt: "꼬치" },
  { id: "snack-03", src: "./snack-03.png", alt: "샌드위치" },
  { id: "snack-04", src: "./snack-04.png", alt: "떡꼬치" },
  { id: "snack-05", src: "./snack-05.png", alt: "핫바" },
  { id: "snack-06", src: "./snack-06.png", alt: "김밥" },
];

const TYPE_DELAY_MS = 34;
const ANSWER_FEEDBACK_MS = 1000;
const CHOICE_EXIT_MS = 240;
const REVEAL_FALLBACK_MS = 1300;
const DONE_LOADING_MS = 1000;
const SNACK_SELECTION_HOLD_MS = 1000;
const SNACK_TIMER_CIRCUMFERENCE = 126;

let refs = {};
let appState = createQuizState();
let typingRunId = 0;
let flowRunId = 0;
let riveController = null;
let riveDebugStatus = createRiveDebugStatus();
let riveAspectRatio = RIVE_CONFIG.defaultAspectRatio;
let riveResizeObserver = null;
let riveCoverFrameId = 0;
let pendingWrongButton = null;
let snackCountdownTimer = 0;
let lastEscapeWarpAt = 0;

const riveResizeSession = {
  active: false,
  endTimer: 0,
  fadeTimer: 0,
  minEndAt: 0,
};

export function createQuizState() {
  return {
    stage: "intro",
    currentQuestionIndex: 0,
    selectedAnswer: "",
    nextAction: null,
    isTyping: false,
    isResolvingAnswer: false,
    hasStarted: false,
    currentQuestionHadWrongAttempt: false,
    problemSummaries: [],
    selectedSnack: null,
  };
}

export function getNextQuestionIndex(currentIndex, questions = quizData) {
  const nextIndex = currentIndex + 1;
  return nextIndex < questions.length ? nextIndex : null;
}

export function formatStudentAnswer(question, selectedChoice) {
  if (question.type === "ox") {
    return `정답은 ${selectedChoice}입니다.`;
  }

  return selectedChoice;
}

export function createProblemSummary(question, selectedChoice, hadWrongAttempt) {
  return {
    question: question.question,
    answerText: formatStudentAnswer(question, selectedChoice),
    hadWrongAttempt,
  };
}

export function createAutoCorrectSummariesUntil(targetIndex, questions = quizData) {
  return questions.slice(0, targetIndex).map((question) => {
    return createProblemSummary(question, question.answer, false);
  });
}

export function createSnackSelectionPayload(snack, wasRandom = false) {
  return {
    id: snack.id,
    src: snack.src,
    wasRandom: Boolean(wasRandom),
  };
}

export function getQuestionDisplayText(questionIndex) {
  return quizData[questionIndex]?.question || "";
}

export function getExplanationDisplayText(questionIndex) {
  return quizData[questionIndex]?.explanation || "";
}

// Keep Rive cover-cropped like background-size: cover without distorting the artboard.
export function calculateCoverRect(containerWidth, containerHeight, aspectRatio) {
  if (!containerWidth || !containerHeight || !aspectRatio) {
    return {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };
  }

  const containerRatio = containerWidth / containerHeight;
  let width = containerWidth;
  let height = containerHeight;

  if (containerRatio > aspectRatio) {
    height = width / aspectRatio;
  } else {
    width = height * aspectRatio;
  }

  width = Math.round(width);
  height = Math.round(height);

  return {
    width,
    height,
    left: Math.round((containerWidth - width) / 2),
    top: Math.round((containerHeight - height) / 2),
  };
}

export function setTalking() {
  fireRiveTrigger(RIVE_CONFIG.triggers.talking);
  setFallbackMood("talking");
}

export function setWaiting() {
  fireRiveTrigger(RIVE_CONFIG.triggers.waiting);
  setFallbackMood("waiting");
}

export function setCorrect() {
  fireRiveTrigger(RIVE_CONFIG.triggers.correct);
  setFallbackMood("correct");
}

export function setWrong() {
  fireRiveTrigger(RIVE_CONFIG.triggers.wrong);
  setFallbackMood("wrong");
}

export function createRiveDebugStatus() {
  return {
    runtimeScript: RIVE_CONFIG.runtimeScript,
    wasm: RIVE_CONFIG.wasm,
    src: RIVE_CONFIG.src,
    loadStarted: false,
    loadSucceeded: false,
    loadError: null,
    revealDoneReceived: false,
    stateMachineInputs: [],
    viewModelTriggers: [],
    firedTriggers: [],
  };
}

function initApp() {
  refs = {
    loadingOverlay: document.querySelector("#loadingOverlay"),
    shell: document.querySelector(".student-screen"),
    articleText: document.querySelector("#articleText"),
    buttonArticle: document.querySelector("#buttonArticle"),
    fontButtons: [...document.querySelectorAll(".fontsize-button")],
    dialogueNpc: document.querySelector(".dialogue-npc"),
    snackTimer: document.querySelector("#snackTimer"),
    snackTimerValue: document.querySelector("#snackTimerValue"),
    snackTimerProgress: document.querySelector("#snackTimerProgress"),
    npcText: document.querySelector("#npcText"),
    choiceList: document.querySelector("#choiceList"),
    snackChoiceList: document.querySelector("#snackChoiceList"),
    studentResponse: document.querySelector("#studentResponse"),
    studentText: document.querySelector("#studentText"),
    nextButton: document.querySelector("#nextButton"),
    finishCard: document.querySelector("#finishCard"),
    endButton: document.querySelector("#endButton"),
    riveStage: document.querySelector("#riveStage"),
    riveViewport: document.querySelector("#riveViewport"),
    riveCanvas: document.querySelector("#riveCanvas"),
    riveSnapshotCanvas: document.querySelector("#riveSnapshotCanvas"),
    riveInitialLoader: document.querySelector("#riveInitialLoader"),
    riveDebugMessage: document.querySelector("#riveDebugMessage"),
  };

  exposeRiveDebugStatus();
  refs.articleText.textContent = ARTICLE_TEXT;
  refs.buttonArticle.addEventListener("click", toggleArticlePanel);
  refs.fontButtons.forEach((button) => button.addEventListener("click", handleFontSizeClick));
  refs.nextButton.addEventListener("click", handleNextClick);
  refs.endButton.addEventListener("click", handleFinishClick);
  window.addEventListener("keydown", handleEscapeWarp, true);
  window.addEventListener("keyup", handleEscapeWarp, true);
  setupRiveCoverObserver();
  scheduleRiveCoverUpdate();
  initRive();
}

function initRive() {
  if (!window.rive || !refs.riveCanvas) {
    markRiveFailure("Rive runtime script was not loaded.");
    window.setTimeout(startActivity, 250);
    return;
  }

  try {
    riveDebugStatus.loadStarted = true;
    exposeRiveDebugStatus();
    logRive("load-start", {
      src: RIVE_CONFIG.src,
      stateMachine: RIVE_CONFIG.stateMachineName,
      viewModel: RIVE_CONFIG.viewModelName,
      wasm: RIVE_CONFIG.wasm,
    });

    window.rive.RuntimeLoader?.setWasmUrl?.(RIVE_CONFIG.wasm);
    logRive("wasm-url", window.rive.RuntimeLoader?.getWasmUrl?.());

    const layout = new window.rive.Layout({
      fit: window.rive.Fit.Cover,
      alignment: window.rive.Alignment.Center,
    });

    riveController = {
      instance: new window.rive.Rive({
        src: RIVE_CONFIG.src,
        canvas: refs.riveCanvas,
        autoplay: true,
        autoBind: true,
        stateMachines: RIVE_CONFIG.stateMachineName,
        layout,
        onLoad: () => {
          riveDebugStatus.loadSucceeded = true;
          riveDebugStatus.loadError = null;
          refs.riveStage.dataset.riveState = "loaded";
          exposeRiveDebugStatus();
          logRive("load-success", {
            activeArtboard: riveController.instance.activeArtboard,
            artboardWidth: riveController.instance.artboardWidth,
            artboardHeight: riveController.instance.artboardHeight,
            stateMachines: riveController.instance.stateMachineNames,
            source: riveController.instance.source,
          });
          updateRiveAspectRatio();
          setupRiveInputs();
          setupRiveEvents();
          updateRiveCover();
          completeInitialRiveLoading();
          window.setTimeout(() => {
            if (!appState.hasStarted) {
              logRive("revealDone-timeout", "revealDone was not received before fallback start.", "warn");
              startActivity();
            }
          }, REVEAL_FALLBACK_MS);
        },
        onLoadError: (error) => {
          markRiveFailure("foodtruck-edit.riv failed to load.", error);
          startActivity();
        },
        onRiveEventReceived: handleRiveEvent,
        onStateChange: (event) => {
          logRive("state-change", event?.data);
        },
      }),
      inputs: new Map(),
      viewModelTriggers: new Map(),
    };

    window.addEventListener("resize", () => {
      scheduleRiveCoverUpdate({ useSnapshot: true });
    });
  } catch (error) {
    markRiveFailure("Rive initialization threw an error.", error);
    startActivity();
  }
}

function setupRiveInputs() {
  if (!riveController?.instance) return;

  try {
    const inputs = riveController.instance.stateMachineInputs(RIVE_CONFIG.stateMachineName) || [];
    inputs.forEach((input) => {
      if (input?.name) {
        riveController.inputs.set(input.name, input);
      }
    });
    riveDebugStatus.stateMachineInputs = inputs.map((input) => input.name);
    exposeRiveDebugStatus();
    logRive("state-machine-inputs", riveDebugStatus.stateMachineInputs);
  } catch (error) {
    logRive("state-machine-inputs-error", error, "warn");
  }

  try {
    const instance = getViewModelInstance();
    Object.values(RIVE_CONFIG.triggers).forEach((triggerName) => {
      const trigger = instance?.trigger?.(triggerName);
      if (trigger) {
        riveController.viewModelTriggers.set(triggerName, trigger);
      }
    });
    riveDebugStatus.viewModelTriggers = [...riveController.viewModelTriggers.keys()];
    exposeRiveDebugStatus();
    logRive("viewmodel-triggers", riveDebugStatus.viewModelTriggers);
  } catch (error) {
    logRive("viewmodel-triggers-error", error, "warn");
  }
}

function getViewModelInstance() {
  if (riveController.instance.viewModelInstance) {
    logRive("viewmodel-instance", "auto-bound instance found");
    return riveController.instance.viewModelInstance;
  }

  const viewModel = riveController.instance.viewModelByName?.(RIVE_CONFIG.viewModelName);
  const instance = viewModel?.defaultInstance?.();
  if (instance) {
    riveController.instance.bindViewModelInstance?.(instance);
    logRive("viewmodel-instance", `default instance bound from ${RIVE_CONFIG.viewModelName}`);
  } else {
    logRive("viewmodel-instance-missing", RIVE_CONFIG.viewModelName, "warn");
  }

  return instance;
}

function setupRiveEvents() {
  try {
    const eventType = window.rive?.EventType?.RiveEvent;
    if (eventType && riveController.instance.on) {
      riveController.instance.on(eventType, handleRiveEvent);
    }
  } catch (error) {
    logRive("event-listener-error", error, "warn");
  }
}

function handleRiveEvent(riveEvent) {
  const eventName = riveEvent?.data?.name || riveEvent?.name;
  logRive("event", riveEvent);
  if (eventName === "revealDone") {
    riveDebugStatus.revealDoneReceived = true;
    exposeRiveDebugStatus();
    logRive("revealDone", "received");
    startActivity();
    return;
  }

  if (eventName === "wrongDone") {
    logRive("wrongDone", "received");
    completeWrongChoiceFeedback();
  }
}

function fireRiveTrigger(triggerName) {
  if (!riveController) {
    logRive("trigger-skip", `${triggerName}: Rive controller is not ready.`, "warn");
    return;
  }

  try {
    const viewModelTrigger = riveController.viewModelTriggers?.get(triggerName);
    if (viewModelTrigger?.trigger) {
      viewModelTrigger.trigger();
      trackFiredTrigger(triggerName, "viewModel");
      return;
    }

    const stateMachineInput = riveController.inputs?.get(triggerName);
    if (stateMachineInput?.fire) {
      stateMachineInput.fire();
      trackFiredTrigger(triggerName, "stateMachine");
      return;
    }

    logRive("trigger-missing", triggerName, "warn");
  } catch (error) {
    logRive("trigger-error", { triggerName, error }, "warn");
  }
}

function trackFiredTrigger(triggerName, source) {
  const entry = {
    triggerName,
    source,
    at: new Date().toISOString(),
  };
  riveDebugStatus.firedTriggers.push(entry);
  exposeRiveDebugStatus();
  logRive("trigger-fired", entry);
}

function setupRiveCoverObserver() {
  if (!refs.riveStage || typeof ResizeObserver === "undefined") return;

  // Retain the observer so article open/close and viewport changes keep the Rive crop centered.
  riveResizeObserver = new ResizeObserver(() => scheduleRiveCoverUpdate());
  riveResizeObserver.observe(refs.riveStage);
}

function updateRiveAspectRatio() {
  const width = Number(riveController?.instance?.artboardWidth);
  const height = Number(riveController?.instance?.artboardHeight);

  if (width > 0 && height > 0) {
    riveAspectRatio = width / height;
  }

  logRive("cover-aspect-ratio", {
    aspectRatio: riveAspectRatio,
    artboardWidth: width,
    artboardHeight: height,
  });
}

function updateRiveCover() {
  if (!refs.riveStage || !refs.riveViewport) return;

  const rect = refs.riveStage.getBoundingClientRect();
  const coverRect = calculateCoverRect(rect.width, rect.height, riveAspectRatio);

  Object.assign(refs.riveViewport.style, {
    width: `${coverRect.width}px`,
    height: `${coverRect.height}px`,
    left: `${coverRect.left}px`,
    top: `${coverRect.top}px`,
  });

  resizeRiveCanvas();
}

function scheduleRiveCoverUpdate({ useSnapshot = false, holdSnapshotMs = 0 } = {}) {
  if (useSnapshot) {
    beginRiveResizeSnapshot(holdSnapshotMs);
  }

  if (riveResizeSession.active) {
    scheduleRiveResizeEnd();
  }

  if (riveCoverFrameId) return;

  riveCoverFrameId = window.requestAnimationFrame(() => {
    riveCoverFrameId = 0;
    updateRiveCover();
  });
}

function resizeRiveCanvas() {
  try {
    riveController?.instance?.resizeDrawingSurfaceToCanvas?.();
  } catch (error) {
    logRive("resize-skip", error, "warn");
  }
}

function beginRiveResizeSnapshot(holdMs = 0) {
  const requestedMinEndAt = holdMs > 0 ? Date.now() + holdMs : 0;

  if (riveResizeSession.active) {
    riveResizeSession.minEndAt = Math.max(riveResizeSession.minEndAt, requestedMinEndAt);
    scheduleRiveResizeEnd();
    return;
  }

  if (!captureRiveSnapshot()) return;

  riveResizeSession.minEndAt = Math.max(riveResizeSession.minEndAt, requestedMinEndAt);
  riveResizeSession.active = true;
  scheduleRiveResizeEnd();
}

function captureRiveSnapshot() {
  const sourceCanvas = refs.riveCanvas;
  const snapshotCanvas = refs.riveSnapshotCanvas;

  if (!sourceCanvas || !snapshotCanvas || !sourceCanvas.width || !sourceCanvas.height) {
    return false;
  }

  try {
    snapshotCanvas.width = sourceCanvas.width;
    snapshotCanvas.height = sourceCanvas.height;

    const context = snapshotCanvas.getContext("2d");
    if (!context) return false;

    context.clearRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
    context.drawImage(sourceCanvas, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    window.clearTimeout(riveResizeSession.fadeTimer);
    snapshotCanvas.hidden = false;
    snapshotCanvas.classList.remove("is-fading");
    snapshotCanvas.classList.add("is-visible");
    return true;
  } catch (error) {
    logRive("snapshot-skip", error, "warn");
    return false;
  }
}

function scheduleRiveResizeEnd() {
  if (!riveResizeSession.active) return;

  window.clearTimeout(riveResizeSession.endTimer);
  const holdRemainingMs = Math.max(0, riveResizeSession.minEndAt - Date.now());
  const delayMs = Math.max(RESIZE_SNAPSHOT_CONFIG.idleMs, holdRemainingMs);
  riveResizeSession.endTimer = window.setTimeout(endRiveResizeSnapshot, delayMs);
}

function endRiveResizeSnapshot() {
  if (!riveResizeSession.active) return;

  window.clearTimeout(riveResizeSession.endTimer);
  riveResizeSession.active = false;
  riveResizeSession.minEndAt = 0;
  updateRiveCover();

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(fadeOutRiveSnapshot);
  });
}

function fadeOutRiveSnapshot() {
  const snapshotCanvas = refs.riveSnapshotCanvas;
  if (!snapshotCanvas || snapshotCanvas.hidden) return;

  snapshotCanvas.classList.remove("is-visible");
  snapshotCanvas.classList.add("is-fading");

  window.clearTimeout(riveResizeSession.fadeTimer);
  riveResizeSession.fadeTimer = window.setTimeout(() => {
    snapshotCanvas.classList.remove("is-fading");
    snapshotCanvas.hidden = true;
  }, RESIZE_SNAPSHOT_CONFIG.fadeMs);
}

function markRiveFailure(message, error) {
  riveDebugStatus.loadSucceeded = false;
  riveDebugStatus.loadError = {
    message,
    detail: error?.message || String(error || ""),
  };
  exposeRiveDebugStatus();
  logRive("load-failure", riveDebugStatus.loadError, "error");

  if (refs.riveStage) {
    refs.riveStage.dataset.riveState = "failed";
  }

  if (refs.riveDebugMessage) {
    refs.riveDebugMessage.textContent = `${message} 브라우저 콘솔의 [TalkQuiz:Rive] 로그를 확인해 주세요.`;
    refs.riveDebugMessage.hidden = false;
  }
}

function completeInitialRiveLoading() {
  refs.riveInitialLoader?.setAttribute("aria-hidden", "true");
  window.requestAnimationFrame(() => {
    setArticlePanelOpen(true, { useSnapshot: true });
  });
}

function setFallbackMood(mood) {
  if (!refs.riveStage) return;
  refs.riveStage.dataset.mood = mood;
}

async function startActivity() {
  if (appState.hasStarted) return;

  appState.hasStarted = true;
  if (consumeSkipToLastRequest()) {
    await warpToLastQuestion();
    return;
  }

  const runId = advanceFlowRun();
  appState.stage = "intro";
  hideStudentResponse();
  hideFinishCard();
  clearChoices();
  clearSnackChoices();
  hideSnackTimer();
  setTalking();

  await showNpcBubble();
  await typeNpc(INTRO_TEXT);
  if (isStaleFlowRun(runId)) return;
  await sleep(250);
  if (isStaleFlowRun(runId)) return;
  beginQuestion(0);
}

async function beginQuestion(questionIndex) {
  const question = quizData[questionIndex];
  if (!question) {
    finishActivity();
    return;
  }

  const runId = advanceFlowRun();
  appState.currentQuestionIndex = questionIndex;
  appState.selectedAnswer = "";
  appState.nextAction = null;
  appState.isResolvingAnswer = false;
  appState.currentQuestionHadWrongAttempt = false;
  pendingWrongButton = null;
  appState.stage = "questionTyping";

  hideStudentResponse();
  hideFinishCard();
  clearChoices();
  clearSnackChoices();
  hideSnackTimer();
  setTalking();

  await showNpcBubble();
  await typeNpc(getQuestionDisplayText(questionIndex));
  if (isStaleFlowRun(runId) || appState.stage !== "questionTyping") return;

  appState.stage = "answerWaiting";
  setWaiting();
  renderChoices(question);
}

function renderChoices(question) {
  refs.choiceList.innerHTML = "";
  refs.choiceList.hidden = false;
  refs.choiceList.classList.remove("is-exiting", "is-visible");
  refs.choiceList.dataset.type = question.type;

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.setAttribute("aria-label", choice);
    button.dataset.choice = choice;

    if (question.type === "ox") {
      const icon = document.createElement("img");
      icon.className = "choice-icon";
      icon.src = choice === "O" ? "./icon_o.svg" : "./icon_x.svg";
      icon.alt = choice;
      button.append(icon);
    } else {
      const label = document.createElement("span");
      label.className = "choice-label";
      label.textContent = choice;
      button.append(label);
    }

    button.addEventListener("click", () => handleChoiceClick(button, question));
    refs.choiceList.append(button);
  });

  window.requestAnimationFrame(() => {
    refs.choiceList.classList.add("is-visible");
  });
}

async function handleChoiceClick(button, question) {
  if (appState.stage !== "answerWaiting" || appState.isResolvingAnswer || button.disabled) {
    return;
  }

  const choice = button.dataset.choice;
  const isCorrect = choice === question.answer;

  if (!isCorrect) {
    handleWrongChoice(button);
    return;
  }

  appState.stage = "answerSelected";
  appState.isResolvingAnswer = true;
  appState.selectedAnswer = choice;
  recordProblemSummary(question, choice);

  [...refs.choiceList.querySelectorAll(".choice-button")].forEach((choiceButton) => {
    choiceButton.disabled = true;
    const buttonChoice = choiceButton.dataset.choice;
    if (buttonChoice === question.answer) {
      choiceButton.classList.add("is-correct");
    } else {
      choiceButton.classList.add("is-wrong", "is-disabled");
    }
  });

  await sleep(ANSWER_FEEDBACK_MS);

  await hideChoicesAnimated();
  showStudentResponse(formatStudentAnswer(question, choice), "showExplanation");
  setCorrect();
  appState.isResolvingAnswer = false;
}

function handleWrongChoice(button) {
  if (button.classList.contains("is-disabled")) return;

  appState.isResolvingAnswer = true;
  appState.currentQuestionHadWrongAttempt = true;
  pendingWrongButton = button;
  lockChoiceInput();
  button.classList.add("is-wrong", "is-shaking");
  setWrong();
}

function completeWrongChoiceFeedback() {
  const wrongButton = pendingWrongButton;
  if (!wrongButton) {
    releaseChoiceInputLock();
    return;
  }

  setWaiting();
  wrongButton.classList.remove("is-shaking");
  wrongButton.classList.add("is-wrong", "is-disabled");
  pendingWrongButton = null;
  releaseChoiceInputLock();
}

function lockChoiceInput() {
  refs.choiceList.querySelectorAll(".choice-button").forEach((choiceButton) => {
    if (!choiceButton.classList.contains("is-disabled")) {
      choiceButton.disabled = true;
    }
  });
}

function releaseChoiceInputLock() {
  refs.choiceList.querySelectorAll(".choice-button").forEach((choiceButton) => {
    choiceButton.classList.remove("is-shaking");
    choiceButton.disabled = choiceButton.classList.contains("is-disabled");
  });
  appState.stage = "answerWaiting";
  appState.isResolvingAnswer = false;
}

async function handleNextClick() {
  if (appState.isTyping || appState.isResolvingAnswer) return;

  if (appState.nextAction === "showExplanation") {
    await showExplanation();
    return;
  }

  if (appState.nextAction === "nextQuestion") {
    const nextIndex = getNextQuestionIndex(appState.currentQuestionIndex);
    hideStudentResponse();

    if (nextIndex === null) {
      startSnackChapter();
      return;
    }

    setTalking();
    beginQuestion(nextIndex);
  }
}

async function showExplanation() {
  const question = quizData[appState.currentQuestionIndex];
  if (!question) return;

  const runId = advanceFlowRun();
  hideStudentResponse();
  await hideChoicesAnimated();
  appState.stage = "explanationTyping";
  setTalking();

  await showNpcBubble();
  await typeNpc(getExplanationDisplayText(appState.currentQuestionIndex));
  if (isStaleFlowRun(runId) || appState.stage !== "explanationTyping") return;

  appState.stage = "reactionWaiting";
  setWaiting();
  showStudentResponse(REACTION_TEXT, "nextQuestion");
}

async function finishActivity() {
  appState.stage = "finished";
  hideStudentResponse();
  clearChoices();
  setWaiting();

  await showNpcBubble();
  await typeNpc("오늘 대화는 여기까지야. 음식물 쓰레기를 줄이는 약속을 함께 실천해 보자!");
  refs.finishCard.hidden = false;
  window.requestAnimationFrame(() => refs.finishCard.classList.add("is-visible"));
}

async function handleFinishClick() {
  if (!refs.loadingOverlay.hidden) return;

  await completeQuizAndGoDone();
}

async function completeQuizAndGoDone() {
  saveSummaryToSessionStorage();
  sessionStorage.setItem("quizFinished", "true");
  refs.loadingOverlay.hidden = false;
  await sleep(DONE_LOADING_MS);
  window.location.href = "./done.html";
}

async function startSnackChapter() {
  const runId = advanceFlowRun();
  appState.stage = "snackIntroTyping";
  appState.nextAction = null;
  appState.isResolvingAnswer = false;
  hideStudentResponse();
  hideFinishCard();
  clearChoices();
  clearSnackChoices();
  closeArticleForSnackChapter();
  setTalking();

  await showNpcBubble();
  await typeNpc(SNACK_PROMPT_TEXT);
  if (isStaleFlowRun(runId) || appState.stage !== "snackIntroTyping") return;

  appState.stage = "snackWaiting";
  setWaiting();
  showSnackTimer();
  renderSnackChoices();
  startSnackCountdown();
}

function renderSnackChoices() {
  refs.snackChoiceList.innerHTML = "";
  refs.snackChoiceList.hidden = false;
  refs.snackChoiceList.classList.remove("is-exiting", "is-visible", "is-selected");

  snackOptions.forEach((snack) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "snack-choice-button";
    button.dataset.snackId = snack.id;
    button.setAttribute("aria-label", snack.alt);

    const image = document.createElement("img");
    image.className = "snack-choice-image";
    image.src = snack.src;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.addEventListener("error", () => {
      console.warn("[TalkQuiz] snack image failed to load", snack.src);
    });
    button.append(image);
    button.addEventListener("click", () => selectSnack(snack, false));
    refs.snackChoiceList.append(button);
  });

  window.requestAnimationFrame(() => refs.snackChoiceList.classList.add("is-visible"));
}

async function selectSnack(snack, wasRandom) {
  if (appState.stage !== "snackWaiting") return;

  const runId = advanceFlowRun();
  appState.stage = "snackSelected";
  appState.selectedSnack = createSnackSelectionPayload(snack, wasRandom);
  saveSelectedSnackToSessionStorage();
  stopSnackCountdown();

  refs.snackChoiceList.classList.add("is-selected");
  refs.snackChoiceList.querySelectorAll(".snack-choice-button").forEach((button) => {
    const isSelected = button.dataset.snackId === snack.id;
    button.disabled = true;
    button.classList.toggle("is-selected", isSelected);
    button.classList.toggle("is-unselected", !isSelected);
  });

  await sleep(SNACK_SELECTION_HOLD_MS);
  if (isStaleFlowRun(runId)) return;
  refs.snackChoiceList.classList.add("is-exiting");
  await completeQuizAndGoDone();
}

function startSnackCountdown() {
  let remainingSeconds = SNACK_COUNTDOWN_SECONDS;
  updateSnackTimer(remainingSeconds);

  stopSnackCountdown();
  snackCountdownTimer = window.setInterval(() => {
    remainingSeconds -= 1;
    updateSnackTimer(remainingSeconds);

    if (remainingSeconds <= 0) {
      const randomSnack = snackOptions[Math.floor(Math.random() * snackOptions.length)];
      selectSnack(randomSnack, true);
    }
  }, 1000);
}

function stopSnackCountdown() {
  window.clearInterval(snackCountdownTimer);
  snackCountdownTimer = 0;
}

function showSnackTimer() {
  refs.snackTimer.hidden = false;
  refs.snackTimer.classList.remove("is-danger");
}

function hideSnackTimer() {
  stopSnackCountdown();
  refs.snackTimer.hidden = true;
  refs.snackTimer.classList.remove("is-danger");
}

function updateSnackTimer(remainingSeconds) {
  const normalizedSeconds = Math.max(0, remainingSeconds);
  const progress = normalizedSeconds / SNACK_COUNTDOWN_SECONDS;
  refs.snackTimerValue.textContent = String(normalizedSeconds);
  refs.snackTimer.classList.toggle("is-danger", normalizedSeconds <= 2);
  refs.snackTimerProgress.style.strokeDashoffset = String(
    Math.round(SNACK_TIMER_CIRCUMFERENCE * (1 - progress)),
  );
}

function saveSelectedSnackToSessionStorage() {
  try {
    sessionStorage.setItem(SELECTED_SNACK_STORAGE_KEY, JSON.stringify(appState.selectedSnack));
  } catch (error) {
    console.warn("[TalkQuiz] selected snack save failed", error);
  }
}

async function typeNpc(text) {
  const runId = (typingRunId += 1);
  appState.isTyping = true;
  refs.dialogueNpc.classList.add("is-typing");
  refs.npcText.textContent = "";

  for (const character of text) {
    if (runId !== typingRunId) return;
    refs.npcText.textContent += character;
    await sleep(TYPE_DELAY_MS);
  }

  refs.dialogueNpc.classList.remove("is-typing");
  appState.isTyping = false;
}

function showStudentResponse(text, nextAction) {
  appState.nextAction = nextAction;
  refs.studentText.textContent = text;
  refs.studentResponse.hidden = false;
  refs.studentResponse.classList.remove("is-visible");
  refs.nextButton.disabled = false;
  window.requestAnimationFrame(() => refs.studentResponse.classList.add("is-visible"));
}

function hideStudentResponse() {
  refs.studentResponse.classList.remove("is-visible");
  refs.studentResponse.hidden = true;
  refs.nextButton.disabled = true;
}

function hideFinishCard() {
  refs.finishCard.classList.remove("is-visible");
  refs.finishCard.hidden = true;
}

function clearChoices() {
  refs.choiceList.innerHTML = "";
  refs.choiceList.hidden = true;
  refs.choiceList.classList.remove("is-visible", "is-exiting");
  refs.choiceList.removeAttribute("data-type");
}

function clearSnackChoices() {
  stopSnackCountdown();
  refs.snackChoiceList.innerHTML = "";
  refs.snackChoiceList.hidden = true;
  refs.snackChoiceList.classList.remove("is-visible", "is-exiting", "is-selected");
}

function recordProblemSummary(question, selectedChoice) {
  appState.problemSummaries[appState.currentQuestionIndex] = createProblemSummary(
    question,
    selectedChoice,
    appState.currentQuestionHadWrongAttempt,
  );
  saveSummaryToSessionStorage();
}

function getCompleteSummaries() {
  return quizData.map((question, index) => {
    return appState.problemSummaries[index] || createProblemSummary(question, question.answer, false);
  });
}

function saveSummaryToSessionStorage() {
  try {
    sessionStorage.setItem(SUMMARY_STORAGE_KEY, JSON.stringify(getCompleteSummaries()));
  } catch (error) {
    console.warn("[TalkQuiz] summary save failed", error);
  }
}

function advanceFlowRun() {
  typingRunId += 1;
  flowRunId += 1;
  return flowRunId;
}

function isStaleFlowRun(runId) {
  return runId !== flowRunId;
}

function consumeSkipToLastRequest() {
  if (sessionStorage.getItem(SKIP_TO_LAST_STORAGE_KEY) !== "true") return false;
  sessionStorage.removeItem(SKIP_TO_LAST_STORAGE_KEY);
  return true;
}

async function handleEscapeWarp(event) {
  if (event.key !== "Escape" && event.key !== "Esc") return;
  if (Date.now() - lastEscapeWarpAt < 250) return;

  lastEscapeWarpAt = Date.now();
  event.preventDefault();
  event.stopPropagation();
  await warpToLastQuestion();
}

async function warpToLastQuestion() {
  const lastQuestionIndex = quizData.length - 1;
  advanceFlowRun();
  appState.hasStarted = true;
  appState.isTyping = false;
  appState.isResolvingAnswer = false;
  appState.nextAction = null;
  pendingWrongButton = null;
  appState.problemSummaries = createAutoCorrectSummariesUntil(lastQuestionIndex);
  saveSummaryToSessionStorage();
  hideStudentResponse();
  hideFinishCard();
  clearChoices();
  hideSnackTimer();
  clearSnackChoices();
  await beginQuestion(lastQuestionIndex);
}

async function hideChoicesAnimated() {
  if (refs.choiceList.hidden || !refs.choiceList.children.length) {
    clearChoices();
    return;
  }

  refs.choiceList.classList.add("is-exiting");
  refs.choiceList.classList.remove("is-visible");
  await sleep(CHOICE_EXIT_MS);
  clearChoices();
}

async function showNpcBubble() {
  refs.dialogueNpc.classList.remove("is-visible");
  // Force a reflow so repeated NPC bubble entries replay the fade/slide transition.
  refs.dialogueNpc.getBoundingClientRect();
  refs.dialogueNpc.classList.add("is-visible");
  await sleep(180);
}

function toggleArticlePanel() {
  const isOpen = refs.shell.dataset.articleOpen === "true";
  setArticlePanelOpen(!isOpen);
}

function closeArticleForSnackChapter() {
  setArticlePanelOpen(false);
}

function setArticlePanelOpen(isOpen, { useSnapshot = true } = {}) {
  if (refs.shell.dataset.articleOpen === String(isOpen)) return;

  if (useSnapshot) {
    beginRiveResizeSnapshot(RESIZE_SNAPSHOT_CONFIG.finalCoverDelayMs);
  }
  refs.shell.dataset.articleOpen = String(isOpen);
  refs.buttonArticle.setAttribute("aria-expanded", String(isOpen));
  scheduleRiveCoverUpdate();

  window.setTimeout(() => {
    updateRiveCover();
    endRiveResizeSnapshot();
  }, RESIZE_SNAPSHOT_CONFIG.finalCoverDelayMs);
}

function handleFontSizeClick(event) {
  const size = event.currentTarget.dataset.fontSize;

  refs.articleText.classList.remove("article-size-small", "article-size-normal", "article-size-large");
  refs.articleText.classList.add(`article-size-${size}`);
  refs.fontButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.fontSize === size);
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function exposeRiveDebugStatus() {
  if (typeof window !== "undefined") {
    window.__talkQuizRiveStatus = riveDebugStatus;
  }
}

function logRive(eventName, payload = "", level = "info") {
  const logger = console[level] || console.info;
  logger(`[TalkQuiz:Rive] ${eventName}`, payload);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
}
