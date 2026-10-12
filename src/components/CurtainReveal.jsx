import { useEffect, useState } from "react";
import { Flower } from "./Ornaments";

const COLORS = ["#f5c64d", "#e9884e", "#fff2d2", "#ca5061", "#f4a6ae", "#d5a748"];
const CONFETTI = Array.from({ length: 56 }, (_, index) => {
  const side = index % 2 === 0 ? 1 : -1;
  const lane = Math.floor(index / 2);
  const spread = (lane * 19) % 29;
  return {
    side: side === 1 ? "left" : "right",
    color: COLORS[index % COLORS.length],
    x: `${side * (70 + spread * 5)}px`,
    y: `${-140 - ((lane * 47) % 260)}px`,
    rotate: `${side * (160 + lane * 29)}deg`,
    delay: `${(lane % 7) * 23}ms`,
    size: `${5 + (lane % 4) * 2}px`,
  };
});

export default function CurtainReveal({ onRevealed, reducedMotion }) {
  const [opening, setOpening] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => {
      setFinished(true);
      onRevealed();
    }, reducedMotion ? 80 : 2200);
    return () => window.clearTimeout(timer);
  }, [opening, onRevealed, reducedMotion]);

  if (finished) return null;

  return (
    <div className={`curtain-reveal${opening ? " curtain-reveal--opening" : ""}`}>
      <button
        className="curtain-trigger"
        type="button"
        onClick={() => setOpening(true)}
        disabled={opening}
        aria-label="Open the wedding invitation for Manoj and Chethana"
      >
        <span className="curtain-panel curtain-panel--left" aria-hidden="true" />
        <span className="curtain-panel curtain-panel--right" aria-hidden="true" />
        <span className="curtain-valance" aria-hidden="true" />
        <span className="curtain-stage" aria-hidden="true">
          <span className="curtain-flourish"><Flower /><Flower /><Flower /></span>
          <span className="curtain-monogram">MC</span>
          <span className="curtain-title">A celebration awaits</span>
          <span className="curtain-prompt">Tap to open the invitation</span>
          <span className="curtain-bottom-flourish">✦ &nbsp; ✦ &nbsp; ✦</span>
        </span>
      </button>
      <div className="confetti-burst" aria-hidden="true">
        <span className="confetti-flash confetti-flash--left" />
        <span className="confetti-flash confetti-flash--right" />
        {CONFETTI.map((piece, index) => (
          <span
            key={index}
            className={`confetti-piece confetti-piece--${piece.side}`}
            style={{
              "--piece-color": piece.color,
              "--piece-x": piece.x,
              "--piece-y": piece.y,
              "--piece-rotate": piece.rotate,
              "--piece-delay": piece.delay,
              "--piece-size": piece.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}
