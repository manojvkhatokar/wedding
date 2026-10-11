import { useState } from "react";
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

export default function App() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig reducedMotion={paused ? "always" : "user"}>
      <AutoScroll disabled={paused || reduce} />
      <a className="skip-link" href="#celebration">
        Skip to wedding details
      </a>
      <main className={`invitation-page ${paused ? "motion-paused" : ""}`}>
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        {!reduce && !paused ? <Petals /> : null}
        <Hero />
        <Invitation />
        <Celebration />
        <Atmosphere paused={paused} setPaused={setPaused} />
      </main>
    </MotionConfig>
  );
}
