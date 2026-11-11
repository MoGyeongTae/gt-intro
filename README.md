# gt-intro

원페이지 개인 소개 사이트 (Vite + React + TypeScript + Tailwind CSS v4)

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

## 구조

- `src/data/profile.ts` — 페이지의 모든 내용 (여기만 수정)
- `src/sections/` — Hero, About, Experience, Projects, Skills, Contact
- `src/components/` — Nav, SectionTitle
- `src/index.css` — Tailwind 불러오기 + `@theme` 디자인 토큰 (색, 폰트)
- `index.html` — 페이지 제목, 설명, OG 태그
