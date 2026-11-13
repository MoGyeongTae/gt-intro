// 페이지에 들어가는 모든 내용은 이 파일에서만 수정합니다.

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
};

export const profile = {
  name: "모경태",
  tagline: "디테일을 중요시 여기는 개발자",
  about: [
    "안녕하세요 웹에서 동작하는 전체적인 흐름과 동작을 유저 친화적으로 설계하는 5년차 프론트엔드 개발자 모경태 입니다.",
    "React/Next.js 기반으로 정부과제, 웹 에디터, 커머스 등 각종 서비스를 A to Z로 개발하여 서비스를 런칭한 경험이 다수 있습니다.",
    "다양한 프로젝트 및 협업을 통해 크고 작은 경험, 노하우들을 쌓는 것을 좋아하고 사람마다 각기 다른 경험과 노하우가 있기에 피드백을 주고 받으며 공유하는 것을 좋아합니다.",
    "또한 디테일을 중요시합니다. 같은 방향성을 가진 결과물이여도 디테일의 차이가 유저의 경험과 선호를 이끌어낼수 있다고 생각하여 기능 하나하나의 개발도 좋지만 결국에는 해당 기능들을 좀 더 완성도 있게 만드는 것은 디테일이라고 생각합니다.",
    "원치않은 2번의 퇴사 이후 긴 공백기를 가졌습니다. 다만 공백기는 의미없이 버려진 시간이 아닌 제가 걸어온 길을 천천히 돌아보고 앞으로 무엇을 하면 좋을지 고민해보는 시간이 되었으며 AI로 변화한 생태계에 따라 더 다양하고 많은걸 할 수 있는 동기와 열정은 부족하지 않다고 생각합니다.",
    "앞으로의 시간에 공백기가 있었나 생각이 들 정도로 열심히 달리고 더 많은 것들을 이루고 싶습니다.",
  ],
  experience: [
    {
      company: "회사명",
      role: "직무",
      period: "2024.03 – 현재",
      summary: "담당한 일 한 줄 요약",
      highlights: ["주요 성과 1", "주요 성과 2"],
    },
  ] satisfies Experience[],
  projects: [
    {
      title: "프로젝트명",
      description: "무엇을 왜 만들었는지 한두 줄",
      stack: ["React", "TypeScript"],
      link: "",
      repo: "",
    },
  ] satisfies Project[],
  skills: {
    Frontend: ["TypeScript", "React", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "Rust"],
    Etc: ["Git", "Linux"],
  } as Record<string, string[]>,
  contact: {
    email: "alska6416@gmail.com",
    github: "https://github.com/MoGyeongTae",
    blog: "",
  },
};
