import type { ReactNode } from "react";

/**
 * 바깥 사이트로 나가는 링크는 전부 이걸로 씀.
 *  - 항상 새 탭에서 열림 (target="_blank")
 *  - rel="noopener noreferrer": 새 탭이 이 페이지를 조작하지 못하게 + 이동 정보 숨김
 *  - 스크린리더에는 "(새 탭에서 열림)"을 덧붙여 읽어 줌
 * 페이지 안 이동(#experience 등)과 메일(mailto:)은 새 탭이 필요 없어서 일반 <a>를 씀.
 */
export default function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only">(새 탭에서 열림)</span>
    </a>
  );
}
