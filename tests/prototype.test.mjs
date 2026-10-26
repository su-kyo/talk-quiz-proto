import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import {
  calculateCoverRect,
  createProblemSummary,
  createQuizState,
  RIVE_CONFIG,
  RESIZE_SNAPSHOT_CONFIG,
  SELECTED_SNACK_STORAGE_KEY,
  SUMMARY_STORAGE_KEY,
  SNACK_COUNTDOWN_SECONDS,
  createAutoCorrectSummariesUntil,
  createSnackSelectionPayload,
  formatStudentAnswer,
  getExplanationDisplayText,
  getNextQuestionIndex,
  getQuestionDisplayText,
  quizData,
  snackOptions,
} from "../app.js";

test("quiz data keeps the requested five-question type order", () => {
  assert.equal(quizData.length, 5);
  assert.deepEqual(
    quizData.map((question) => question.type),
    ["text", "ox", "text", "ox", "text"],
  );
});

test("student answer text follows text-choice and OX rules", () => {
  assert.equal(
    formatStudentAnswer(quizData[0], quizData[0].answer),
    "음식을 먹을 수 있을 만큼만 덜기",
  );
  assert.equal(formatStudentAnswer(quizData[1], "O"), "정답은 O입니다.");
  assert.equal(formatStudentAnswer(quizData[3], "X"), "정답은 X입니다.");
});

test("state helpers start at intro and finish after the last question", () => {
  const state = createQuizState();

  assert.equal(state.stage, "intro");
  assert.equal(state.currentQuestionIndex, 0);
  assert.equal(state.currentQuestionHadWrongAttempt, false);
  assert.deepEqual(state.problemSummaries, []);
  assert.equal(getNextQuestionIndex(0, quizData), 1);
  assert.equal(getNextQuestionIndex(quizData.length - 1, quizData), null);
});

test("Rive config uses the local foodtruck file and expected triggers", () => {
  assert.equal(RIVE_CONFIG.src, "./foodtruck-edit.riv");
  assert.equal(RIVE_CONFIG.runtimeScript, "./vendor/rive/rive.js");
  assert.equal(RIVE_CONFIG.wasm, "./vendor/rive/rive.wasm");
  assert.equal(RIVE_CONFIG.viewModelName, "FoodtruckVM");
  assert.equal(RIVE_CONFIG.stateMachineName, "FoodtruckSM");
  assert.deepEqual(RIVE_CONFIG.triggers, {
    talking: "goTalking",
    waiting: "goWaiting",
    correct: "goCorrect",
    wrong: "goWrong",
  });
});

test("wrong answers are resolved by the Rive wrongDone event", () => {
  const appScript = readFileSync(new URL("../app.js", import.meta.url), "utf8");

  assert.match(appScript, /export function setWrong\(\)/);
  assert.match(appScript, /fireRiveTrigger\(RIVE_CONFIG\.triggers\.wrong\)/);
  assert.match(appScript, /eventName === "wrongDone"/);
  assert.match(appScript, /completeWrongChoiceFeedback\(\)/);
  assert.match(appScript, /function handleWrongChoice\(button\)/);
  assert.match(appScript, /pendingWrongButton = button/);
  assert.match(appScript, /button\.classList\.add\("is-wrong", "is-shaking"\)/);
  assert.match(appScript, /wrongButton\.classList\.remove\("is-shaking"\)/);
  assert.match(appScript, /wrongButton\.classList\.add\("is-wrong", "is-disabled"\)/);
  assert.match(appScript, /lockChoiceInput\(\)/);

  const wrongHandler = appScript.match(/function handleWrongChoice\(button\) \{[\s\S]*?\n\}/)?.[0] || "";
  assert.doesNotMatch(wrongHandler, /sleep\(ANSWER_FEEDBACK_MS\)/);
  assert.match(appScript, /function completeWrongChoiceFeedback\(\)/);
  assert.match(appScript, /releaseChoiceInputLock\(\)/);
  assert.match(appScript, /choiceButton\.disabled = choiceButton\.classList\.contains\("is-disabled"\)/);
});

