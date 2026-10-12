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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig reducedMotion="user">
      <AutoScroll disabled={reduce} />
      <a className="skip-link" href="#celebration">
        Skip to wedding details
      </a>
      <main className="invitation-page">
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
    </MotionConfig>
  );
}
