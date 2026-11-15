// 페이지에 들어가는 모든 내용은 이 파일에서만 수정

/** 회사에서 맡은 프로젝트 하나 */
export type Work = {
  /** 프로젝트명 */
  name: string;
  /** 프로젝트 기간 (예: "2023.02 - 2023.08", 진행 중이면 "2024.01 - 현재") */
  period?: string;
  description?: string | string[];
  /** 사용한 기술 — 기술 섹션처럼 태그로 보여줌 */
  stack?: string[];
  /** 관련 링크 (선택) — 넣으면 프로젝트명이 링크가 되고 끝에 ↗ 표시, 새 탭으로 열림 */
  link?: string;
};

export type Experience = {
  company: string;
  /** 회사 로고 경로 (public/ 기준, 예: "/logos/onethird_logo.png"). 없으면 로고 줄이 안 보여요. */
  logo?: string;
  /**
   * 로고 높이(px) 보정값. 기본 28px (모바일은 자동으로 6/7 크기).
   * 로고마다 글자 굵기·모양이 달라 같은 높이여도 크기가 달라 보이면 이 값으로 맞춰요.
   */
  logoHeight?: number;
  role: string;
  period: string;
  summary: string;
  works?: Work[];
};

export type Project = {
  title: string;
  /** 프로젝트 기간 (예: "2025.03 - 2025.06", 진행 중이면 시작 달만 "2025.09") */
  period?: string;
  /** 진행 중인 프로젝트면 true → 카드에 "진행중" 배지가 붙고 목록 맨 앞으로 옵니다 */
  ongoing?: boolean;
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
    "원치않은 2번의 퇴사 이후 긴 공백기를 가졌지만 의미없이 버려진 시간이 아닌 제가 걸어온 길을 천천히 돌아보고 앞으로 무엇을 하면 좋을지 고민해보는 시간이 되었으며 AI로 변화한 생태계에 따라 더 다양하고 많은걸 할 수 있는 동기와 열정은 부족하지 않다고 생각합니다.",
  ],
  experience: [
    {
      company: "삼분의일",
      logo: "/logos/onethird_logo.png",
      logoHeight: 24,
      role: "프론트엔드 개발",
      period: "2023.02 - 2024.05",
      summary:
        "삼분의일 커머스 페이지, 어드민 페이지, 매트리스 체험 예약 페이지, 차트 웹뷰 페이지 개발 등 웹 프론트 전체를 담당하였습니다.",
      works: [
        {
          name: "신규 자사몰 페이지 및 디자인 시스템 개발",
          period: "2023.11 - 2024.04",
          description: ["부연 설명 1", "부연 설명 2"],
          stack: ["Next.js", "React-Query", "Zustand", "Storybook", "Tailwind CSS", "Vite"],
          // TODO: 실제 주소로 바꾸기 (예시)
        },
        {
          name: "슬립큐브 체험관 예약 페이지",
          period: "2023.07 - 2023.10",
          description: "부연 설명",
          stack: ["React", "Tailwind CSS"],
        },
        {
          name: "슬립큐브 어드민 페이지",
          period: "2023.05 - 2023.07",
          description: ["프로젝트 기여 : 100%", "슬립큐브 관련 데이터 관리 및 사용 유저를 관리하기 위한 어드민 페이지 프로젝트", "디자인부터 개발, 배포 까지 모든 영역 담당", "요구사항을 우선으로 개발한 뒤 필요해 보이는 기능들 찾아서 추가하여 개발", "디자인부터 배포까지 전부하며 넣고싶은 기능도 넣으니 재밌는 프로젝트였음"],
          stack: ["React", "Zustand", "Tailwind CSS", "Vite"],
        },
        {
          name: "슬립큐브 수면 데이터 차트 웹뷰 페이지 (수면리포트)",
          period: "2023.02 - 2023.05",
          description: ["프로젝트 기여 : 100%", "슬립큐브 앱의 핵심 중 하나인 수면 데이터 차트 웹뷰 화면 개발 프로젝트", "여러 유형의 차트가 필요했던 만큼 Chart.js를 사용하여 개발", "프로젝트 시작 2주차 급하게 투자자를 위한 화면이 필요하여 빠르게 개발 후 대응을 완료하였고 이어 디자인 리뉴얼도 일정내로 확실히 진행하였음", "Chart.js 레포지토리 Discuss를 이용, 차트 유형에 대한 참고자료를 얻어서 진행하였음"],
          stack: ["React", "React-Query", "Zustand", "Chart.js", "Styled-Components", "Vite"],
          link: "https://3boon1.com/product/%EC%8A%AC%EB%A6%BD%ED%81%90%EB%B8%8C-%ED%8D%BC%EC%8A%A4%EB%84%90-%EC%88%98%EB%A9%B4%EC%98%A8%EB%8F%84-%EC%BC%80%EC%96%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C/92/category/70/display/1/",
        },
      ],
    },
    {
      company: "정육각",
      logo: "/logos/jyg_logo.svg",
      logoHeight: 30,
      role: "프론트엔드 개발",
      period: "2021.09 - 2022.12",
      summary: "정육각 커머스 페이지의 초기 서비스부터 쌓인 5년간의 기술부채를 해결하고 커머스 페이지를 책임졌으며 초록마을과 M&A 이후 신규 커머스 페이지 초샵 프로젝트에서 회원과 상품 및 주문 도메인을 담당하였습니다.",
      works: [
        {
          name: "초샵 프로젝트",
          period: "2022.05 - 2022.12",
          description: ["초록마을과 M&A를 진행한 후 신규 커머스 페이지가 필요하여 기획된 프로젝트", "정육각 웹 프론트는 Vue 기반이였으나 새로 합류한 팀원들의 선호도에 따라 React기반 Next.js로 전환", "회원과 상품 및 주문 도메인을 담당하여 개발하였음", "Zustand 및 React-Query로 상태관리를 진행하였고 디자인 시스템을 먼저 개발하여 각 도메인 개발에 원활하게 작용할 수 있도록 하였음"],
          stack: ["React", "Next.js", "Zustand", "React-Query", "Cypress", "Storybook"],
        },
        {
          name: "커머스 페이지 Vue3 마이그레이션 및 서비스 개발",
          period: "2021.10 - 2022.04",
          description: ["프로젝트 참여인원 : 2명", "프로젝트 기여 : 80%", "정육각 커머스의 기술부채를 해결하고 비교적 최근에 만들어진 앱과 어느정도 맞춰가기 위해 마이그레이션 진행", "당시 React와 유사한 구조를 가져가던 Vue3여서 흥미롭게 마이그레이션 진행", "마이그레이션과 더불어 기존 커머스에도 신규 서비스 운영개발을 담당", "커머스 인증 및 DB등 기능은 Firebase를 사용하였고 CI/CD엔 ArgoCD를 사용하였고 DataDog을 통해 데이터등을 볼 수 있었음"],
          stack: ["Vue2", "Vue3", "Pinia", "Firebase", "ArgoCD", "DataDog"],
        },
      ],
    },
    {
      company: "셈웨어",
      logo: "/logos/cemware_logo.svg",
      logoHeight: 24,
      role: "프론트엔드 개발",
      period: "2018.06 - 2021.09",
      summary: "정부과제와 각종 플랫폼 및 웹 에디터 프로젝트를 다수 담당하여 개발하였습니다.",
      works: [
        {
          name: "수학 PPT 워크북 프로젝트",
          period: "2021.06 - 2021.09",
          description: ["프로젝트 기여 : 100%", "자사 MathFreeOn 등 수학 그래프들을 넣을 수 있는 PPT 제작 페이지 프로젝트", "PPT의 기능 및 각 슬라이드 편집 관련 기능을 전부 담당", "대부분의 UI/UX는 구글 PPT를 참고하였으며 슬라이드 안에서 요소 편집등은 미리캔버스를 참고하여 개발", "슬라이드에서 수학 그래프를 편집할 수 있어 좀 더 확실한 시각자료로 보여질 수 있었음"],
          stack: ["React", "Redux", "Quill Editor", "Webpack"],
        },
        {
          name: "온라인 토픽 문제은행 관리자 페이지",
          period: "2021.04 - 2021.06",
          description: ["프로젝트 참여인원 : 2명", "프로젝트 기여 : 60%", "TOPIK 온라인 교육 사이트의 문제은행 관리를 위한 기능 개발 프로젝트", "토픽은 문제형식이 정해져 있어 문제 번호를 고르면 해당 유형의 문제 템플릿을 기반으로 문제를 만들 수 있게하였고 만든 문제들을 모아 하나의 모의평가를 만들 수 있게 개발"],
          stack: ["React", "Redux"],
        },
        {
          name: "셈웨어 자사 페이지 리뉴얼",
          period: "2021.01 - 2021.03",
          description: ["프로젝트 기여 : 100%", "10년 가량 된 홈페이지를 리뉴얼하고 셈웨어가 이룬 것들을 업데이트 하는 프로젝트", "프론트영역 전체 담당하여 개발 진행"],
          stack: ["React"],
        },
        {
          name: "[정부과제] 똑똑수학 문제풀이 및 평가 개발",
          period: "2020.07 - 2020.12",
          description: ["프로젝트 참여인원 : 5명", "프로젝트 기여 : 25%", "정부과제로 개발되었던 똑똑수학의 학생평가용 온라인 문제풀이 개발 프로젝트", "기초연산풀이(모의평가), 단원평가 2가지로 구분하여 개발", "풀이가 끝나고 최종적으로 제출하면 선생님이 각 학생들의 결과를 취합하여 확인 할 수 있음", "각 팀원이 4개의 단원을 담당, 숫자블럭 등 그래픽요소는 svg 및 캔버스를 이용하여 개발"],
          stack: ["React", "Redux"],
        },
        {
          name: "온라인 종합 교육 플랫폼 프로젝트",
          period: "2020.04 - 2020.06",
          description: ["프로젝트 참여인원 : 5명", "프로젝트 기여 : 35%", "수학쪽 외에도 종합적인 교육분야로 나아가기 위한 플랫폼 프로젝트", "교육 등록, 교육 상세 및 결제 등 핵심 기능 담당",  "Vue&Vuex를 사용하여 대학 인턴분들과 함께 인프런을 참고하여 개발"],
          stack: ["Vue2", "Vuex"],
        },
        {
          name: "수학 뉴스피드 플랫폼 프로젝트",
          period: "2019.11 - 2020.03",
          description: ["프로젝트 기여 : 100%", "수학 컨텐츠를 공유하고 소통하는 페이스북같은 뉴스피드 플랫폼", "글을 올릴때 수학 그래프 이미지가 아닌 별도 iframe 으로 MathFreeOn 등 자사 웹에서 만든 수학 컨텐츠를 등록할 수 있었고 글을 보는 사용자는 해당 컨텐츠를 편집해볼 수 있었음", "뉴스피드 플랫폼이기 때문에 React-Query를 사용하여 무한 스크롤로 컨텐츠 로딩이 될 수 있게 개발", "@멘션 기능 등 페이스북의 기능을 다수 참고하여 개발"],
          stack: ["React", "React-Query", "Redux"],
        },
        {
          name: "[정부과제] 알지오매스(Algeomath) 프로필 편집 및 모둠 기능 개발",
          period: "2019.07 - 2019.10",
          description: ["프로젝트 기여 : 40%", "학생들이 학급 내에서 사용할 공간인 모둠과 그에따라 프로필등이 필요하여 기획", "모둠 내 글쓰기, 댓글 기능 개발 및 프로필 편집 페이지 개발 등 프론트 전체 담당", "각 학급별만의 뉴스피드 공간이 확실해졌으며 프로필 편집 기능 통해 학생들만의 프로필을 꾸밀 수 있게 되었음"],
          stack: ["jQuery", "JSP(eGovFramework)"],
        },
        {
          name: "MathFreeOn 플랫폼 코드 에디터 개발",
          period: "2019.03 - 2019.06",
          description: ["프로젝트 기여 : 100%","MathFreeOn 플랫폼에서 코드를 편집하고 실행화면을 확인할 수 있는 화면이 필요하여 기획", "CodePen, JSFiddle을 참고하여 UI/UX 및 기능 구성", "코드 하이라이팅, 테마 등의 기능이 필요해 Ace Editor을 사용하여 구현", "코드 텍스트를 서버에 보낸 후 결과를 받아서 별도 UI에 렌더링 하였음"],
          stack: ["React", "Ace Editor", "Webpack"],
        },
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      title: "[외주] 오스랩스(AuthLabs) 설문 작성 및 만족도 데이터 관리 페이지",
      period: "2024.05",
      description: "설명",
      stack: ["React", "Vite", "Typescript"],
    },
    {
      title: "로스트아크 게임 경매장 알림 및 시세 차트 프로젝트",
      period: "2025.02 - 2025.03",
      description: "설명",
      stack: ["React", "Vite", "Typescript"],
    },
    // {
    //   title: "진행 중인 프로젝트명",
    //   period: "2026.10",
    //   ongoing: true,
    //   description: "설명",
    //   stack: ["React", "Typescript"],
    // },
  ] satisfies Project[],
  skills: {
    "Language / Core": ["Javascript / Typescript", "React", "Vue"],
    Framework: ["Next.js"],
    "State-Management": ["Zustand", "Redux", "TanStack Query"],
    Styling: ["Styled-Components", "Emotion", "Tailwind CSS", "CSS / Sass"],
    Building: ["Vite", "Webpack", "Turborepo"],
    Collaboration: ["Figma", "Jira", "Notion", "Confluence", "Trello"],
  } as Record<string, string[]>,
  contact: {
    email: "alska6416@gmail.com",
    github: "https://github.com/MoGyeongTae",
    // blog: "https://...",   ← 필요하면 주석을 풀어서 적으세요. 없으면 버튼이 안 보여요.
  } as { email: string; github?: string; blog?: string },
};
