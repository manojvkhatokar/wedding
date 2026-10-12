import { useEffect, useRef } from "react";
import { Flower } from "./Ornaments";

// Stable random seeds avoid reshuffling on React renders; each new fall gets a new lane.
function random(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const flowers = Array.from({ length: 36 }, (_, i) => ({
  offset: random(i + 1),
  pace: 0.7 + random(i + 101) * 0.65,
  sway: 8 + random(i + 201) * 22,
  phase: random(i + 301) * Math.PI * 2,
  spin: (random(i + 401) - 0.5) * 300,
  size: 10 + Math.round(random(i + 501) * 9),
  color: ["#c67516", "#d89622", "#b95025"][i % 3],
}));

export default function Petals() {
  const layer = useRef(null);

  useEffect(() => {
    const container = layer.current;
    const elements = [...container.children];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = container.clientWidth;
    let height = container.clientHeight;
    let previousY = window.scrollY;
    let pendingDistance = 0;
    let velocity = 0;
    let travel = 0;
    let previousTime = 0;
    let frame = 0;

    function draw() {
      // Let flowers pass over artwork, but disappear behind copy and controls.
      // Screen-space occlusion also works inside animated reveal stacking contexts.
      const bounds = container.getBoundingClientRect();
      const protectedAreas = [...document.querySelectorAll(
        ".invitation-page h1, .invitation-page h2, .invitation-page h3, .invitation-page p, .invitation-page a, .invitation-page button, .monogram, .ornament, .blessing > svg, .venue > svg, .share-fallback",
      )].map((element) => element.getBoundingClientRect())
        .filter((rect) => rect.width && rect.height && rect.bottom > 0 && rect.top < height);
      flowers.forEach((flower, i) => {
        const fall = travel * flower.pace + flower.offset;
        const cycle = Math.floor(fall);
        const progress = fall - cycle;
        const lane = random(i + 601 + cycle * 97);
        const x = 24 + lane * Math.max(0, width - 48)
          + Math.sin(progress * Math.PI * 2 + flower.phase) * flower.sway;
        const y = -30 + progress * (height + 60);
        const rotation = flower.phase * 180 / Math.PI + progress * flower.spin;
        const tilt = 0.9 + Math.sin(progress * Math.PI * 3 + flower.phase) * 0.1;
        const fade = Math.min(1, progress * 15, (1 - progress) * 15);
        elements[i].style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scaleY(${tilt})`;
        const screenX = x + bounds.left;
        const screenY = y + bounds.top;
        let clearance = 1;
        for (const rect of protectedAreas) {
          const dx = Math.max(rect.left - screenX, 0, screenX - rect.right);
          const dy = Math.max(rect.top - screenY, 0, screenY - rect.bottom);
          // Reserve the whole particle footprint, then softly fade at the edge.
          clearance = Math.min(clearance, Math.max(0, Math.min(1,
            (Math.hypot(dx, dy) - flower.size - 18) / 14,
          )));
        }
        elements[i].style.opacity = String(fade * clearance * 0.85);
      });
    }

    function animate(time) {
      const dt = Math.max(1 / 240, Math.min((time - previousTime) / 1000 || 1 / 60, 0.05));
      previousTime = time;
      const target = Math.max(-3500, Math.min(3500, Math.abs(pendingDistance) / dt));
      pendingDistance = 0;
      velocity += (target - velocity) * (1 - Math.exp(-dt * 6));
      travel += velocity * dt * 0.00035;
      draw();
      if (Math.abs(velocity) > 0.5) {
        frame = requestAnimationFrame(animate);
      } else {
        velocity = 0;
        frame = 0;
      }
    }

    function onScroll() {
      const y = window.scrollY;
      if (reducedMotion.matches) {
        previousY = y;
        return;
      }
      pendingDistance += Math.abs(y - previousY);
      previousY = y;
      if (!frame && !document.hidden) {
        previousTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    }

    function onVisibility() {
      cancelAnimationFrame(frame);
      frame = 0;
      velocity = 0;
      pendingDistance = 0;
      previousY = window.scrollY;
    }

    const resize = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      draw();
    });
    resize.observe(container);
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onVisibility);
    };
  }, []);

  return (
    <div ref={layer} className="petal-layer" aria-hidden="true">
      {flowers.map((flower, i) => (
        <div
          key={i}
          className="falling-flower"
          style={{ "--size": `${flower.size}px`, color: flower.color }}
        >
          <Flower />
        </div>
      ))}
    </div>
  );
}
