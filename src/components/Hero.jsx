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
  const processionX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
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
        src="/images/toran.webp"
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
          <p>With Lord Ganesha’s blessings</p>
          <Ganesha />
        </motion.div>
        <div className="monogram" aria-label="Manoj and Chethana">
          M C
        </div>
        <motion.h1
          id="couple-names"
          aria-label={`${wedding.groom} weds ${wedding.bride}`}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.15 }}
        >
          <span className="name">{wedding.groom}</span>
          <span className="weds">
            <i />
            weds
            <i />
          </span>
          <span className="name">{wedding.bride}</span>
        </motion.h1>
        <Ornament />
        <a className="button primary" href="#invitation">
          You’re invited <Arrow />
        </a>
      </motion.div>
      <motion.div
        className="baraat"
        style={reduce ? undefined : { x: processionX }}
      >
        <img
          src="/images/baraat-ivory.webp"
          alt="A relaxed baraat with the groom in royal blue on a raised open-car seat, an umbrella attendant, dhol-tasha musicians, and friends in shirts and trousers"
          fetchPriority="high"
        />
      </motion.div>
      <a className="scroll-note" href="#invitation">
        <span>Let the celebrations begin</span>
        <Arrow />
      </a>
    </section>
  );
}
