import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Ganesha, Ornament, Arrow } from "./Ornaments";
import { wedding } from "../wedding";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  return (
    <section
      className="hero"
      ref={ref}
      aria-labelledby="couple-names"
      id="home"
    >
      <img
        className="toran"
        src="/images/toran-floral.webp"
        alt=""
        fetchPriority="high"
      />
      <motion.div
        className="hero-content"
        style={reduce ? undefined : { y: titleY, opacity: fade }}
      >
        <motion.div
          className="blessing"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <p>Blessings of Lord Ganesha</p>
          <Ganesha />
        </motion.div>
        <div className="monogram" aria-label="Manoj and Chethana">
          <span>M</span><span>C</span>
        </div>
        <motion.h1
          id="couple-names"
          aria-label={`${wedding.groom} weds ${wedding.bride}`}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.15 }}
        >
          <span className="name">{wedding.groom}</span>
          <span className="weds">weds</span>
          <span className="name">{wedding.bride}</span>
        </motion.h1>
        <Ornament />
      </motion.div>
      <div className="hero-couple">
        <img
          src="/images/couple-ivory.webp"
          alt="Watercolor illustration of a Maharashtrian bride and groom in green nauvari and saffron pheta wearing mundavalya and exchanging garlands"
          width="900"
          height="1125"
          fetchPriority="high"
        />
      </div>
      <a className="scroll-note" href="#invitation">
        <span>Let the celebrations begin</span>
        <Arrow />
      </a>
    </section>
  );
}
