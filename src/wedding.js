// All invitation details live here. Times were not provided; calendar events are all-day.
export const wedding = {
  groom: "Manoj V Khatokar",
  bride: "Chethana D",
  venue: "Sri Dharmastala Manjunatha Swamy Kalyana Mantapa",
  // Replace with a verified Google Maps place link when the exact address is available.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sri%20Dharmastala%20Manjunatha%20Swamy%20Kalyana%20Mantapa",
  events: [
    {
      id: "reception",
      title: "The Reception",
      date: "2026-11-29",
      nextDate: "2026-11-30",
      day: "29",
      weekday: "Sunday",
      description: "An evening of joy & togetherness.",
      image: "/images/reception-formal.webp",
      imageAlt:
        "Illustrated groom in a black tuxedo and bride in an embroidered lehenga welcoming guests on a flower-decorated reception stage",
    },
    {
      id: "wedding",
      title: "The Wedding",
      date: "2026-11-30",
      nextDate: "2026-12-01",
      day: "30",
      weekday: "Monday",
      description: "Blessings. Traditions. Forever.",
      image: "/images/wedding-ceremony.webp",
      imageAlt:
        "Illustrated Marathi bride and groom seated beside the sacred fire during their wedding ceremony",
    },
  ],
};

const escapeIcs = (value) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
// RFC 5545 limits content lines to 75 UTF-8 octets, including continuation spaces.
function foldLine(line) {
  const encoder = new TextEncoder();
  let output = "",
    length = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (length + bytes > 75) {
      output += "\r\n ";
      length = 1;
    }
    output += char;
    length += bytes;
  }
  return output;
}

export function createCalendar(events = wedding.events) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Manoj and Chethana//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      ...events.flatMap((event) => [
        "BEGIN:VEVENT",
        `UID:${event.id}-202611-manoj-chethana@wedding.invitation`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${event.date.replaceAll("-", "")}`,
        `DTEND;VALUE=DATE:${event.nextDate.replaceAll("-", "")}`,
        `SUMMARY:${escapeIcs(`Manoj & Chethana — ${event.title}`)}`,
        `LOCATION:${escapeIcs(wedding.venue)}`,
        "DESCRIPTION:We look forward to celebrating with you! Event timings will be shared by the families.",
        "END:VEVENT",
      ]),
      "END:VCALENDAR",
    ]
      .map(foldLine)
      .join("\r\n") + "\r\n"
  );
}

export function downloadCalendar() {
  const url = URL.createObjectURL(
    new Blob([createCalendar()], { type: "text/calendar;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Manoj-and-Chethana-Wedding.ics";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
