import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { Ornament, Pin, Arrow } from "./Ornaments";
import { wedding, downloadCalendar, googleCalendarUrl, appleCalendarUrl } from "../wedding";

export default function Celebration() {
  const [message, setMessage] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const timer = useRef();
  const shareInput = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (showShare) shareInput.current?.select();
  }, [showShare]);
  function announce(text) {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(""), 4500);
  }
  async function share() {
    const data = {
      title: "Manoj and Chethana Our Wedding",
      text: "Celebrate with us Reception 29 November Wedding 30 November 2026",
      url: window.location.href.split("#")[0],
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url);
        announce("Invitation link copied Share a little joy");
        return;
      }
      setShowShare(true);
    } catch (error) {
      if (error.name !== "AbortError") setShowShare(true);
    }
  }
  return (
    <section
      className="celebration"
      id="celebration"
      aria-labelledby="celebration-heading"
    >
      <Reveal>
        <Ornament className="section-ornament" />
        <h2 id="celebration-heading">
          Come for the love<em>Stay for the celebration</em>
        </h2>
        <Ornament className="small-ornament" />
      </Reveal>
      <div className="events">
        {wedding.events.map((event, index) => (
          <Reveal key={event.id} delay={index * 0.1}>
            <article className={`event event--${event.id}`}>
              <div className="event-details">
                <p className="event-label">
                  <time dateTime={event.date}>
                    {event.weekday} November {event.day} 2026
                  </time>
                </p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
              <img
                className="event-illustration"
                src={event.image}
                alt={event.imageAlt}
                width="400"
                height="500"
                loading="lazy"
                decoding="async"
              />
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="venue">
          <p className="label">The venue</p>
          <Pin />
          <h3>{wedding.venue}</h3>
          <a
            className="button outlined"
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find the venue <Arrow diagonal />
          </a>
        </div>
      </Reveal>
      <Reveal>
        <div className="guest-actions">
          <button
            onClick={() => setShowCalendar((visible) => !visible)}
            aria-expanded={showCalendar}
            aria-controls="calendar-options"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <rect x="4" y="5" width="16" height="16" rx="1" />
              <path d="M4 10h16M8 2v6M16 2v6" />
            </svg>
            Save the dates
          </button>
          <button onClick={share}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="5" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m9 10 6-4M9 14l6 4" />
            </svg>
            Share invitation <Arrow diagonal />
          </button>
        </div>
      </Reveal>
      {showCalendar ? (
        <div className="calendar-options" id="calendar-options">
          <p className="calendar-options-title">Choose your calendar</p>
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Google Calendar <Arrow diagonal /></strong>
            <span>Opens both dates together Review and tap Save</span>
          </a>
          <a href={appleCalendarUrl()}>
            <strong>Apple Calendar for iPhone <Arrow diagonal /></strong>
            <span>Opens Calendar to subscribe to both dates</span>
          </a>
          <button
            onClick={() => {
              downloadCalendar();
              announce("Calendar file downloaded Open it to add both dates");
            }}
          >
            <strong>Calendar file</strong>
            <span>Two separate events for Outlook and other calendars</span>
          </button>
          <p className="calendar-options-note">Both dates stay all day until event times are shared</p>
        </div>
      ) : null}
      {showShare ? (
        <div className="share-fallback">
          <label htmlFor="invitation-link">
            Copy this link to share our invitation
          </label>
          <input
            ref={shareInput}
            id="invitation-link"
            readOnly
            value={window.location.href.split("#")[0]}
          />
          <button onClick={() => setShowShare(false)}>Close</button>
        </div>
      ) : null}
      <p className={`toast ${message ? "visible" : ""}`} role="status">
        {message}
      </p>
      <footer>
        <Reveal>
          <Ornament />
          <p className="with-love">With love</p>
          <p className="footer-names">Manoj and Chethana</p>
          <p className="footer-message">Your presence is our joy</p>
          <a href="#home" className="back-top">
            Back to the beginning
          </a>
        </Reveal>
      </footer>
    </section>
  );
}
