import type { CSSProperties } from "react";

/*
  히어로에 떠다니는 코드 기호 ( {}  </>  #  ; )

  입체감 만드는 법 (3D 라이브러리 없이 CSS만)
  ─ 뒤 글자(depth): 같은 글자를 진한 색으로 그리고 text-shadow를 1px씩 n번 겹쳐 "두께"를 만듦
  ─ 앞 글자(face): 그 위에 그라디언트로 칠한 같은 글자를 정확히 겹쳐 올림
  ─ 바닥 그림자: 마지막에 흐린 그림자를 하나 더 깔아 공중에 떠 있는 느낌

  움직임 (3겹으로 나눠서 서로 안 부딪히게)
  ─ 바깥: 마우스 패럴랙스 (HeroBackdrop이 넣어 주는 --px, --py 값, -1 ~ 1)
  ─ 가운데: 처음 등장 (hero-intro, 기호마다 늦게)
  ─ 안쪽: 둥실둥실 떠다님 (glyph-float, 기호마다 주기·기울기 다르게)
*/

type Glyph = {
  text: string;
  /** 위치·크기 (Tailwind 클래스, 모바일 → sm 이상) */
  className: string;
  /** 앞면 그라디언트 [밝은 쪽, 어두운 쪽] */
  face: [string, string];
  /** 두께 색 */
  side: string;
  /** 두께(px) */
  depth: number;
  /** 기본 기울기(deg) */
  tilt: number;
  /** 패럴랙스 이동량(px). 클수록 가까이 있는 느낌 */
  parallax: number;
  /** 떠다니는 주기(s) */
  duration: number;
  /** 등장 지연(ms) */
  delay: number;
};

const GLYPHS: Glyph[] = [
  {
    text: "{ }",
    className: "right-[18%] top-[10%] text-[5.5rem] sm:right-[26%] sm:top-[14%] sm:text-[9rem]",
    face: ["#fde68a", "#f59e0b"],
    side: "#92400e",
    depth: 12,
    tilt: -12,
    parallax: 28,
    duration: 7,
    delay: 500,
  },
  {
    text: "</>",
    className:
      "right-[34%] bottom-[12%] text-[4.5rem] sm:right-[40%] sm:bottom-[14%] sm:text-[7.5rem]",
    face: ["#fdba74", "#c2410c"],
    side: "#7c2d12",
    depth: 11,
    tilt: 10,
    parallax: 40,
    duration: 8.5,
    delay: 650,
  },
  {
    text: "#",
    className: "hidden sm:block sm:right-[16%] sm:bottom-[26%] sm:text-[6.5rem]",
    face: ["#fef3c7", "#fbbf24"],
    side: "#a16207",
    depth: 10,
    tilt: 14,
    parallax: 20,
    duration: 6.5,
    delay: 800,
  },
  {
    text: ";",
    className: "hidden lg:block lg:right-[46%] lg:top-[8%] lg:text-[4.5rem]",
    face: ["#f6f2ea", "#d6d3cd"],
    side: "#57534e",
    depth: 7,
    tilt: -8,
    parallax: 12,
    duration: 9,
    delay: 950,
  },
];

/** 1px씩 겹친 두께 + 바닥 그림자 */
const extrude = (color: string, depth: number) =>
  [
    ...Array.from({ length: depth }, (_, i) => `${i + 1}px ${i + 1}px 0 ${color}`),
    `${depth}px ${depth + 18}px 28px rgb(0 0 0 / 0.5)`,
  ].join(", ");

export default function FloatingGlyphs() {
  return (
    // 모바일은 글자 뒤로 겹치기 쉬워서 조금 흐리게
    <div className="absolute inset-0 opacity-60 sm:opacity-100">
      {GLYPHS.map((g) => (
        <div
          key={g.text}
          className={`absolute leading-none font-black select-none ${g.className}`}
          style={{
            transform: `translate(calc(var(--px, 0) * ${g.parallax}px), calc(var(--py, 0) * ${g.parallax}px))`,
          }}
        >
          <div className="hero-intro" style={{ animationDelay: `${g.delay}ms` }}>
            <div
              className="glyph-float relative"
              style={
                {
                  "--tilt": `${g.tilt}deg`,
                  animationDuration: `${g.duration}s`,
                } as CSSProperties
              }
            >
              {/* 두께 */}
              <span style={{ color: g.side, textShadow: extrude(g.side, g.depth) }}>{g.text}</span>
              {/* 앞면 */}
              <span
                className="absolute inset-0 bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(160deg, ${g.face[0]}, ${g.face[1]})` }}
              >
                {g.text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