test("snack chapter has six deployable snack options and storage payloads", () => {
  assert.equal(SNACK_COUNTDOWN_SECONDS, 5);
  assert.equal(SELECTED_SNACK_STORAGE_KEY, "talkQuizSelectedSnack");
  assert.equal(snackOptions.length, 6);
  assert.deepEqual(
    snackOptions.map((snack) => snack.id),
    ["snack-01", "snack-02", "snack-03", "snack-04", "snack-05", "snack-06"],
  );
  assert.equal(snackOptions.every((snack) => snack.src.includes(".webp")), true);
  assert.deepEqual(createSnackSelectionPayload(snackOptions[5], true), {
    id: "snack-06",
    src: "./snack-06.webp",
    wasRandom: true,
  });
});

test("ESC warp auto-fills skipped summaries as clean correct answers", () => {
  assert.deepEqual(createAutoCorrectSummariesUntil(2, quizData), [
    createProblemSummary(quizData[0], quizData[0].answer, false),
    createProblemSummary(quizData[1], quizData[1].answer, false),
  ]);
  assert.deepEqual(createAutoCorrectSummariesUntil(0, quizData), []);
});

test("display text does not include prototype-only labels", () => {
  assert.equal(getQuestionDisplayText(0), quizData[0].question);
  assert.equal(getExplanationDisplayText(0), quizData[0].explanation);
  assert.equal(getQuestionDisplayText(0).includes("[문제"), false);
  assert.equal(getExplanationDisplayText(0).includes("[해설]"), false);
});

test("text choices do not include numeric prefixes", () => {
  const textChoices = quizData
    .filter((question) => question.type === "text")
    .flatMap((question) => [question.answer, ...question.choices]);

  assert.equal(textChoices.every((choice) => !/^\d+\.\s/.test(choice)), true);
});

test("Rive cover rect preserves aspect ratio while cropping overflow", () => {
  assert.deepEqual(calculateCoverRect(1280, 720, 16 / 9), {
    width: 1280,
    height: 720,
    left: 0,
    top: 0,
  });

  assert.deepEqual(calculateCoverRect(720, 720, 16 / 9), {
    width: 1280,
    height: 720,
    left: -280,
    top: 0,
  });
});

