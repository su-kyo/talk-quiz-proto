// 시안 전환 패널 (목업 전용). 원본 app.js 는 건드리지 않고 body 의 속성만 바꾼다.

const VARIANT_NOTES = {
  current:
    "현재안. 버튼이 64px 로 작고 노란색이 배경 소스병 일러스트와 비슷해 배경 그림처럼 읽힌다. 닫힘 상태 대비 1.2:1.",
  "tab-vertical":
    "44 × 128px. 글자가 '지문'을 직접 말해준다. 다만 저학년에게 세로쓰기가 낯설 수 있어 실제 확인이 필요하다.",
  "tab-round":
    "44 × 110px, 평면. Figma 시안 그대로다. 패널과 같은 색이라 손잡이가 패널에서 밀려 나온 것처럼 보인다. 화살표 하나뿐이라 '지문'이라는 뜻은 전달되지 않는다.",
  "tab-icon":
    "44 × 88px. 책 아이콘으로 '지문'을, 화살표로 '열고 닫음'을 나타낸다. 가장 절제됐지만 뜻 전달은 A보다 약하다.",
};

const body = document.body;
const shell = document.querySelector(".student-screen");
const note = document.querySelector("#mockNote");
const panel = document.querySelector("#mockPanel");
const button = document.querySelector("#buttonArticle");

// ?v=tab-round&open=0 형태로 특정 시안을 바로 열 수 있다. (링크 공유·스크린샷용)
const params = new URLSearchParams(location.search);
const initialVariant = params.get("v");
if (initialVariant && VARIANT_NOTES[initialVariant]) {
  body.dataset.variant = initialVariant;
  const radio = document.querySelector(`input[value="${initialVariant}"]`);
  if (radio) radio.checked = true;
}
if (params.get("panel") === "0") {
  panel.classList.add("is-collapsed");
}

function refreshNote() {
  note.textContent = VARIANT_NOTES[body.dataset.variant] || "";
}

document.querySelectorAll('input[name="variant"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    body.dataset.variant = radio.value;
    refreshNote();
  });
});

document.querySelector("#mockCollapse").addEventListener("click", () => {
  panel.classList.toggle("is-collapsed");
});

// 지문은 열린 상태로 시작한다. ?open=0 이면 한 번 닫아 "닫힘 상태" 시안을 보여준다.
// Rive 초기 로딩이 끝난 뒤에 닫아야 캔버스 리사이즈 스냅샷이 정상적으로 동작한다.
if (params.get("open") === "0") {
  const loader = document.querySelector("#riveInitialLoader");
  const closeOnce = () => {
    if (shell.dataset.articleOpen === "true") button.click();
  };
  const waitForLoad = new MutationObserver(() => {
    if (loader.getAttribute("aria-hidden") !== "true") return;
    waitForLoad.disconnect();
    closeOnce();
  });
  waitForLoad.observe(loader, { attributes: true, attributeFilter: ["aria-hidden"] });
  // Rive 로딩이 실패하면 위 신호가 오지 않으므로 시안 확인용 안전장치를 둔다.
  window.setTimeout(() => {
    waitForLoad.disconnect();
    closeOnce();
  }, 4000);
}

refreshNote();
