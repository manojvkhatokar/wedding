import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Reveal from "./Reveal";
import { Ornament } from "./Ornaments";

export default function Invitation() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [0.92, 1.04, 1.06]);
  return (
    <section
      className="invitation"
      id="invitation"
      ref={ref}
      aria-labelledby="invitation-heading"
    >
      <Reveal>
        <Ornament className="section-ornament" />
        <h2 id="invitation-heading">
          Two hearts<em>One beautiful beginning</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="invitation-copy">
          Together with our families we invite you to celebrate our wedding
          with blessings music and a little dancing
        </p>
      </Reveal>
      <motion.div
        className="invitation-baraat"
        style={reduce ? undefined : { scale }}
      >
        <img
          src="/images/baraat-ivory.webp"
          alt="A relaxed baraat with the groom in royal blue on a raised open car seat with an umbrella attendant dhol tasha musicians and friends in shirts and trousers"
          width="1200"
          height="800"
          loading="lazy"
        />
      </motion.div>
      <Reveal>
        <p className="tradition">A little tradition A lot of love</p>
        <Ornament />
      </Reveal>
    </section>
  );
}
