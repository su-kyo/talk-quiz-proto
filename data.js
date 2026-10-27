// quiz.html(app.js)과 done.html(done.js)이 공유하는 데이터.
// 문항/간식 정보를 수정할 때는 이 파일만 고치면 된다.

export const SUMMARY_STORAGE_KEY = "talkQuizSummary";
export const SELECTED_SNACK_STORAGE_KEY = "talkQuizSelectedSnack";

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

// sprite: 한 줄에 6장면(400×400) — 0 통째 → 5 다 먹음. Figma 「sprite」(diSQITLFXTBQFShm0JAzLg, 16428:620).
export const SNACK_SPRITE_FRAMES = 6;

export const snackOptions = [
  { id: "snack-01", src: "./snack-01.webp", sprite: "./snack-01-sprite.webp", alt: "소시지" },
  { id: "snack-02", src: "./snack-02.webp", sprite: "./snack-02-sprite.webp", alt: "데리야끼 꼬치" },
  { id: "snack-03", src: "./snack-03.webp", sprite: "./snack-03-sprite.webp", alt: "타코야끼" },
  { id: "snack-04", src: "./snack-04.webp", sprite: "./snack-04-sprite.webp", alt: "떡꼬치" },
  { id: "snack-05", src: "./snack-05.webp", sprite: "./snack-05-sprite.webp", alt: "츄러스" },
  { id: "snack-06", src: "./snack-06.webp", sprite: "./snack-06-sprite.webp", alt: "과일 꼬치" },
];
