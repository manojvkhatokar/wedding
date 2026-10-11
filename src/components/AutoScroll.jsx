import { useEffect } from "react";

const READING_DELAY = 5000;
const PIXELS_PER_SECOND = 70;
const MANUAL_SCROLL_PAUSE = 900;

export default function AutoScroll({ disabled }) {
  useEffect(() => {
    if (disabled) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let timer = 0;
    let previousTime = 0;
    let position = window.scrollY;
    let ready = false;
    let manualUntil = 0;

    function schedule() {
      if (ready && !frame && !document.hidden && !preference.matches) {
        previousTime = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    function tick(time) {
      frame = 0;
      if (document.hidden || preference.matches) return;
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      const end = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (time < manualUntil) {
        position = window.scrollY;
        frame = requestAnimationFrame(tick);
        return;
      }
      position = Math.min(end, position + elapsed * PIXELS_PER_SECOND);
      // Fractional accumulation gives steady motion without CSS smooth-scroll restarts.
      window.scrollTo({ top: position, behavior: "instant" });
      if (position < end) frame = requestAnimationFrame(tick);
    }

    function begin() {
      timer = window.setTimeout(() => {
        ready = true;
        position = window.scrollY;
        schedule();
      }, READING_DELAY);
    }

    function yieldToManualScroll() {
      manualUntil = performance.now() + MANUAL_SCROLL_PAUSE;
      position = window.scrollY;
      schedule();
    }

    function onScroll() {
      // Ignore our own scroll events; follow swipes, scrollbar drags and anchor navigation.
      if (Math.abs(window.scrollY - position) > 2) yieldToManualScroll();
    }

    function onKey(event) {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Tab"].includes(event.key)) {
        yieldToManualScroll();
      }
    }

    function onAnchorInteraction(event) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || !document.getElementById(anchor.hash.slice(1))) return;
      // Pause before the browser starts smooth navigation, even if the hash
      // already matches and no hashchange event will be dispatched.
      yieldToManualScroll();
    }

    function onVisibilityOrPreference() {
      cancelAnimationFrame(frame);
      frame = 0;
      position = window.scrollY;
      schedule();
    }

    // Simple touches keep the tour running; only actual navigation gets a brief pause.
    window.addEventListener("wheel", yieldToManualScroll, { passive: true });
    window.addEventListener("touchmove", yieldToManualScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", yieldToManualScroll);
    document.addEventListener("pointerover", onAnchorInteraction, true);
    document.addEventListener("pointerdown", onAnchorInteraction, true);
    document.addEventListener("click", onAnchorInteraction, true);
    preference.addEventListener("change", onVisibilityOrPreference);
    document.addEventListener("visibilitychange", onVisibilityOrPreference);
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("load", begin);
      window.removeEventListener("wheel", yieldToManualScroll);
      window.removeEventListener("touchmove", yieldToManualScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", yieldToManualScroll);
      document.removeEventListener("pointerover", onAnchorInteraction, true);
      document.removeEventListener("pointerdown", onAnchorInteraction, true);
      document.removeEventListener("click", onAnchorInteraction, true);
      preference.removeEventListener("change", onVisibilityOrPreference);
      document.removeEventListener("visibilitychange", onVisibilityOrPreference);
    };
  }, [disabled]);

  return null;
}
