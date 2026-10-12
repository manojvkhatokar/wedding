import { useEffect, useRef, useState } from "react";

export default function Atmosphere({ paused, setPaused }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef(null);
  const wantsMusic = useRef(true);
  const startMusic = useRef(() => {});

  useEffect(() => {
    const track = audio.current;
    let disposed = false;
    let starting = false;
    let lastScrollAttempt = -Infinity;
    track.volume = 0.45;
    async function play() {
      if (!wantsMusic.current || document.hidden || starting || !track.paused) return;
      starting = true;
      try {
        await track.play();
        if (!disposed) setError("");
      } catch (error) {
        if (disposed || error.name === "AbortError") return;
        setError(error.name === "NotAllowedError"
          ? ""
          : "Music couldn’t load. Tap the music button to retry.");
      } finally {
        starting = false;
      }
    }
    startMusic.current = play;
    const onPlay = () => { setPlaying(true); setError(""); };
    const onPause = () => setPlaying(false);
    const onError = () => setError("Music couldn’t load. Tap the music button to retry.");
    const onInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest("[data-music-control]")) return;
      if (event.type === "keydown" && !["Enter", " ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
      if (track.paused && wantsMusic.current) void play();
    };
    const onScrollIntent = (event) => {
      const now = performance.now();
      if (now - lastScrollAttempt < 750) return;
      lastScrollAttempt = now;
      onInteraction(event);
    };
    const onVisibility = () => {
      if (document.hidden) track.pause();
      else if (wantsMusic.current) void play();
    };
    track.addEventListener("play", onPlay);
    track.addEventListener("pause", onPause);
    track.addEventListener("error", onError);
    document.addEventListener("touchend", onInteraction, { passive: true });
    document.addEventListener("touchstart", onInteraction, { passive: true });
    document.addEventListener("touchmove", onScrollIntent, { passive: true });
    document.addEventListener("wheel", onScrollIntent, { passive: true });
    document.addEventListener("click", onInteraction);
    document.addEventListener("keydown", onInteraction);
    document.addEventListener("visibilitychange", onVisibility);
    void play();
    return () => {
      disposed = true;
      track.removeEventListener("play", onPlay);
      track.removeEventListener("pause", onPause);
      track.removeEventListener("error", onError);
      document.removeEventListener("touchend", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("touchmove", onScrollIntent);
      document.removeEventListener("wheel", onScrollIntent);
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
      document.removeEventListener("visibilitychange", onVisibility);
      track.pause();
    };
  }, []);

  function toggleSound() {
    const track = audio.current;
    if (!track.paused) {
      wantsMusic.current = false;
      track.pause();
      setError("");
    } else {
      wantsMusic.current = true;
      if (track.error) track.load();
      void startMusic.current();
    }
  }
  return (
    <div className="atmosphere">
      <audio ref={audio} src="/audio/wedding-dhol.mp3" autoPlay loop preload="auto" aria-hidden="true" />
      <button
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? "Resume animations" : "Pause animations"}
        title={paused ? "Resume animations" : "Pause animations"}
      >
        {paused ? (
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="m7 4 9 6-9 6Z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M7 4v12M13 4v12" />
          </svg>
        )}
      </button>
      <button
        data-music-control
        className={playing ? "sound-playing" : ""}
        onClick={toggleSound}
        aria-pressed={playing}
        aria-label={playing ? "Mute wedding music" : "Play wedding music"}
        title={playing ? "Mute wedding music" : "Play wedding music"}
      >
        <span className="sound-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
      {error ? (
        <span className="audio-error" role="status">
          {error}
        </span>
      ) : null}
    </div>
  );
}
