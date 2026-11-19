# gt-intro

프론트엔드 개발자 모경태의 원페이지 소개 사이트 — https://kanggu7.com

Vite + React + TypeScript + Tailwind CSS v4로 만든 정적 사이트예요. 빌드 결과(`dist/`)를 Nginx가 그대로 서빙해요.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 검사 + dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

## 내용 수정

페이지에 보이는 글은 거의 다 **`src/data/profile.ts`** 한 파일에 있어요. 섹션 코드는 건드리지 않아도 돼요.

| 하고 싶은 것 | 고칠 곳 |
|---|---|
| 이름, 소개 문구, 사진 | `profile.ts` 위쪽 (`name`, `tagline`, `photo` 등) |
| 경력 추가·수정 | `experience` — 회사별 `works`에 맡은 프로젝트 |
| 경력 프로젝트에 링크 | `works`의 `link` → 프로젝트명이 링크가 됨 (↗) |
| 그 외 프로젝트 | `projects` — 적은 순서대로 보임, 진행 중이면 `ongoing: true` |
| 프로젝트 링크 버튼 | `projects`의 `links: [{ label, href }]` — 첫 번째가 강조 버튼, github.com 주소면 GitHub 아이콘 |
| 설명을 여러 줄로 | `description`을 문자열 대신 배열로 |
| 기술 스택 | `skills` |
| 연락처 | `contact` (`email`, `github`, `blog`) |

페이지 제목, 검색엔진용 설명, 링크 미리보기(OG)는 `index.html`에 있어요.

## 구조

```
index.html              페이지 제목·설명·OG·파비콘
public/                 그대로 복사되는 파일
  og.png                링크 미리보기 이미지 (1200×630)
  404.html              없는 주소일 때 Nginx가 보여주는 페이지
  robots.txt, sitemap.xml
  favicon.svg, favicon-32.png, apple-touch-icon.png
  logos/                경력의 회사 로고
  profile/              프로필 사진 (768×1007로 줄여 둔 것)
src/
  data/profile.ts       페이지의 모든 내용
  sections/             Hero, About, Skills, Experience, Projects, Contact (화면 순서대로)
  components/
    Panel.tsx           섹션 배경 (스크롤하면 위로 겹쳐 쌓임)
    Reveal.tsx          화면에 들어올 때 떠오르며 나타나는 효과
    ExternalLink.tsx    바깥 링크 (항상 새 탭 + 스크린리더 안내)
    Nav, SectionTitle, HeroBackdrop, FloatingGlyphs
  hooks/useCoverProgress.ts
  index.css             Tailwind + @theme 디자인 토큰 (색, 폰트)
assets-src/             원본 이미지 보관용 (gitignore, 로컬에만 있음)
```

- 링크는 바깥 사이트면 `ExternalLink`(새 탭), 페이지 안 이동(`#experience`)과 메일(`mailto:`)이면 일반 `<a>`를 써요.
- 애니메이션은 모두 OS의 "동작 줄이기" 설정(`prefers-reduced-motion`)을 따라요.

## 배포

### 서버 구성

- Ubuntu + Nginx, Let's Encrypt 인증서 (`certbot --nginx`, 자동 갱신)
- 사이트 파일 위치: `/var/www/gt-intro/dist`
- Nginx 설정: `/etc/nginx/sites-available/gt-intro`
  - `try_files $uri $uri/ =404;` + `error_page 404 /404.html;` — 없는 주소는 404
  - `/assets/`는 1년 캐시 (파일명에 해시가 붙어서 안전)
  - http → https, www 포함 둘 다 인증서 적용

### 배포 방법 (Windows PowerShell)

SSH 접속 설정(`~/.ssh/config`의 `Host` 별명, 아래 예시는 `mgt-info-server`)이 되어 있다고 가정해요.

```powershell
npm run build
ssh mgt-info-server "rm -rf /var/www/gt-intro/dist-new"
scp -r .\dist mgt-info-server:/var/www/gt-intro/dist-new
ssh mgt-info-server "cd /var/www/gt-intro && test -f dist-new/index.html && mv dist dist-old && mv dist-new dist && rm -rf dist-old"
```

새 폴더(`dist-new`)에 먼저 올리고 마지막에 바꿔치기해서, 업로드 중에도 사이트가 비지 않아요.

### 배포 후 확인

- `https://kanggu7.com` 200, `https://kanggu7.com/없는주소` 404
- 바뀐 게 안 보이면 브라우저에서 Ctrl+F5
- 링크 미리보기 이미지를 바꿨다면 카카오톡은 "카카오 공유 디버거"에서 캐시 삭제