test("Rive resize snapshot overlay is present and uses lightweight timing", () => {
  const html = readFileSync(new URL("../quiz.html", import.meta.url), "utf8");
  const appScript = readFileSync(new URL("../app.js", import.meta.url), "utf8");

  assert.match(html, /id="riveSnapshotCanvas"/);
  assert.match(appScript, /\.drawImage\(/);
  assert.doesNotMatch(appScript, /toDataURL/);
  assert.equal(RESIZE_SNAPSHOT_CONFIG.idleMs, 120);
  assert.ok(RESIZE_SNAPSHOT_CONFIG.fadeMs >= 120);
  assert.ok(RESIZE_SNAPSHOT_CONFIG.fadeMs <= 180);
  assert.ok(RESIZE_SNAPSHOT_CONFIG.finalCoverDelayMs >= 260);
});

test("pages are split so quiz markup is isolated from done, with no intro page", () => {
  const indexHtml = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const quizHtml = readFileSync(new URL("../quiz.html", import.meta.url), "utf8");
  const doneHtml = readFileSync(new URL("../done.html", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../style.css", import.meta.url), "utf8");

  assert.ok(!existsSync(new URL("../intro.html", import.meta.url)));
  assert.match(indexHtml, /quiz\.html/);
  assert.doesNotMatch(indexHtml, /intro\.html/);
  // 지문은 열린 상태로 시작한다 (들어오면 바로 읽을 수 있게).
  assert.match(quizHtml, /class="student-screen" data-article-open="true"/);
  assert.doesNotMatch(quizHtml, /quizEntry|intro\.html/);
  assert.match(quizHtml, /sessionStorage\.removeItem\("quizFinished"\)/);
  assert.match(quizHtml, /sessionStorage\.removeItem\("talkQuizSummary"\)/);
  assert.match(quizHtml, /id="loadingOverlay"[^>]*hidden/);
  assert.match(quizHtml, /id="riveInitialLoader"/);
  assert.match(quizHtml, /foodtruck-bg\.svg/);
  assert.match(quizHtml, /aria-expanded="true"/);
  assert.match(quizHtml, /id="snackTimer"[^>]*hidden/);
  assert.match(quizHtml, /id="snackChoiceList"/);
  assert.match(quizHtml, />ㅎ</);
  assert.match(quizHtml, />끝내기</);
  assert.doesNotMatch(quizHtml, /id="introScreen"|id="doneScreen"|data-screen/);
  assert.match(doneHtml, /id="doneCards"/);
  assert.match(doneHtml, /sessionStorage\.getItem\("quizFinished"\)/);
  assert.match(doneHtml, /location\.replace\("\.\/quiz\.html"\)/);
  assert.match(doneHtml, /sessionStorage\.removeItem\("quizFinished"\)/);
  assert.match(doneHtml, /id="snackLayer"/);
  assert.doesNotMatch(doneHtml, /id="resultScreen"/);
  assert.doesNotMatch(styles, /bg_intro\.webp|\.screen-intro|\.intro-/);
  assert.match(styles, /bg_done\.webp/);
  assert.match(styles, /\.rive-initial-loader\s*\{[\s\S]*?background:\s*url\("\.\/foodtruck-bg\.svg"\) center \/ cover no-repeat;/);
  assert.match(styles, /\.rive-layer\[data-rive-state="loaded"\]\s+\.rive-initial-loader\s*\{[\s\S]*?opacity:\s*0;/);
  assert.match(styles, /\.snack-layer\s*\{[\s\S]*?z-index:\s*10;/);
  assert.match(styles, /\.snack-layer\s*\{[\s\S]*?pointer-events:\s*none;/);
  assert.match(styles, /\.snack-sticker\s*\{[\s\S]*?pointer-events:\s*auto;/);
  assert.match(styles, /\.snack-choice-list/);
  assert.match(styles, /data-article-open="false"[\s\S]*?\.snack-choice-list/);
  assert.match(styles, /data-article-open="true"[\s\S]*?\.snack-choice-list/);
  assert.match(styles, /\.snack-choice-button\s*\{[\s\S]*?display:\s*flex;/);
  assert.match(styles, /\.snack-choice-button\s*\{[\s\S]*?aspect-ratio:\s*1\s*\/\s*1;/);
  assert.match(styles, /\.snack-choice-button\s*\{[\s\S]*?background:\s*var\(--choice-surface\);/);
  assert.match(styles, /\.snack-choice-button\s*\{[\s\S]*?overflow:\s*hidden;/);
  assert.match(styles, /\.snack-choice-image\s*\{[\s\S]*?width:\s*100%;/);
  assert.match(styles, /\.snack-choice-image\s*\{[\s\S]*?height:\s*100%;/);
  assert.match(styles, /\.snack-choice-image\s*\{[\s\S]*?object-fit:\s*contain;/);
  assert.match(styles, /\.selected-snack\s*\{[\s\S]*?width:\s*clamp\(260px,\s*28vw,\s*396px\);/);
  assert.match(styles, /\.snack-bite-badge\s*\{[\s\S]*?z-index:\s*3;/);
  assert.doesNotMatch(styles, /top:\s*-\d{2}%/);
});

test("short viewport layouts keep choices reachable with compact spacing and local scroll", () => {
  const styles = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  const baseChoiceBlock = styles.match(/\.choice-list\s*\{[\s\S]*?\n\}/)?.[0] || "";
  const baseSnackChoiceBlock = styles.match(/\.snack-choice-list\s*\{[\s\S]*?\n\}/)?.[0] || "";
  const baseUserAreaBlock = styles.match(/\.user-area\s*\{[\s\S]*?\n\}/)?.[0] || "";
  const userAreaBlocks = [...styles.matchAll(/\.user-area\s*\{[\s\S]*?\n\s*\}/g)].map(
    (match) => match[0],
  );

  assert.match(styles, /@media\s*\(max-height:\s*900px\)/);
  assert.match(styles, /@media\s*\(max-height:\s*780px\)/);
  assert.match(styles, /@media\s*\(max-height:\s*680px\)/);
  assert.doesNotMatch(baseChoiceBlock, /overflow-y:\s*auto;/);
  assert.doesNotMatch(baseSnackChoiceBlock, /overflow-y:\s*auto;/);
  assert.match(baseChoiceBlock, /gap:\s*calc\(var\(--button-depth\) \+ 8px\);/);
  assert.match(baseSnackChoiceBlock, /gap:\s*8px;/);
  assert.match(baseUserAreaBlock, /padding:\s*80px var\(--choice-side-safe\) 40px;/);
  assert.ok(userAreaBlocks.every((block) => !/padding-left:\s*48px;/.test(block)));
  assert.ok(userAreaBlocks.every((block) => !/padding-right:\s*48px;/.test(block)));
  assert.match(styles, /max-height:\s*900px[\s\S]*?\.npc-area\s*\{[\s\S]*?padding-top:\s*40px;/);
  assert.match(styles, /max-height:\s*900px[\s\S]*?\.user-area\s*\{[\s\S]*?padding:\s*30px var\(--choice-side-safe\) 40px;/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.npc-area\s*\{[\s\S]*?padding-top:\s*40px;/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.user-area\s*\{[\s\S]*?padding:\s*20px var\(--choice-side-safe\) 40px;/);
  assert.match(styles, /max-height:\s*900px[\s\S]*?\.choice-list\s*\{[\s\S]*?gap:\s*calc\(var\(--button-depth\) \+ 8px\);/);
  assert.match(styles, /max-height:\s*900px[\s\S]*?\.snack-choice-list\s*\{[\s\S]*?gap:\s*8px;/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.choice-list\s*\{[\s\S]*?gap:\s*calc\(var\(--button-depth\) \+ 8px\);/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.choice-button\s*\{[\s\S]*?min-height:\s*60px;/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.choice-list\[data-type="ox"\]\s+\.choice-button\s*\{[\s\S]*?min-height:\s*144px;/);
  assert.match(styles, /max-height:\s*780px[\s\S]*?\.snack-choice-button\s*\{[\s\S]*?max-height:\s*104px;/);
  assert.match(styles, /max-height:\s*680px[\s\S]*?\.choice-list\s*\{[\s\S]*?max-height:\s*min\(44vh,\s*260px\);[\s\S]*?overflow-y:\s*auto;/);
  assert.match(styles, /max-height:\s*680px[\s\S]*?\.snack-choice-list\s*\{[\s\S]*?max-height:\s*min\(34vh,\s*188px\);[\s\S]*?overflow-y:\s*auto;/);
});

test("done result cards use shared Q and A row layout", () => {
  const doneScript = readFileSync(new URL("../done.js", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../style.css", import.meta.url), "utf8");

  assert.match(doneScript, /function createResultCard/);
  assert.match(doneScript, /createCardRow\("Q",\s*summary\.question,\s*"question-row",\s*"done-question"\)/);
  assert.match(doneScript, /createCardRow\("A",\s*summary\.answerText,\s*"answer-row",\s*"done-answer"\)/);
  assert.match(doneScript, /row\.className = `done-card-row \$\{rowClassName\}`/);
  assert.match(doneScript, /done-card-badge/);
  assert.match(doneScript, /badge\.textContent = label/);
  assert.match(doneScript, /content\.className = `done-card-text \$\{textClassName\}`/);
  assert.match(doneScript, /"done-question"/);
  assert.match(doneScript, /"done-answer"/);
  assert.match(styles, /\.done-card-row\s*\{[\s\S]*?gap:\s*8px;/);
  assert.match(styles, /\.done-card-badge\s*\{[\s\S]*?width:\s*30px;/);
  assert.match(styles, /\.done-card-badge\s*\{[\s\S]*?height:\s*30px;/);
  assert.match(styles, /\.done-card-text\s*\{[\s\S]*?font-size:\s*20px;/);
});

test("done summary records final answer text and wrong-attempt state", () => {
  assert.deepEqual(createProblemSummary(quizData[0], quizData[0].answer, true), {
    question: quizData[0].question,
    answerText: quizData[0].answer,
    hadWrongAttempt: true,
  });

  assert.deepEqual(createProblemSummary(quizData[1], "O", false), {
    question: quizData[1].question,
    answerText: "정답은 O입니다.",
    hadWrongAttempt: false,
  });
  assert.equal(SUMMARY_STORAGE_KEY, "talkQuizSummary");
});

test("quiz script is quiz-only and done page reads session storage", () => {
  const appScript = readFileSync(new URL("../app.js", import.meta.url), "utf8");
  const doneScript = readFileSync(new URL("../done.js", import.meta.url), "utf8");
  const doneHtml = readFileSync(new URL("../done.html", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../style.css", import.meta.url), "utf8");

  assert.doesNotMatch(appScript, /setScreen|introScreen|doneScreen|startQuizFromIntro/);
  assert.match(appScript, /sessionStorage\.setItem/);
  assert.match(appScript, /sessionStorage\.setItem\("quizFinished",\s*"true"\)/);
  assert.match(appScript, /sessionStorage\.setItem\(SELECTED_SNACK_STORAGE_KEY/);
  assert.match(appScript, /function startSnackChapter/);
  assert.match(appScript, /function handleEscapeWarp/);
  assert.match(appScript, /function completeInitialRiveLoading/);
  // 지문 기본 열림은 quiz.html 마크업이 담당한다. 로딩이 끝난 뒤 여는 코드가 남아 있으면
  // 화면이 한 번 밀려 보이고, Rive 로딩이 실패했을 때 닫힌 채로 남는다.
  assert.doesNotMatch(appScript, /setArticlePanelOpen\(true/);
  assert.match(appScript, /function setArticlePanelOpen\(isOpen/);
  assert.match(appScript, /let flowRunId = 0/);
  assert.match(appScript, /const runId = advanceFlowRun\(\)/);
  assert.match(appScript, /isStaleFlowRun\(runId\)/);
  assert.match(appScript, /image\.className = "snack-choice-image"/);
  assert.match(appScript, /done\.html/);
  const dataScript = readFileSync(new URL("../data.js", import.meta.url), "utf8");
  assert.match(doneScript, /sessionStorage\.getItem/);
  assert.match(doneScript, /from "\.\/data\.js"/);
  assert.match(doneScript, /SUMMARY_STORAGE_KEY/);
  assert.match(doneScript, /SELECTED_SNACK_STORAGE_KEY/);
  assert.match(dataScript, /talkQuizSummary/);
  assert.match(dataScript, /talkQuizSelectedSnack/);
  assert.match(doneScript, /renderSelectedSnack/);
  assert.match(doneScript, /snackBitesRemaining/);
  assert.match(doneScript, /snackBiteDirection/);
  assert.match(doneScript, /snackBiteDirection \*= -1/);
  assert.match(doneScript, /--rotate/);
  assert.match(doneScript, /enableDoneScroll\(\)/);
  assert.match(doneScript, /\[\$\{snackBitesRemaining\}\/\$\{SNACK_TOTAL_BITES\}\]/);
  assert.match(styles, /\.screen-done\.is-scrollable\s*\{[\s\S]*?overflow-y:\s*auto;/);
  assert.match(styles, /\.screen-done\.is-scrollable\s+\.done-container\s*\{[\s\S]*?height:\s*auto;/);
  assert.match(styles, /\.selected-snack\s*\{[\s\S]*?animation:\s*none;/);
  assert.match(styles, /\.selected-snack\s*\{[\s\S]*?transition:\s*transform 150ms/);
  assert.doesNotMatch(styles, /snackNibble/);
  assert.doesNotMatch(doneHtml, /snack-01\.webp/);
});
