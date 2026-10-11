export function Flower({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d="M30 25C18 13 25 3 30 5C35 3 42 13 30 25Z"
          fill="currentColor"
          opacity=".9"
          transform={`rotate(${i * 45} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="4" fill="currentColor" />
    </svg>
  );
}

export function Ornament({ className = "" }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span />
      <Flower />
      <span />
    </div>
  );
}

export function Ganesha() {
  return (
    <svg
      className="ganesha"
      viewBox="0 0 64 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M26 18C14 10 10 21 15 31C18 37 21 37 24 34M39 18C51 10 55 21 50 31C47 37 44 37 41 34M23 23C21 8 43 8 42 23C41 31 34 30 33 38C32 48 45 45 39 36M25 30C18 47 18 59 32 61C43 63 50 52 45 47M18 43C8 49 12 58 22 56M45 32C51 37 51 42 45 43M25 7L32 2L39 7M29 20L33 22L37 20" />
      <circle cx="32" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Arrow({ diagonal = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18L18 6M6 6h12v12" : "M12 4v16M6 14l6 6 6-6"} />
    </svg>
  );
}

export function Pin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
