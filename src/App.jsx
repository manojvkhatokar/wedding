import {
  MotionConfig,
  motion,
  useScroll,
  useReducedMotion,
} from "motion/react";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import Celebration from "./components/Celebration";
import Petals from "./components/Petals";
import Atmosphere from "./components/Atmosphere";
import AutoScroll from "./components/AutoScroll";
import CurtainReveal from "./components/CurtainReveal";
import { useCallback, useState } from "react";

export default function App() {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const finishReveal = useCallback(() => setRevealed(true), []);
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig reducedMotion="user">
      <AutoScroll disabled={reduce || !revealed} />
      <a className="skip-link" href="#celebration" inert={!revealed}>
        Skip to wedding details
      </a>
      <main className="invitation-page" inert={!revealed}>
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        {!reduce ? <Petals /> : null}
        <div className="scroll-content">
          <Hero />
          <Invitation />
          <Celebration />
        </div>
        <Atmosphere />
      </main>
      {!revealed ? <CurtainReveal onRevealed={finishReveal} reducedMotion={reduce} /> : null}
    </MotionConfig>
  );
}
